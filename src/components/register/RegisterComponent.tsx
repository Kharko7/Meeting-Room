import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {InputComponent} from "../input";


import {NavLink, useNavigate} from "react-router-dom";
import {NavRegisterComponent, SwitchToLoginComponent} from "../index";

import classNames from 'classnames/bind';
import styles from './RegisterPage.module.scss'
import ErrorComponent from "../error-container/ErrorComponent";
import Button from "../Button/ButtonComponent";
const cn = classNames.bind(styles)

const RegisterComponent = () => {

    const {reset, register, handleSubmit, formState: {errors,isDirty}} = useForm({mode: 'all'});

    const navigate = useNavigate();

    const [error,setError] = useState<boolean>(false);

    const submit:SubmitHandler<any> = async (data) => {
        if (data.password === data.passwordConfirm) {
            delete data.passwordConfirm;
            data.email = "someMail@gmail.com";
            localStorage.setItem('user', JSON.stringify(data));
            const code = generateId();
            console.log(code);
            navigate('/verifyAccount',{state:code});
        }else {
            setError(true);
        }
        reset();
    }

    return (
            <div className={cn('main_container')}>
                    <form onSubmit={handleSubmit(submit)} className={cn("container")}>
                        <div className={cn("createAccount")}>Create Account</div>
                        <NavRegisterComponent/>
                        <span className={cn("registration")}>Registration</span>

                        <InputComponent IsRegister={true} error={errors.login} type={"login"} register={register}
                                        name={'login'} placeHolder={'Create login'} required={true}/>
                        <InputComponent IsRegister={true} error={errors.password} type={"password"} register={register}
                                        name={'password'} placeHolder={'Create password'} required={true}/>
                        <InputComponent IsRegister={true} error={errors.passwordConfirm} type={"password"}
                                        register={register}
                                        name={'passwordConfirm'} placeHolder={'Confirm password'} required={true}/>
                        <div className={cn("wrongPassword")}>{(error&&!isDirty)&&<ErrorComponent title={"Wrong password"}/>}</div>
                        <div className={cn("register_button_container")}>
                            <button className={cn("register_button")}><Button label={"Register"}/></button>
                        </div>
                    </form>
                <NavLink to={'/login'} className={cn("switch")}><SwitchToLoginComponent/></NavLink>
            </div>
    );
};

export default RegisterComponent;

function dec2hex (dec:number) {
    return ('0' + dec.toString(16)).substr(-2)
}

function generateId () {
    let arr = new Uint8Array(8)
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('')

}