import {fireEvent, getByLabelText, render, screen,} from '@testing-library/react'
import {ChangePasswordComponent, LoginComponent} from "../../index";
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
            <ChangePasswordComponent/>
        </BrowserRouter>
    )
};

describe('Change password tests', () => {
    it('should be defined', async () => {
        const register = setup();
        let {getByLabelText} = register;
        const password = fireEvent.input(getByLabelText("Create new password"), {
            target: {
                value: "12344E#@1h"
            }
        });

        const passwordConfirm = fireEvent.input(getByLabelText("Confirm new password"), {
            target: {
                value: "12344E#@1h"
            }
        });
        const changePasswordButton = screen.getByText('Change Password');
        userEvent.click(changePasswordButton);
        await expect(password).toBeDefined();
        await expect(passwordConfirm).toBeDefined();
    });

    it('should be on the document', async () => {
        const {getByLabelText} = setup();
        expect(getByLabelText('Create new password')).toBeInTheDocument()
        expect(getByLabelText('Confirm new password')).toBeInTheDocument()
    });

    it('should render the component with no errors', async () => {
        const changePassword = setup();
        await expect(changePassword).toBeTruthy();
    });

    it('error in password', async () => {
        const {getByLabelText, container} = setup();
        await act(async () => {
            const passwordInput = getByLabelText("Create new password")
            fireEvent.change(passwordInput, {target: {value: "123"}})
        })
        await expect(container.innerHTML).toMatch("Enter at least 8 characters, including lowercase, uppercase, numbers and special symbols")
    });

    it('error in password confirm', async () => {
        const {getByLabelText, container} = setup();
        await act(async () => {
            const passwordInput = getByLabelText("Confirm new password")
            fireEvent.change(passwordInput, {target: {value: "123"}})
        })
        await expect(container.innerHTML).toMatch("Enter at least 8 characters, including lowercase, uppercase, numbers and special symbols")
    });
})