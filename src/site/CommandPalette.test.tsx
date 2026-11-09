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
