import {fireEvent, getByLabelText, render, screen,} from '@testing-library/react'
import {ForgotPasswordComponent, GetInvitationComponent, LoginComponent} from "../../index";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom'
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";


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
<ForgotPasswordComponent/>
        </BrowserRouter>
    )
};

describe('Get Forgot Password tests', () => {
    it('should be defined', async () => {
        const render_ = setup();
        const {getByLabelText} = render_
        const email = fireEvent.input(getByLabelText("Email"), {
            target: {
                value: "user4@incorainc.com"
            }
        });

        const Send = screen.getByText('Send');
        userEvent.click(Send);
        await expect(screen.getByLabelText('Email')).toBeInTheDocument();
        await expect(email).toBeDefined();
    });

    it('should be on the document', async () => {
        const {getByLabelText} = setup();
        expect(getByLabelText('Email')).toBeInTheDocument()
    });

    it('should render component with no errors', async () => {
        const forgotPassword = setup();
        await expect(forgotPassword).toBeTruthy();
    });

    it('should have attribute', async () => {
        const {getByLabelText} = setup();
        await expect(getByLabelText('Email')).toHaveAttribute('type', '');
    });

    it('button are in the document', async () => {
        const {getByText} = setup();
        await expect(getByText('Send')).toBeInTheDocument();
    });

    it('error in email', async () => {
        const {getByLabelText, container} = setup();
        await act(async () => {
            const passwordInput = getByLabelText("Email")
            fireEvent.change(passwordInput, {target: {value: "123"}})
        })
        expect(container.innerHTML).toMatch("Only domain @incorainc.com is accepted")

    });

})