import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {NavLink} from "react-router-dom";

import 'animate.css';

import classNames from 'classnames/bind';
import styles from './LoginComponent.module.scss'
import {ErrorComponent, InputRe} from "../../index";
import Button from "components/button";
import {useAppDispatch, useAppSelector} from "../../../hooks/toolkitHooks";
import {authActions} from "../../../redux&saga/slices/auth.slice";


const cn = classNames.bind(styles)


const LoginComponent = () => {

    const {reset, register, handleSubmit, formState: {isDirty}} = useForm({mode: 'all'});

    const dispatch = useAppDispatch();

    let {errorCode} = useAppSelector(state => state.auth);

    const submit: SubmitHandler<any> = async (user) => {
        await dispatch(authActions.login(user));
        await reset();
    }


    return (
        <div className={cn("login_container","animate__bounceIn animate__zoomIn")}>
            <div className={cn("logo_container")}>
                <div className={cn("logo")}>
                    {/*<img*/}
                    {/*    src="https://i.pinimg.com/originals/c9/af/8e/c9af8efe164f75b2d3aaebf5534892b0.png"*/}
                    {/*    alt="logo"*/}
                    {/*    className={cn('img')}*/}
                    {/*/>*/}
                    <span className={cn('incora')}>INCORA</span>
                </div>
                {/*<div className={cn("title")}>Booking</div>*/}
                {/*<div className={cn("sub_title")}>Manage your time</div>*/}
            </div>
            <form onSubmit={handleSubmit(submit)} className={cn("form_container")}>
                <InputRe
                    isValid={false}
                    type={""}
                    register={register}
                    name={"email"}
                    placeHolder={"Email"}
                    required={true}
                    placeholderDisappear={"...@incorainc.com"}
                    size={"extra-small"}
                />

                <InputRe
                    isValid={false}
                    type={"password"}
                    register={register}
                    name={"password"}
                    placeHolder={"Password"}
                    required={true}
                    size={"extra-small"}
                />

                <div className={cn("error_container")}>
                    {(
                        errorCode === 400 &&
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