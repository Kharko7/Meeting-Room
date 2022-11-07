import { render, screen, fireEvent } from "@testing-library/react";
import Toggle from "./Toggle";

const onClick = jest.fn();

describe("General toggle tests", () => {
  it("Button should be defined", () => {
    render(<Toggle onclick={onClick}></Toggle>);
    const toggleElement = screen.getByTestId("toggle");
    expect(toggleElement).toBeDefined();

  });
  it("After clicking toggle onclick function should be called ", () => {
    render(<Toggle onclick={onClick}></Toggle>);
    const toggleElement = screen.getByTestId("toggle");
    fireEvent.click(toggleElement);
    expect(onClick).toBeCalled();
 
  });
});
describe("Toggle tests with passing size parameters to a component", () => {
  it("The component must have class small", () => {
    render(<Toggle size="small" onclick={onClick}></Toggle>);
    const toggleElement = screen.getByTestId("toggle");
    expect(toggleElement.classList[1]).toBe("small");

  });
  it("The component must have class medium", () => {
    render(<Toggle size="medium" onclick={onClick}></Toggle>);
    const toggleElement = screen.getByTestId("toggle");
    expect(toggleElement.classList[1]).toBe("medium");

  });

  it("The component must have class large", () => {
    render(<Toggle size="large" onclick={onClick}></Toggle>);
    const toggleElement = screen.getByTestId("toggle");
    expect(toggleElement.classList[1]).toBe("large");

  });
});

//
