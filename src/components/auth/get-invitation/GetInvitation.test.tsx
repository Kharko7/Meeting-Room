import {fireEvent, getByLabelText, render, screen,} from '@testing-library/react'
import {GetInvitationComponent, LoginComponent} from "../../index";
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom'
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import {useAppDispatch} from "../../../hooks/toolkitHooks";


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

        await act(async () => {
            const SendButton =await screen.getByText('Send');
            await userEvent.click(SendButton);
        })

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

    it('dispatch must be called after click on button', async () => {
        const {getByText,getByLabelText} = setup();

        const Send = await getByText('Send');

        fireEvent.input(getByLabelText("Email"), {
            target: {
                value: "cssccs@incorainc.com"
            }
        });

        await act(async () => {
            await userEvent.click(Send);
        })

        await expect(useAppDispatch()).toBeCalled()
    });

})