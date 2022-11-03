import { render, screen, fireEvent } from "@testing-library/react";
import IconButton from "./IconButton";

const onClick = jest.fn(() => {});

beforeEach(() => {
  // @ts-ignore
  render(<IconButton disabled={false} onclick={onClick}></IconButton>);
});

describe("Button tests", () => {
  it("Button should  be defined", () => {
    const iconButtonElement = screen.getByTestId("iconButton");
    expect(iconButtonElement).toBeDefined();
  });
  it("After clicking butonn onclick function should be called ", () => {
    const iconButtonElement = screen.getByTestId("iconButton");
    fireEvent.click(iconButtonElement);
    expect(onClick).toBeCalled();
  });
});
