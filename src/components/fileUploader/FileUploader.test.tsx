import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react'
import {InputRe, RegisterComponent} from "../index";
import userEvent from "@testing-library/user-event";
import {BrowserRouter} from "react-router-dom";
import "@testing-library/jest-dom/extend-expect"
import {FileUploaderComponent} from "./FileUploaderComponent";


const register = jest.fn();

const setup = () => {
    return render(
        <FileUploaderComponent name={'text'} required={true}
                               register={register} size={"medium"}/>
    )
};

describe('File uploader', () => {
    it('File uploader is defined', async () => {
        const input = setup();
        expect(input).toBeDefined();
    })

    it('File uploader is true', async () => {
        const input = setup();
        expect(input).toBeTruthy();
    })

    it('File uploader is in the document', async () => {
        const {getByTestId} = setup();
        await expect(getByTestId('file')).toBeInTheDocument()
    })

    it('Input type is file ', async () => {
        const {getByTestId} = setup();
        await expect(getByTestId('file')).toHaveAttribute('type', 'file');
    })

    it('Select avatar is defined', async () => {
        const {getByTestId} =  render(
            <FileUploaderComponent name={'text'} required={true}
                                   register={register} size={"medium"} showFileName={true}/>
        )
        await expect(getByTestId('select')).toBeInTheDocument();
    })

});