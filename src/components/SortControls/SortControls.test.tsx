import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SortControls from "./SortControls";

describe("SortControls", () => {
  const defaultProps = {
    sortField: "name" as const,
    onSortFieldChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders sort dropdown with label", () => {
    render(<SortControls {...defaultProps} />);

    expect(screen.getByTestId("sort-controls")).toBeInTheDocument();
    expect(screen.getByLabelText("Sort by")).toBeInTheDocument();
  });

  it("displays current sort field", () => {
    render(<SortControls {...defaultProps} sortField="status" />);

    expect(screen.getByTestId("sort-controls-select")).toHaveValue("status");
  });

  it("calls onSortFieldChange when selection changes", async () => {
    const user = userEvent.setup();
    render(<SortControls {...defaultProps} />);

    await user.selectOptions(screen.getByTestId("sort-controls-select"), "species");

    expect(defaultProps.onSortFieldChange).toHaveBeenCalledWith("species");
  });

  it("renders all sort options", () => {
    render(<SortControls {...defaultProps} />);

    const select = screen.getByTestId("sort-controls-select");
    expect(select).toContainHTML("Name");
    expect(select).toContainHTML("Status");
    expect(select).toContainHTML("Species");
  });
});
