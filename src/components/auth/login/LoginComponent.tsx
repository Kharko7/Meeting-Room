import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {NavLink, useNavigate} from "react-router-dom";

import classNames from 'classnames/bind';
import styles from './LoginComponent.module.scss'
import {ErrorComponent, InputRe} from "../../index";
import Button from "../../button";
import {useAppDispatch, useAppSelector} from "../../../hooks/toolkitHooks";
import {authActions} from "../../../redux&saga/slices/auth.slice";
import {ResponsePopup} from "../../tools/simple/response-popup/ResponsePopup";


const cn = classNames.bind(styles)


const LoginComponent = () => {

    const {reset, register, handleSubmit, formState: {isDirty}} = useForm({mode: 'all'});

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    let {user, error, rejected, pending, success} = useAppSelector(state => state.auth);

    // useEffect(() => {
    //     pending && ResponsePopup.Pending().then();
    //     success && ResponsePopup.Success().then()
    //     error && ResponsePopup.ErrorPopup(error).then()
    // }, [pending, success])

    const submit: SubmitHandler<any> = async (user) => {
        await dispatch(authActions.login(user));
        reset();
    }

    return (
        <div className={cn("login_container")}>
            <div className={cn("logo_container")}>
                <div className={cn("logo")}>
                    <img
                        src="https://i.pinimg.com/originals/c9/af/8e/c9af8efe164f75b2d3aaebf5534892b0.png"
                        alt="logo"
                    />
                </div>
                <div className={cn("title")}>Lounge</div>
                <div className={cn("sub_title")}>Smoke and Relax</div>
            </div>
            <form onSubmit={handleSubmit(submit)} className={cn("form_container")}>
                <InputRe
                    isValid={false}
                    type={""}
                    register={register}
                    name={"email"}
                    placeHolder={"email"}
                    required={true}
                    placeholderDisappear={"...@incorainc.com"}
                    size={"extra-small"}
                />

                <InputRe
                    isValid={false}
                    type={"password"}
                    register={register}
                    name={"password"}
                    placeHolder={"password"}
                    required={true}
                    size={"extra-small"}
                />

                <div className={cn("error_container")}>
                    {(
                        error.includes("400") &&
                        !isDirty) && (
                        <ErrorComponent title={"Oops...Wrong login or password"}/>
                    )}
                </div>

                <div
                    className={cn("login_button")}
                >
                    <Button type={"submit"} onclick={() => {
                    }} size={"large"}>Login</Button>
                </div>
            </form>
            <div className={cn("link")}>
                <NavLink to={"/forgotPassword"}>Forgot password? </NavLink>
            </div>
        </div>
    );
};

export default LoginComponent;