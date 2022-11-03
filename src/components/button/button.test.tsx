import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

const onClick = jest.fn(() => {});

beforeEach(() => {
  render(<Button onclick={onClick}>Button</Button>);
});

describe("Button tests", () => {
  it("Button should  be defined", () => {
    const buttonElement = screen.getByTestId("button-1");
    expect(buttonElement).toBeDefined();
  });
  it("After clicking butonn onclick function should be called ", () => {
    const buttonElement = screen.getByTestId("button-1");
    fireEvent.click(buttonElement);
    expect(onClick).toBeCalled();
  });
});
