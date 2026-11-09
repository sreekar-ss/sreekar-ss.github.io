import { classify } from "./analytics";

const link = (href: string, download = false) => {
  const a = document.createElement("a");
  a.setAttribute("href", href);
  if (download) a.setAttribute("download", "");
  return a;
};

test("resume links count as downloads", () => {
  expect(classify(link("/static/media/Sai-Sreekar-Siddula-Resume.abc.pdf", true))?.path).toBe("resume-download");
});

test("contact links are named", () => {
  expect(classify(link("mailto:someone@example.com"))?.path).toBe("contact/email");
  expect(classify(link("https://linkedin.com/in/sreekarsiddula"))?.path).toBe("contact/linkedin");
  expect(classify(link("https://www.linkedin.com/in/sreekarsiddula/"))?.path).toBe("contact/linkedin");
  expect(classify(link("https://github.com/sreekar-ss"))?.path).toBe("contact/github");
});

test("project and paper links count as outbound", () => {
  expect(classify(link("https://thevector.dev"))?.path).toBe("out/thevector.dev");
  expect(classify(link("https://github.com/Ryan-Newell/CS5100_SushiGo_AI"))?.path).toBe(
    "out/github.com/Ryan-Newell/CS5100_SushiGo_AI",
  );
  expect(classify(link('https://scholar.google.com/scholar?q="Water"'))?.path).toBe("out/scholar");
});

test("in-page links are ignored", () => {
  expect(classify(link("#projects"))).toBeNull();
  expect(classify(link("/v1/"))).toBeNull();
});
