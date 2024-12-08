import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders the title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Kickstarter Projects/i);
  expect(titleElement).toBeInTheDocument();
});
