import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";
import { useState } from "react";

const MockedChildren = () => <div data-testid="mockedChild"></div>;

const SetClose = jest.fn();
const setup = () => {
  render(
    <Modal closeModal={SetClose}>
      <MockedChildren></MockedChildren>
    </Modal>
  );
};

describe("Button tests", () => {
  beforeEach(() => {
    setup();
  });
  it("Button should  be defined", () => {
    const modalElement = screen.getByTestId("modal");
    expect(modalElement).toBeDefined();
  });
  it("After clicking closeButton, onclick function should be called ", () => {
    const closeElement = screen.getByTestId("iconButton");
    fireEvent.click(closeElement);
    expect(SetClose).toBeCalled();
  });
  it("check for validity of rendering child components", () => {
    const mockedChildElement = screen.queryByTestId("mockedChild");
    expect(mockedChildElement).toBeDefined();
  });
});
