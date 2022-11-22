import {render,} from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import LoadingComponent from "./LoadingComponent";

const mockDispatch = jest.fn()

const mockState = {
    auth: {
        success: true
    }
}

jest.mock('hooks/toolkitHooks', () => ({
    useAppDispatch: () => mockDispatch,
    useAppSelector: () => mockState.auth
}))

const setup = () => {
    return render(
        <LoadingComponent/>
);
};

describe("Loading modal tools tests", () => {
    it("should be defined", async () => {
        const loading = setup();
        await expect(loading).toBeDefined();
    });

    it("should render the loading component with no errors", async () => {
        const loading = setup();
        await expect(loading).toBeTruthy();
    });

});