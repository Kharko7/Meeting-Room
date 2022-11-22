import {render,} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import {DialogComponent} from "./DialogComponent";


const setup = () => {
    return render(
        <BrowserRouter>
            <DialogComponent isShowing={true} children={<div>Data</div>}/>
        </BrowserRouter>
    );
};

describe("Dialog tests", () => {

    it("Dialog should  be defined", () => {
        const dialog = setup();
        expect(dialog).toBeDefined();
    });

    it("Dialog should be true", () => {
        const dialog = setup();
        expect(dialog).toBeTruthy();
    });

    it("Dialog should be on the document", () => {
        const {getByTestId} = setup();
        expect(getByTestId("dialog")).toBeInTheDocument();
    });

});

