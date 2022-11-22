import React, {useState} from 'react';
import {IconInputComponent} from "../index";
import OpenEye from "../svg/eye/OpenEye";
import ClosedEye from "../svg/eye/ClosedEye";

import {FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister} from "react-hook-form";
import classNames from 'classnames/bind';
import styles from './input.module.scss'
import {checkType, ICheckType} from "../../utils/check-input-type";

const cn = classNames.bind(styles)


interface IInput {
    placeHolder: string,
    placeholderDisappear?: string,
    type: "text" | "" | "password" | "login" | string,

    isValid: boolean,
    name: string;
    required: boolean,

    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
    register?: UseFormRegister<FieldValues> | any,

    size?: "small" | "medium" | "large" | "extra-small"
}

const InputRe =
    ({type, placeHolder, name, required, isValid, error, register, placeholderDisappear, size}
         : IInput) => {

        const [eyeState, setEyeState] = useState(true);

        if (!eyeState) {
            type = "text";
        }
        const {iconPath}: ICheckType = checkType(type, name);

        return (
            <div className={cn(`container-${size ? size : "small"}`)} data-testid={'container'}>
                <div className={cn('inputField', error && 'inputFieldError')}>
                <span className={cn(`icon`)}>
                    <IconInputComponent iconPath={iconPath}/>
                </span>
                    <input type={type}
                           {...register(`${name}`, {
                               required: required,
                           })}
                           // autoComplete={"off"}
                           placeholder={placeholderDisappear}
                           required
                           id={`${name}-input`}
                    />
                    <label htmlFor={`${name}-input`}>{placeHolder}</label>
                    {name && (name.includes("password")||name.includes('Password')) &&
                        <span data-testid={'eye'} onClick={() => {
                            eyeState ? setEyeState(false) : setEyeState(true);
                        }} className={cn("eye")}>{eyeState ? <OpenEye/> : <ClosedEye/>}</span>}

                </div>
                <span className={cn(isValid && "error_container")}>{(error?.message && isValid) &&
                    <span>{`${error.message}`}</span>}</span>
            </div>
        );
    };

export default InputRe;