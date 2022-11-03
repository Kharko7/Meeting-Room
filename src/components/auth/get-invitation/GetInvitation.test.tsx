import {fireEvent, getByLabelText, render, screen,} from '@testing-library/react'
import {GetInvitationComponent, LoginComponent} from "../../index";
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
            <GetInvitationComponent/>
        </BrowserRouter>
    )
};

describe('Get invitation tests', () => {
    it('should be defined', async () => {
        const render_ = setup();
        const {getByLabelText} = render_
        const emailInput = fireEvent.input(getByLabelText("Email"), {
            target: {
                value: "user4@incorainc.com"
            }
        });

        const SendButton = screen.getByText('Send');
        userEvent.click(SendButton);
        await expect(screen.getByLabelText('Email')).toBeInTheDocument();
        await expect(emailInput).toBeDefined();
    });

    it('should be on the document', async () => {
        const {getByLabelText} = setup();
        expect(getByLabelText('Email')).toBeInTheDocument()
    });

    it('should render component with no errors', async () => {
        const return_ = setup();
        await expect(return_).toBeTruthy();
    });

    it('should have attribute', async () => {
        const {getByLabelText} = setup();
        await expect(getByLabelText('Email')).toHaveAttribute('type', '');
    });

    it('buttons are in the document', async () => {
        const {getByText} = setup();
        await expect(getByText('Send')).toBeInTheDocument();
        await expect(getByText('Add')).toBeInTheDocument();
        await expect(getByText('Reset')).toBeInTheDocument();
        await expect(getByText('Delete')).toBeInTheDocument();
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