import { render, screen, fireEvent } from "@testing-library/react";
import Toggle from "./Toggle";

const onClick = jest.fn();

beforeEach(() => {
  render(<Toggle onclick={onClick}></Toggle>);
});

describe("Button tests", () => {
  it("Button should  be defined", () => {
    const toggleElement = screen.getByTestId("toggle");
    expect(toggleElement).toBeDefined();
  });
  it("After clicking toggle onclick function should be called ", () => {
    const toggleElement = screen.getByTestId("toggle");
    fireEvent.click(toggleElement);
    expect(onClick).toBeCalled();
  });
});
