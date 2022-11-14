import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
const onClick = jest.fn(() => {});

describe("General button tests", () => {
  it("Button should  be defined", () => {
    render(<Button onclick={onClick}>Button</Button>);
    const buttonElement = screen.getByTestId("button-1");
    expect(buttonElement).toBeDefined();
  });
  it("After clicking button onclick function should be called ", () => {
    render(<Button onclick={onClick}>Button</Button>);
    const buttonElement = screen.getByTestId("button-1");
    fireEvent.click(buttonElement);
    expect(onClick).toBeCalled();
  });
  it("if button disabled==true, after clicking button, onclick function should not be called ", () => {
    render(
      <Button onclick={onClick} disabled={true}>
        Button
      </Button>
    );
    const buttonElement = screen.getByTestId("button-1");
    fireEvent.click(buttonElement);
    expect(onClick).not.toBeCalled();
  });
});

describe("Button tests with passing size parameters to a component", () => {
  it("The component must have class small", () => {
    render(
      <Button size="small" onclick={onClick}>
        Button
      </Button>
    );
    const buttonElement = screen.getByTestId("button-1");
    expect(buttonElement.classList[1]).toBe("small");
  });
  it("The component must have class medium", () => {
    render(
      <Button size="medium" onclick={onClick}>
        Button
      </Button>
    );
    const buttonElement = screen.getByTestId("button-1");
    expect(buttonElement.classList[1]).toBe("medium");
  });
  it("The component must have class large", () => {
    render(
      <Button size="large" onclick={onClick}>
        Button
      </Button>
    );
    const buttonElement = screen.getByTestId("button-1");
    expect(buttonElement.classList[1]).toBe("large");
  });
});
describe("Button tests with passing styleType parameters to a component", () => {
  it("The component must have class success", () => {
    render(
      <Button styleType="success" onclick={onClick}>
        Button
      </Button>
    );
    const spanElement = screen.getByTestId("span-1");
    expect(spanElement.classList[1]).toBe("success");
  });
  it("The component must have class warning", () => {
    render(
      <Button styleType="warning" onclick={onClick}>
        Button
      </Button>
    );
    const spanElement = screen.getByTestId("span-1");
    expect(spanElement.classList[1]).toBe("warning");
  });
  it("The component must have disabled attribute", () => {
    render(
      <Button styleType="error" onclick={onClick} disabled={true}>
        Button
      </Button>
    );
    const buttonElement = screen.getByTestId("button-1");
    expect(buttonElement).toBeDefined();


    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });
});
