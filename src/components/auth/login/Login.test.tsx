import {fireEvent, getByLabelText, render, screen,} from '@testing-library/react'
import {LoginComponent} from "../../index";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom'
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event";


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
            <LoginComponent/>
        </BrowserRouter>
    )
};

describe('Login tests', () => {
    it('should be defined', async () => {
        const render_ = setup();
        const {getByLabelText} = render_
        const emailInput = fireEvent.input(getByLabelText("email"), {
            target: {
                value: "user4@incorainc.com"
            }
        });
        const passwordInput = fireEvent.input(getByLabelText("password"), {
            target: {
                value: "1234"
            }
        })
        const loginButton = screen.getByText('Login');
        userEvent.click(loginButton);
        await expect(emailInput).toBeDefined();
        await expect(passwordInput).toBeDefined();
    });

    it('should be on the document', async () => {
        const {getByLabelText} = setup();
        await expect(getByLabelText('email')).toBeInTheDocument();
        await expect(getByLabelText('password')).toBeInTheDocument();
    });

    it('should render the component with no errors', async () => {
        const return_ = setup();
        await expect(return_).toBeTruthy();
    });

    it('should have attribute', async () => {
        const {getByLabelText} = setup();
        await expect(getByLabelText('email')).toHaveAttribute('type', '');
        await expect(getByLabelText('password')).toHaveAttribute('type', 'password');
    });
})