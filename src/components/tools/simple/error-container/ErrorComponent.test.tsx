import {render,} from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import {ErrorComponent} from "../../../index";

const setup = () => {
    return render(
        <ErrorComponent title={'Error 404'}/>
);
};

describe("Error tests", () => {
    it("error should be defined", async () => {
        const modal = setup();
        await expect(modal).toBeDefined();
    });

    it("should be on the document", async () => {
        const {getByTestId} = setup();
        await expect(getByTestId('error')).toBeInTheDocument();
    });

    it("should render error component with no errors", async () => {
        const modal = setup();
        await expect(modal).toBeTruthy();
    });

});