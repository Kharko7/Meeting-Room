import {render,} from '@testing-library/react'
import {LoginPage} from "../../index";
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
            <LoginPage/>
        </BrowserRouter>
    )
};

describe('Login page tests', () => {
    it('should be defined', async () => {
        const page = setup();
        await expect(page).toBeDefined();
    });

    it('should be on the document', async () => {
        const {getByTestId} = setup();
        expect(getByTestId('login')).toBeInTheDocument()
    });

    it('should render page with no errors', async () => {
        const changePassword = setup();
        await expect(changePassword).toBeTruthy();
    });

})