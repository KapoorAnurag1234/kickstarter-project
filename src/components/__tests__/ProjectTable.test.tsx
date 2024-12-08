import React from "react";
import { render, screen } from "@testing-library/react";
import ProjectTable from "../ProjectTable";

describe("ProjectTable Component", () => {
  const mockProjects = [
    { "s.no": 1, "amt.pledged": 10000, "percentage.funded": 150 },
    { "s.no": 2, "amt.pledged": 5000, "percentage.funded": 75 },
    { "s.no": 3, "amt.pledged": 20000, "percentage.funded": 200 },
  ];

  test("renders table headers correctly", () => {
    render(<ProjectTable projects={mockProjects} />);

    // Check table headers
    expect(screen.getByText("S.No")).toBeInTheDocument();
    expect(screen.getByText("Percentage Funded")).toBeInTheDocument();
    expect(screen.getByText("Amount Pledged")).toBeInTheDocument();
  });

  test("renders project data correctly", () => {
    render(<ProjectTable projects={mockProjects} />);

    // Check rows content
    mockProjects.forEach((project) => {
      expect(screen.getByText(project["s.no"].toString())).toBeInTheDocument();
      expect(
        screen.getByText(`${project["percentage.funded"]}%`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`$${project["amt.pledged"].toLocaleString()}`)
      ).toBeInTheDocument();
    });
  });

  test("renders empty table when no projects are provided", () => {
    render(<ProjectTable projects={[]} />);

    // Check no rows exist in tbody
    const rows = screen.getAllByRole("row");
    // Only header row should exist
    expect(rows.length).toBe(1);
  });

  test("renders correctly with large numbers", () => {
    const largeProject = [
      { "s.no": 1, "amt.pledged": 123456789, "percentage.funded": 999 },
    ];

    render(<ProjectTable projects={largeProject} />);

    // Check large numbers are formatted correctly
    expect(screen.getByText("$123,456,789")).toBeInTheDocument();
    expect(screen.getByText("999%")).toBeInTheDocument();
  });
});
