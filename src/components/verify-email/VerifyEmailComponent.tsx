import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {NavLink, useLocation, useNavigate} from "react-router-dom";

import classNames from 'classnames/bind';
import styles from './VerifyEmailPage.module.scss'
import {InputComponent} from "../input";
import ErrorComponent from "../error-container/ErrorComponent";
import Button from "../Button/ButtonComponent";

const cn = classNames.bind(styles)


const VerifyEmailComponent = () => {
    const {reset, register, handleSubmit, formState: {errors,isValid,isDirty}} = useForm({mode: 'all'});

    const [error,setError] = useState<boolean>(false);

    const navigate = useNavigate();

    const {state} = useLocation();

    const submit:SubmitHandler<any> = async (data) => {
        data.verifyEmail===state? navigate('/login'):setError(true);
        reset();
    }
    return (
            <div className={cn("verifyEmail_container")}>
                <div className={cn("gif_box")}>
                    <div className={cn("newtons-cradle")}>
                        <div className={cn("newtons-cradle__dot")}></div>
                        <div className={cn("newtons-cradle__dot")}></div>
                        <div className={cn("newtons-cradle__dot")}></div>
                        <div className={cn("newtons-cradle__dot")}></div>
                    </div>
                </div>
                <div className={cn("verify_box")}>
                    <div className={cn("verify_container")}>
                    <span className={cn("spanAnimation")}>
                        <div className={cn("title")}>Enter the code received by email</div>
                    </span>
                        <form onSubmit={handleSubmit(submit)} className={cn("form_container")}>
                            <InputComponent IsRegister={false} error={errors.verifyEmail} type={"text"}
                                            register={register}
                                            name={'verifyEmail'} placeHolder={'code'} required={true}/>
                            <button className={cn("checkCode_button")} disabled={!isDirty || !isValid}><Button label={"Send"} /></button>
                        </form>
                        <div className={cn("link")}>
                            <NavLink to={''}>Didn't get the email? Reset the code</NavLink>
                        </div>
                    </div>
                </div>
                <div className={cn("error_container")}>{(!isDirty && error) &&
                    <ErrorComponent title={"Wrong code"}/>
                }</div>
            </div>
    )

};

export default VerifyEmailComponent;