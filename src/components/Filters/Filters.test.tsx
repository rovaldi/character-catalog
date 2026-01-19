import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filters from "./Filters";
import type { CharacterFilter } from "@/api/types";

describe("Filters", () => {
  const defaultProps = {
    filter: {} as CharacterFilter,
    onFilterChange: jest.fn(),
    onClear: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders status and gender filter dropdowns", () => {
    render(<Filters {...defaultProps} />);

    expect(screen.getByTestId("filter-status")).toBeInTheDocument();
    expect(screen.getByTestId("filter-gender")).toBeInTheDocument();
  });

  it("calls onFilterChange when status is selected", async () => {
    const user = userEvent.setup();
    render(<Filters {...defaultProps} />);

    await user.selectOptions(screen.getByTestId("filter-status-select"), "Alive");

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith("status", "Alive");
  });

  it("calls onFilterChange when gender is selected", async () => {
    const user = userEvent.setup();
    render(<Filters {...defaultProps} />);

    await user.selectOptions(screen.getByTestId("filter-gender-select"), "Male");

    expect(defaultProps.onFilterChange).toHaveBeenCalledWith("gender", "Male");
  });

  it("calls onClear when clear button is clicked", async () => {
    const user = userEvent.setup();
    render(<Filters {...defaultProps} filter={{ status: "Alive" }} />);

    await user.click(screen.getByTestId("filters-clear"));

    expect(defaultProps.onClear).toHaveBeenCalled();
  });

  it("disables clear button when no filters are active", () => {
    render(<Filters {...defaultProps} filter={{}} />);

    expect(screen.getByTestId("filters-clear")).toBeDisabled();
  });

  it("enables clear button when filters are active", () => {
    render(<Filters {...defaultProps} filter={{ status: "Alive" }} />);

    expect(screen.getByTestId("filters-clear")).toBeEnabled();
  });

  it("shows selected status value", () => {
    render(<Filters {...defaultProps} filter={{ status: "Dead" }} />);

    expect(screen.getByTestId("filter-status-select")).toHaveValue("Dead");
  });

  it("shows selected gender value", () => {
    render(<Filters {...defaultProps} filter={{ gender: "Female" }} />);

    expect(screen.getByTestId("filter-gender-select")).toHaveValue("Female");
  });

  it("has accessible section label", () => {
    render(<Filters {...defaultProps} />);

    expect(screen.getByTestId("filters")).toHaveAttribute("aria-label", "Filter characters");
  });
});
