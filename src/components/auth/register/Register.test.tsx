import {fireEvent, getByLabelText, getByText, render, screen,} from '@testing-library/react'
import {LoginComponent, RegisterComponent} from "../../index";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom'
import * as redux from "react-redux";
import {useAppDispatch} from "../../../hooks/toolkitHooks";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect"
import {act} from "react-dom/test-utils";


const mockDispatch = jest.fn()

const mockState = {
    auth: {
        userRegister: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        },
        error: '',
        access: false
    }
}

jest.mock('hooks/toolkitHooks', () => ({
    useAppDispatch: () => mockDispatch,
    useAppSelector: () => mockState.auth
}))

const setup = () => {
    return render(
        <BrowserRouter>
            <RegisterComponent/>
        </BrowserRouter>
    )
};

describe('Register tests', () => {

    it('should be defined', async () => {
        const register = setup();

        let {getByLabelText} = register;

        const login = fireEvent.input(getByLabelText("Enter name and surname"), {
            target: {
                value: "Bruce Lee"
            }
        });

        const password = fireEvent.input(getByLabelText("Create password"), {
            target: {
                value: "12344E#@1h"
            }
        });

        const passwordConfirm = fireEvent.input(getByLabelText("Confirm password"), {
            target: {
                value: "12344E#@1h"
            }
        });

        const registerButton = screen.getByText('Register');

        userEvent.click(registerButton);

        await expect(login).toBeDefined();
        await expect(password).toBeDefined();
        await expect(passwordConfirm).toBeDefined();
    });

    it('should be on the document', async () => {
        const {getByLabelText} = setup();
        await expect(getByLabelText('Enter name and surname')).toBeInTheDocument();
        await expect(getByLabelText('Create password')).toBeInTheDocument();
        await expect(getByLabelText('Confirm password')).toBeInTheDocument();
    });

    it('should render the component with no errors', async () => {
        const register = setup();

        await expect(register).toBeTruthy();
    });

    it('error in password', async () => {
        const {getByLabelText, container} = setup();
        await act(async () => {
            const passwordInput = getByLabelText("Create password")
            fireEvent.change(passwordInput, {target: {value: "123"}})
        })

        expect(container.innerHTML).toMatch("Enter at least 8 characters, including lowercase, uppercase, numbers and special symbols")

    });

    it('error in password confirm', async () => {
        const {getByLabelText, container} = setup();
        await act(async () => {
            const paswordInput = getByLabelText("Confirm password")
            fireEvent.change(paswordInput, {target: {value: "123"}})
        })

        expect(container.innerHTML).toMatch("Enter at least 8 characters, including lowercase, uppercase, numbers and special symbols")

    });

    it('error in login', async () => {
        const {getByLabelText, container} = setup();
        await act(async () => {
            const login = getByLabelText("Enter name and surname")
            fireEvent.change(login, {target: {value: "Jake"}})
        })
        expect(container.innerHTML).toMatch("Enter your name and surname")

    });


    // it('should password match', async () => {
    //     const register = setup();
    //
    //     let {getByLabelText} = register;
    //
    //     // const password = fireEvent.input(getByLabelText("Create password"), {
    //     //     target: {
    //     //         value: "12344E#@1h"
    //     //     }
    //     // });
    //     const password = fireEvent.input(getByLabelText("Create password"), {
    //         target: {
    //             value: "12344E#@1h"
    //         }
    //     });
    //
    //     const passwordConfirm = fireEvent.input(getByLabelText("Confirm password"), {
    //         target: {
    //             value: "12344E#@1h"
    //         }
    //     });
    //
    //      expect(password.valueOf()).toEqual('12344E#@1h')
    // })

})