import React, {InputHTMLAttributes} from 'react';
import './input.module.scss'

import classNames from 'classnames/bind';
import styles from './input.module.scss'
// @ts-ignore
import {FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister} from "react-hook-form";

const cx = classNames.bind(styles)

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    register: UseFormRegister<FieldValues>;
    name: string;
    required: boolean,
    placeHolder: string,
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
    type: string

}

interface ICheckType{
    reg:RegExp | undefined;
    iconPath:string;
}

const InputComponent = ({register, name, required, placeHolder, error, type}: IInput) => {


    const {reg,iconPath}:ICheckType = checkType(type);

    return (
        <div className={cx('container')}>
            <div className={cx('inputField')}>
                    <svg fill="#999" viewBox="0 0 20 20">
                        <path
                              d={iconPath} className={cx('icon')}></path>
                    </svg>
                    <input type={`${type}`} placeholder={`${placeHolder}`}  {...register(`${name}`, {
                        required: required,
                        pattern: reg
                    })}/>
            </div>
        </div>
    );
};


export default InputComponent;

function checkType(type: string) {

    let check: ICheckType = {
        reg:undefined,
        iconPath:''
    };

    switch (type) {
        case "password":
            check.reg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
            check.iconPath = "M17.308,7.564h-1.993c0-2.929-2.385-5.314-5.314-5.314S4.686,4.635,4.686,7.564H2.693c-0.244,0-0.443,0.2-0.443,0.443v9.3c0,0.243,0.199,0.442,0.443,0.442h14.615c0.243,0,0.442-0.199,0.442-0.442v-9.3C17.75,7.764,17.551,7.564,17.308,7.564 M10,3.136c2.442,0,4.43,1.986,4.43,4.428H5.571C5.571,5.122,7.558,3.136,10,3.136 M16.865,16.864H3.136V8.45h13.729V16.864z M10,10.664c-0.854,0-1.55,0.696-1.55,1.551c0,0.699,0.467,1.292,1.107,1.485v0.95c0,0.243,0.2,0.442,0.443,0.442s0.443-0.199,0.443-0.442V13.7c0.64-0.193,1.106-0.786,1.106-1.485C11.55,11.36,10.854,10.664,10,10.664 M10,12.878c-0.366,0-0.664-0.298-0.664-0.663c0-0.366,0.298-0.665,0.664-0.665c0.365,0,0.664,0.299,0.664,0.665C10.664,12.58,10.365,12.878,10,12.878";
            break;
        case "email":
            check.reg = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm")
            check.iconPath ="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z";
            break
        case "login":
            check.reg = new RegExp(/^[A-Za-z][A-Za-z0-9_]{2,29}$/)
            check.iconPath = "M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"
            break;
        default:
            check.reg = new RegExp(/^[a-zA-ZА-яіІїЇґҐёЁєЄ0-9 ]{1,40}$/);
    }

    return check;
}