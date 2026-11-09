// Shared content for the main site (command palette design, at /) and the
// contact sheet design (at /v1).
// Both versions read from this one file, so copy edits only need to happen here.

import headshotLarge from "../images/web/headshot.webp";
import headshotSmallImg from "../images/web/headshot-160.webp";
import photoSizes from "../images/web/sizes.json";
import resumePdf from "../resume/Sai-Sreekar-Siddula-Resume.pdf";

/** 400px-wide headshot (the original's full size). */
export const headshot: string = headshotLarge;
/** 160px headshot for small avatars. */
export const headshotSmall: string = headshotSmallImg;
export const resume: string = resumePdf;
export const resumeFileName = "Sai-Sreekar-Siddula-Resume.pdf";

export const person = {
  name: "Sai Sreekar Siddula",
  shortName: "Sreekar",
  role: "Senior Software Engineer",
  location: "Boston, MA",
  email: "ssiddula.jobs@gmail.com",
  linkedin: "https://linkedin.com/in/sreekarsiddula",
  linkedinHandle: "sreekarsiddula",
  github: "https://github.com/sreekar-ss",
  githubHandle: "sreekar-ss",
};

// Each photo comes in two WebP sizes: 640px for thumbnails and 1280px for full
// views. `srcSet` lets the browser pick, so phones never download the large one
// for a thumbnail.
const small = import.meta.glob<string>("../images/web/*-640.webp", { eager: true, import: "default" });
const large = import.meta.glob<string>("../images/web/*-1280.webp", { eager: true, import: "default" });

export type Photo = {
  id: string;
  title: string;
  /** 1280px version */
  src: string;
  /** 640px version */
  small: string;
  srcSet: string;
  width: number;
  height: number;
};

const photo = (id: string, title: string): Photo => {
  const big = large[`../images/web/${id}-1280.webp`];
  const sm = small[`../images/web/${id}-640.webp`];
  const [width, height] = (photoSizes as Record<string, number[]>)[id];
  return { id, title, src: big, small: sm, srcSet: `${sm} 640w, ${big} 1280w`, width, height };
};

export const photos: Photo[] = [
  photo("aurora", "Aurora"),
  photo("dawn", "Nubble at Dawn"),
  photo("milkyway", "Milky Way"),
  photo("lighthouse", "Portland Head Light"),
  photo("bridge", "Brooklyn Bridge"),
  photo("skyline", "Boston"),
  photo("fog", "Manhattan Bridge"),
  photo("train", "Conway Scenic Railroad"),
  photo("dusk", "Dusk"),
  photo("pier", "Quincy Pier"),
  photo("bikes", "Biker Gang"),
  photo("flower", "Daisy"),
];

export const photoById = (id: string): Photo =>
  photos.find((p) => p.id === id) as Photo;

export type Job = {
  id: string;
  title: string;
  company: string;
  org: string;
  location: string;
  period: string;
  years: string;
  headline: string;
  summary: string;
  big?: string;
  bigLabel?: string;
  points: string[];
  tags: string[];
};

// Written from the latest resume (src/resume), in a shorter, more
// conversational voice for the site.
export const jobs: Job[] = [
  {
    id: "cvs",
    title: "Senior Software Engineer",
    company: "CVS Health",
    org: "Branding Brand, for CVS Health",
    location: "Boston, MA",
    period: "Feb 2025 – present",
    years: "2025 → now",
    headline: "Leading the most complex app on a pharmacy platform used in 10,000 stores",
    summary:
      "One React codebase that runs on desktop workstations and Zebra Android handhelds, with 30+ long-running workflows that branch, pause, and pick up where they left off, even when the backend, the hardware, or another person gets in the way.",
    big: "10,000",
    bigLabel: "stores",
    points: [
      "Designed a scheduling engine for multi-dose vaccine series, where moving one appointment reshuffles the ones after it",
      "Built record locking so two staff can never edit the same record at once, with recovery across page reloads and devices",
      "Brought four kinds of hardware into the browser: barcode scanning, dual camera streams for OCR, label printers, and biometric sign-in",
      "Wrapped 60+ endpoints in Zod-validated contracts and designed recovery paths for 69 distinct API failure scenarios, each one tested",
      "Shipped every major feature behind runtime flags and per-location config, so rollouts reach thousands of pharmacies without a redeploy",
      "Cut redundant re-renders for about 30% better page performance, and built keyboard navigation that lets technicians work 30% faster",
    ],
    tags: ["React", "TypeScript", "Zod", "Nx", "OpenTelemetry"],
  },
  {
    id: "ductus",
    title: "Software Engineer II",
    company: "Ductus",
    org: "Ductus, for Crown Castle",
    location: "Maynard, MA",
    period: "Jun 2021 – Aug 2024",
    years: "2021 → 2024",
    headline: "Modernizing a telecom company's network software, ten-plus apps deep",
    summary:
      "Led frontend delivery for Crown Castle's legacy modernization, from requirements and Figma wireframes through to deployment.",
    big: "10+",
    bigLabel: "projects delivered",
    points: [
      "Shipped 10+ React and Angular projects, backed by Python microservices behind a gRPC backend-for-frontend layer",
      "Redesigned the frontend architecture so a large app shipped in 4 months instead of 6",
      "Built a Material UI component library used across 7 projects, cutting new-feature time by 30%",
      "Raised test coverage to 90% with Testing Library and Jest, and cut reported bugs by 30%",
      "Added Swagger mock servers, GitHub Copilot, and Figma dev mode, saving another 20% of development time",
    ],
    tags: ["React", "Angular", "Python", "gRPC", "Testing"],
  },
  {
    id: "coop",
    title: "Software Engineer Co-op",
    company: "Ductus",
    org: "Ductus",
    location: "Maynard, MA",
    period: "May – Dec 2020",
    years: "2020",
    headline: "Co-op at Ductus",
    summary:
      "Tooling that sped up AWS deployments, and web components that work in any framework.",
    points: [
      "Built a CLI that generates CloudFormation templates, cutting AWS deployment time by 40%",
      "Built a set of vanilla JS web components reused across 5 client projects",
    ],
    tags: ["AWS", "CLI", "Web Components"],
  },
  {
    id: "writer",
    title: "Technical Writer",
    company: "Smartprix",
    org: "Smartprix",
    location: "Noida, India",
    period: "Sep 2018 – Jan 2019",
    years: "2018",
    headline: "Technical writing at Smartprix",
    summary:
      "Tech news and in-depth product reviews, including explainers on 5G and Wi-Fi 6.",
    points: [
      "Covered tech news and wrote in-depth product reviews, including explainers on 5G and Wi-Fi 6",
    ],
    tags: ["Writing", "Research"],
  },
];

export type Project = {
  id: string;
  slug: string;
  title: string;
  when: string;
  context: string;
  summary: string;
  points: string[];
  tags: string[];
  link?: string;
  linkLabel?: string;
};

export const projects: Project[] = [
  {
    id: "vector",
    slug: "thevector.dev",
    title: "thevector.dev",
    when: "Now",
    context: "Personal project",
    summary:
      "A developer blog built to be read by people and by AI agents. Full-stack Next.js 15 with sub-second page loads, plus llms.txt endpoints and JSON-LD so LLM crawlers can read it properly.",
    points: [
      "App Router, server-side MDX, and GitHub sign-in",
      "Sub-second loads from incremental static regeneration and edge caching",
      "llms.txt endpoints and JSON-LD schemas for crawlers like GPTBot and Claude-Web",
    ],
    tags: ["Next.js", "MDX", "AI", "SEO"],
    link: "https://thevector.dev",
    linkLabel: "Visit site",
  },
  {
    id: "sushi",
    slug: "sushi-go-ai",
    title: "AI players for Sushi Go",
    when: "2021",
    context: "Northeastern University",
    summary:
      "Game-playing agents built with Minimax and Q-learning, benchmarked against rule-based and random players at each stage of training.",
    points: [
      "Minimax with alpha-beta pruning",
      "Q-learning, including linear function approximation",
    ],
    tags: ["Python", "AI/ML", "Q-Learning"],
    link: "https://github.com/Ryan-Newell/CS5100_SushiGo_AI",
    linkLabel: "Source on GitHub",
  },
  {
    id: "flood",
    slug: "flood-iot",
    title: "Flood control with IoT",
    when: "2020",
    context: "Northeastern University",
    summary:
      "Raspberry Pi sensors send readings over CoAP to Java gateways, which relay them to the cloud and trigger actuators over MQTT.",
    points: [
      "Python on constrained devices, Java on the gateways",
      "Ubidots cloud aggregation, with email alerts to users over SMTP",
    ],
    tags: ["Python", "Java", "MQTT", "CoAP"],
    link: "https://bitbucket.org/sreekar_ss/iot-device/src/master/apps/project/",
    linkLabel: "Source on Bitbucket",
  },
  {
    id: "lms",
    slug: "lms",
    title: "A learning management system, built twice",
    when: "2020",
    context: "Northeastern University",
    summary:
      "The faculty side runs on React, Redux, and Spring with MySQL. The student side runs on Angular, Node.js, and MongoDB. Both deployed on Heroku.",
    points: ["Same product, two complete stacks, side by side"],
    tags: ["React", "Angular", "Node.js", "Spring Boot"],
  },
];

// Google Scholar search for the exact title: shows the paper and its live
// citation count. Swap for a Scholar profile URL if you want one link instead.
const scholar = (title: string) =>
  `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${title}"`)}`;

export const scholarLink = "https://scholar.google.com/scholar?q=" + encodeURIComponent('"Sai Sreekar Siddula"');

export type Paper = {
  id: string;
  key: string;
  title: string;
  venue: string;
  year: string;
  cites: string;
  authors: string;
  shortAuthors: string;
  summary: string;
  link: string;
};

export const papers: Paper[] = [
  {
    id: "p1",
    key: "siddula2018monitoring",
    title: "Water Level Monitoring and Management of Dams using IoT",
    link: scholar("Water Level Monitoring and Management of Dams using IoT"),
    venue: "IEEE IoT-SIU 2018",
    year: "2018",
    cites: "113",
    authors: "Sai Sreekar Siddula, Phaneendra Babu, P.C. Jain",
    shortAuthors: "Siddula, Babu, Jain",
    summary:
      "Real-time water-level data sent to a central command center that decides when to open the gates.",
  },
  {
    id: "p2",
    key: "siddula2018realtime",
    title: "Real Time Monitoring and Controlling of Water Level in Dams using IoT",
    link: scholar("Real Time Monitoring and Controlling of Water Level in Dams using IoT"),
    venue: "IEEE IACC 2018",
    year: "2018",
    cites: "22",
    authors: "Sai Sreekar Siddula, P.C. Jain, Madhur Deo Upadhayay",
    shortAuthors: "Siddula, Jain, Upadhayay",
    summary:
      "Automating dam management, from reading water levels to controlling the gates themselves.",
  },
];

export const totalCitations = papers.reduce((n, p) => n + Number(p.cites), 0);

export type School = {
  id: string;
  school: string;
  degree: string;
  location: string;
  period: string;
  gpa: string;
  detail: string;
  coursework: string[];
};

export const schools: School[] = [
  {
    id: "neu",
    school: "Northeastern University",
    degree: "MS, Computer Systems Engineering (IoT)",
    location: "Boston, MA",
    period: "2019 – 2021",
    gpa: "4.0",
    detail:
      "President of NU IoTConnect, graduate student ambassador for the College of Engineering",
    coursework: ["Foundations of AI", "Data Mining", "UX Design", "Web Development"],
  },
  {
    id: "snu",
    school: "Shiv Nadar University",
    degree: "BTech, Electronics and Communication",
    location: "Delhi, India",
    period: "2014 – 2018",
    gpa: "3.7",
    detail: "Minor in computer science, chairperson of the food committee",
    coursework: ["Computer Networks", "Operating Systems", "Data Structures"],
  },
];
