import React from 'react';
import {fireEvent, render} from '@testing-library/react'
import {InputRe} from "../index";
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

    it("The component must have class container-small as default", async () => {
        const {getByTestId} =render(
            <InputRe placeHolder={'Value'} type={"text"} isValid={false} name={'text'} required={true}
                     register={register} placeholderDisappear={'Value'}/>
        )
       await expect(getByTestId('container').classList[0]).toBe("container-small");
    });

    it("The component must have class container-medium", async () => {
        const {getByTestId} =render(
            <InputRe placeHolder={'Value'} type={"text"} isValid={false} name={'text'} required={true}
                     register={register} placeholderDisappear={'Value'} size={'medium'}/>
        )
        await expect(getByTestId('container').classList[0]).toBe("container-medium");
    });

    it("The component must have class container-extra-small", async () => {
        const {getByTestId} =render(
            <InputRe placeHolder={'Value'} type={"text"} isValid={false} name={'text'} required={true}
                     register={register} placeholderDisappear={'Value'} size={'extra-small'}/>
        )
        await expect(getByTestId('container').classList[0]).toBe("container-extra-small");
    });

    it("The component must have class container-large", async () => {
        const {getByTestId} =render(
            <InputRe placeHolder={'Value'} type={"text"} isValid={false} name={'text'} required={true}
                     register={register} placeholderDisappear={'Value'} size={'large'}/>
        )
        await expect(getByTestId('container').classList[0]).toBe("container-large");
    });

    it("The component must have class container-small", async () => {
        const {getByTestId} =render(
            <InputRe placeHolder={'Value'} type={"text"} isValid={false} name={'text'} required={true}
                     register={register} placeholderDisappear={'Value'} size={'small'}/>
        )
        await expect(getByTestId('container').classList[0]).toBe("container-small");
    });


    it("in password type eyestate should be visible", async () => {
        const {getByTestId} =render(
            <InputRe placeHolder={'Value'} type={"password"} isValid={false} name={'password'} required={true}
                     register={register} placeholderDisappear={'Value'} size={'small'}/>
        )
        await expect(getByTestId('eye')).toBeInTheDocument();
    });

    it("after click on eye input type must be text", async () => {
        const {getByLabelText,getByTestId} =render(
            <InputRe placeHolder={'Value'} type={"password"} isValid={false} name={'password'} required={true}
                     register={register} placeholderDisappear={'Value'} size={'small'}/>
        )

        fireEvent.click(getByTestId('eye'));

        await expect(getByLabelText('Value')).toHaveAttribute('type',"text");
    });

});