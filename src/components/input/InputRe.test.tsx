import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react'
import {InputRe, RegisterComponent} from "../index";
import userEvent from "@testing-library/user-event";
import {BrowserRouter} from "react-router-dom";
import "@testing-library/jest-dom/extend-expect"


const register = jest.fn();

const setup = () => {
    return render(
        <InputRe placeHolder={'Value'} type={"text"} isValid={false} name={'text'} required={true}
                 register={register} placeholderDisappear={'Value'}/>
    )
};

describe('Input tests', () => {

    it('Input should  be defined', () => {
        const input = setup();
        expect(input).toBeDefined();
    })

    it('Input should  be true', () => {
        const input = setup();
        expect(input).toBeTruthy();
    })

    it('Input is in the document', () => {
        const {getByLabelText} = setup();
        expect(getByLabelText('Value')).toBeInTheDocument()
    })

    it('Input type is text ', () => {
        const input = setup();
        const {getByLabelText} = input;
        expect(getByLabelText('Value')).toHaveAttribute('type', 'text');
    })

    it('Input is required', () => {
        const {getByLabelText} = setup();
        expect(getByLabelText('Value')).toBeRequired();
    })

    it('Input to Have Error Message', () => {
        const {getByLabelText} = render( <InputRe placeHolder={'Password'} type={"password"} isValid={false} name={'password'} required={false}
                                                  register={register} placeholderDisappear={'Value'}/>)
        expect(getByLabelText('Password')).toHaveErrorMessage();
    })

    it('Input type is login ', () => {
        const {getByLabelText} = render(
            <InputRe placeHolder={'Value'} type={"login"} isValid={false} name={'text'} required={true}
                     register={register} placeholderDisappear={'Value'}/>
        )
        expect(getByLabelText('Value')).toHaveAttribute('type', 'login');
    })

    it('Input type is password ', () => {
        const {getByLabelText} = render(
            <InputRe placeHolder={'Value'} type={"password"} isValid={false} name={'text'} required={true}
                     register={register} placeholderDisappear={'Value'}/>
        )
        expect(getByLabelText('Value')).toHaveAttribute('type', 'password');
    })

    it('Input type is email ', () => {
        const {getByLabelText} = render(
            <InputRe placeHolder={'Value'} type={""} isValid={false} name={'text'} required={true}
                     register={register} placeholderDisappear={'Value'}/>
        )
        expect(getByLabelText('Value')).toHaveAttribute('type', '');
    })

    it('Input is required', () => {
        const {getByLabelText} = setup();
        expect(getByLabelText('Value')).toBeRequired();
    })
});