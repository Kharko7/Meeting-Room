import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";


import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss'
import {InputComponent} from "../input";
import Button from "../Button/ButtonComponent";

const cn = classNames.bind(styles)


const ForgotPasswordComponent = () => {
    const {reset, register, handleSubmit, formState: {errors,isDirty}} = useForm({mode: 'all'});
    let [email,setEmail] = useState("");

    const submit:SubmitHandler<any> = async (data) => {
        setEmail(data.email);
        console.log(data)
        reset();
    }
    return (
                <div className={cn("forgotPassword_container")}>
                   <span className={cn("spanAnimation")}>
                        <div className={cn("title")}>Enter your user account verified email address and we will send you
                            a password reset link
                        </div>
                    </span>
                    <form onSubmit={handleSubmit(submit)} className={cn("form_container")}>
                        <InputComponent IsRegister={true} error={errors.email} type={""} // css styles don't work with this type
                                        register={register}
                                        name={'email'} placeHolder={'Email'} required={true}/>
                        <button className={cn("send_button")}><Button label={"Send"}/></button>
                    </form>
                    <div className={cn("resetMessage")}>{(email&&!isDirty)&&`Email was send on ${email}`}</div>
                </div>
    )

};

export default ForgotPasswordComponent ;