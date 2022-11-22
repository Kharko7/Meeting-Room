import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import CloseBtn from "./CloseBtn";
import Toggle from "../toggle/Toggle";

const onClick = jest.fn(() => {});

describe("General button tests", () => {
    it("Button should  be defined", () => {
        render(<CloseBtn onclick={onClick}></CloseBtn>);
        const buttonElement = screen.queryAllByTestId("button");
        expect(buttonElement).toBeDefined();
    });

    it("The component must have class close-button", async () => {
        const {getByTestId} =render(
            <CloseBtn onclick={onClick}></CloseBtn>
        );
        expect(getByTestId("button").classList[0]).toBe("close-button");

    });
    it("The component should be on the document", () => {
        const {getByTestId} =render(
            <CloseBtn onclick={onClick}></CloseBtn>
        );
        expect(getByTestId("button")).toBeInTheDocument();
    });

    it("After clicking button onclick function should be called ", () => {
       const {getByTestId} = render(<CloseBtn onclick={onClick}></CloseBtn>);
        fireEvent.click(getByTestId('button'));
        expect(onClick).toBeCalled();
    });

});
