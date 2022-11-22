import {fireEvent, getByLabelText, render, screen,} from '@testing-library/react'
import {ChangePasswordComponent, LoginComponent} from "../../index";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom'
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import {useAppDispatch} from "../../../hooks/toolkitHooks";
import {getUserData} from "../../../services/local-storage.service";


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
        const oldPassword = fireEvent.input(getByLabelText("Enter old password"), {
            target: {
                value: "12344Ehh#@1h"
            }
        });
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

        const changePasswordButton = await screen.getByText('Change Password');

        await act(async () => {
            await userEvent.click(changePasswordButton);
        })

        await expect(password).toBeDefined();
        await expect(oldPassword).toBeDefined();
        await expect(passwordConfirm).toBeDefined();
    });

    it('should be on the document', async () => {
        const {getByLabelText} = setup();
        expect(getByLabelText('Enter old password')).toBeInTheDocument()
        expect(getByLabelText('Create new password')).toBeInTheDocument()
        expect(getByLabelText('Confirm new password')).toBeInTheDocument()
    });

    it('should render the component with no errors', async () => {
        const changePassword = setup();
        await expect(changePassword).toBeTruthy();
    });

    it('old password must be required', async () => {
        const {getByLabelText} = setup();
        await expect(getByLabelText('Enter old password')).toBeRequired()
    });

    it('new password must be required', async () => {
        const {getByLabelText} = setup();
        await expect(getByLabelText('Create new password')).toBeRequired()
    });

    it('confirm password must be required', async () => {
        const {getByLabelText} = setup();
        await expect(getByLabelText('Confirm new password')).toBeRequired()
    });

    it('error in new password', async () => {
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


    it('dispatch must be called after click on button', async () => {
        const {getByLabelText, container} = setup();
        fireEvent.input(getByLabelText("Enter old password"), {
            target: {
                value: "12344Ehh#@1h"
            }
        });
       fireEvent.input(getByLabelText("Create new password"), {
            target: {
                value: "12344E#@1h"
            }
        });

        fireEvent.input(getByLabelText("Confirm new password"), {
            target: {
                value: "12344E#@1h"
            }
        });

        const changePasswordButton = await screen.getByText('Change Password');

        await act(async () => {
            await userEvent.click(changePasswordButton);
        })

        await expect(useAppDispatch()).toBeCalled()
    });
})