import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination Component", () => {
  const totalItems = 50;
  const itemsPerPage = 10;
  const mockOnPageChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders pagination buttons correctly", () => {
    render(
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />
    );

    // Check First and Prev buttons are disabled on the first page
    expect(screen.getByText("First")).toBeDisabled();
    expect(screen.getByText("Prev")).toBeDisabled();

    // Check that Next and Last buttons are enabled
    expect(screen.getByText("Next")).toBeEnabled();
    expect(screen.getByText("Last")).toBeEnabled();

    // Check for page buttons (1, 2)
    expect(screen.getByText("1")).toHaveClass("active");
    expect(screen.getByText("2")).toBeEnabled();
  });

  test("calls onPageChange with correct arguments when buttons are clicked", () => {
    render(
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={2}
        onPageChange={mockOnPageChange}
      />
    );

    // Simulate clicking "First"
    fireEvent.click(screen.getByText("First"));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);

    // Simulate clicking "Prev"
    fireEvent.click(screen.getByText("Prev"));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);

    // Simulate clicking "Next"
    fireEvent.click(screen.getByText("Next"));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);

    // Simulate clicking "Last"
    fireEvent.click(screen.getByText("Last"));
    expect(mockOnPageChange).toHaveBeenCalledWith(5);

    // Simulate clicking page number
    fireEvent.click(screen.getByText("3"));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test("disables Next and Last buttons on the last page", () => {
    render(
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={5}
        onPageChange={mockOnPageChange}
      />
    );

    // Check Next and Last buttons are disabled
    expect(screen.getByText("Next")).toBeDisabled();
    expect(screen.getByText("Last")).toBeDisabled();

    // Check First and Prev buttons are enabled
    expect(screen.getByText("First")).toBeEnabled();
    expect(screen.getByText("Prev")).toBeEnabled();

    // Check active page is 5
    expect(screen.getByText("5")).toHaveClass("active");
  });

  test("renders correct number of page buttons based on the current page", () => {
    render(
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={3}
        onPageChange={mockOnPageChange}
      />
    );

    // Check the rendered page numbers
    expect(screen.getByText("2")).toBeEnabled();
    expect(screen.getByText("3")).toHaveClass("active");
    expect(screen.getByText("4")).toBeEnabled();
  });

  test("handles edge cases correctly when totalItems or itemsPerPage are zero", () => {
    render(
      <Pagination
        totalItems={0}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />
    );

    // Ensure all navigation buttons are disabled
    expect(screen.getByText("First")).toBeDisabled();
    expect(screen.getByText("Prev")).toBeDisabled();

    // Check that no page numbers are rendered
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });
});
