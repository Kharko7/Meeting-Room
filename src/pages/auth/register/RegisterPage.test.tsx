import {render,} from '@testing-library/react'
import {RegisterPage} from "../../index";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom'
import "@testing-library/jest-dom/extend-expect"

const mockDispatch = jest.fn()

const mockState = {
    auth: {
        user: {
            email: '',
            password: ''
        },
        error: ''
    }
}

jest.mock('hooks/toolkitHooks', () => ({
    useAppDispatch: () => mockDispatch,
    useAppSelector: () => mockState.auth
}))


const setup = () => {
    return render(
        <BrowserRouter>
            <RegisterPage/>
        </BrowserRouter>
    )
};

describe('register page tests', () => {
    it('should be defined', async () => {
        const page = setup();
        await expect(page).toBeDefined();
    });

    it('should be on the document', async () => {
        const {getByTestId} = setup();
        expect(getByTestId('register')).toBeInTheDocument()
    });

    it('should render page with no errors', async () => {
        const changePassword = setup();
        await expect(changePassword).toBeTruthy();
    });

})