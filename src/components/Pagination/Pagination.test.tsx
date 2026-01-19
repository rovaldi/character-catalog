import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

describe("Pagination", () => {
  const defaultProps = {
    currentPage: 5,
    totalPages: 10,
    onPageChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders current page and total pages", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByTestId("pagination-current")).toHaveTextContent("5");
    expect(screen.getByTestId("pagination-total")).toHaveTextContent("10");
  });

  it("calls onPageChange with previous page when clicking previous button", async () => {
    const user = userEvent.setup();
    render(<Pagination {...defaultProps} />);

    await user.click(screen.getByTestId("pagination-prev"));

    expect(defaultProps.onPageChange).toHaveBeenCalledWith(4);
  });

  it("calls onPageChange with next page when clicking next button", async () => {
    const user = userEvent.setup();
    render(<Pagination {...defaultProps} />);

    await user.click(screen.getByTestId("pagination-next"));

    expect(defaultProps.onPageChange).toHaveBeenCalledWith(6);
  });

  it("disables previous button on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    expect(screen.getByTestId("pagination-prev")).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<Pagination {...defaultProps} currentPage={10} />);

    expect(screen.getByTestId("pagination-next")).toBeDisabled();
  });

  it("enables both buttons when on middle page", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByTestId("pagination-prev")).toBeEnabled();
    expect(screen.getByTestId("pagination-next")).toBeEnabled();
  });

  it("has accessible navigation landmark", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("marks current page with aria-current", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByTestId("pagination-current")).toHaveAttribute("aria-current", "page");
  });
});
