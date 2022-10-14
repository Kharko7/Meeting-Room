import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss'
import {useNavigate} from "react-router-dom";
import {InputComponent} from "../input";
import Button from "../Button/ButtonComponent";
import ErrorComponent from "../error-container/ErrorComponent";

const cn = classNames.bind(styles)

const ChangePasswordComponent = () => {
    const {reset, register, handleSubmit, formState: {errors, isValid, isDirty}} = useForm({mode: 'all'});
    const navigate = useNavigate();

    const [error,setError] = useState<boolean>(false);

    // @ts-ignore
    const user = JSON.parse(localStorage.getItem('user'));
    const login = user.name +" "+user.surname;


    const submit:SubmitHandler<any> = async (data) => {
        console.log(data)
        if (data.password === data.passwordConfirm) {
            user.password = data.password;
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/login');
        }else{
            setError(true);
        }
        reset();
    }
    return (
            <div className={cn("changePassword_container")}>
                <form onSubmit={handleSubmit
                (submit)} className={cn("form_container")}>
                    <div className={cn("title")}>Password Change</div>
                    <div className={cn("login")}>{login}</div>
                    <InputComponent IsRegister={true} error={errors.password} type={"password"} register={register}
                                    name={'password'} placeHolder={'Create new password'} required={true}/>
                    <InputComponent IsRegister={true} error={errors.passwordConfirm} type={"password"}
                                    register={register}
                                    name={'passwordConfirm'} placeHolder={'Confirm new password'} required={true}/>
                    <div className={cn("error_container")}>{(error&&!isDirty)&&<ErrorComponent title={"Passwords do not match"}/>}</div>
                    <button className={cn("change_button")} disabled={!isDirty || !isValid}><Button label={"Change Password"}/></button>
                </form>
            </div>
    );
};

export default ChangePasswordComponent