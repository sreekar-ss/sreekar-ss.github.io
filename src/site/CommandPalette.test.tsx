import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CommandPalette from "./CommandPalette";

test("renders the palette with every group", () => {
  render(<CommandPalette />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/rely on all day/i);
  for (const group of ["Experience", "Projects", "Publications", "Photography", "Education", "Actions"]) {
    expect(screen.getByRole("group", { name: group })).toBeInTheDocument();
  }
});

test("search filters results and offers to email a question", () => {
  render(<CommandPalette />);
  const input = screen.getByRole("combobox", { name: /search/i });
  fireEvent.change(input, { target: { value: "sushi" } });
  expect(screen.getByRole("option", { name: /AI players for Sushi Go/i })).toBeInTheDocument();
  expect(screen.queryByRole("option", { name: /Technical Writer/i })).not.toBeInTheDocument();
  expect(screen.getByRole("option", { name: /Ask:/i })).toBeInTheDocument();
});

test("arrow keys move the highlighted result and Escape clears", () => {
  render(<CommandPalette />);
  const input = screen.getByRole("combobox", { name: /search/i });
  const first = input.getAttribute("aria-activedescendant");
  fireEvent.keyDown(input, { key: "ArrowDown" });
  expect(input.getAttribute("aria-activedescendant")).not.toBe(first);
  fireEvent.change(input, { target: { value: "react" } });
  fireEvent.keyDown(input, { key: "Escape" });
  expect(input).toHaveValue("");
});

test("hero offers resume download and email directly", () => {
  render(<CommandPalette />);
  const main = screen.getByRole("main");
  expect(main).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Download resume" })).toHaveAttribute("download");
  expect(screen.getByRole("link", { name: "Email me" }).getAttribute("href")).toMatch(/^mailto:/);
});

test("result count appears only once someone searches", () => {
  render(<CommandPalette />);
  const input = screen.getByRole("combobox", { name: /search/i });
  expect(screen.queryByText(/\d+ results/)).not.toBeInTheDocument();
  fireEvent.change(input, { target: { value: "react" } });
  expect(screen.getByText(/\d+ results/)).toBeInTheDocument();
});

test("preview details can be expanded", () => {
  render(<CommandPalette />);
  fireEvent.click(screen.getByRole("button", { name: "Show details" }));
  expect(screen.queryByRole("button", { name: "Show details" })).not.toBeInTheDocument();
});

test("BillSplit is searchable and links to the live app and its source", () => {
  render(<CommandPalette />);
  const input = screen.getByRole("combobox", { name: /search/i });
  fireEvent.change(input, { target: { value: "split" } });
  fireEvent.click(screen.getByRole("option", { name: /BillSplit/ }));
  const preview = screen.getByRole("complementary", { name: "Preview" });
  expect(preview.querySelector('a[href="https://billsplit.thevector.dev"]')).not.toBeNull();
  expect(preview.querySelector('a[href="https://github.com/sreekar-ss/bill-split"]')).not.toBeNull();
});
