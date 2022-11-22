import {
    fireEvent,
    getByLabelText,
    render,
    screen,
} from "@testing-library/react";
import { LoginComponent } from "../../index";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import AdminModalTool from "./AdminModalTool";

const onclick = jest.fn();

const setup = () => {
    return render(
        <AdminModalTool onclick={onclick}/>
    );
};

describe("Admin modal tools tests", () => {
    it("should be defined", async () => {
        const modal = setup();
        await expect(modal).toBeDefined();
    });

    it("should be on the document", async () => {
        const {getByTestId} = setup();
        await expect(getByTestId('admin')).toBeInTheDocument();
    });

    it("should render the component with no errors", async () => {
        const modal = setup();
        await expect(modal).toBeTruthy();
    });

    it("header should be true", async () => {
        const {container} = setup();
        await expect(container.getElementsByClassName('admin-box')).toBeTruthy();
    });

    it("header should be on the document", async () => {
        const {getByTestId} = setup();
        await expect(getByTestId('subheader')).toBeInTheDocument();
    });

});
