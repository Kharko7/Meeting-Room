import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {NavLink, useNavigate} from "react-router-dom";


import Button from "../../button";
import {ErrorComponent, InputRe, SwitchToLoginComponent} from "../../index";

import classNames from 'classnames/bind';
import styles from './RegisterPage.module.scss'
import {checkPasswordMatch, registerClear} from "../../../utils/auth-foo";
import {useAppDispatch, useAppSelector} from "../../../hooks/toolkitHooks";
import {authActions} from "../../../redux&saga/slices/auth.slice";
import {ResponsePopup} from "../../tools/simple/response-popup/ResponsePopup";

import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {RegisterSchema} from "../../../utils/yup.validation";


const cn = classNames.bind(styles)

const RegisterComponent = () => {

    const {reset, register, handleSubmit, formState: {errors, isDirty}} = useForm({
        mode: 'all',
        resolver: yupResolver(RegisterSchema)
    });

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    let {error, pending, success} = useAppSelector(state => state.auth);


    const [errorPassword, setErrorPassword] = useState<boolean>(false);


    useEffect(() => {
        pending && ResponsePopup.Pending().then();
        success && ResponsePopup.Success().then()
        error && ResponsePopup.ErrorPopup(error).then()
        if (success) {
            authActions.success(false);
            navigate('/login')
        }
    }, [pending, success, error])

    console.log(success)

    const submit: SubmitHandler<any> = async (data) => {
        if (checkPasswordMatch(data.password, data.passwordConfirm)) {
            data.email = "user78eef@incorainc.com";
            data = registerClear(data);
            await dispatch(authActions.register(data));
            console.log(data);
        } else {
            setErrorPassword(true);
        }
        reset();
    }
    return (
        <div className={cn("main_container")}>
            <form onSubmit={handleSubmit(submit)} className={cn("container")}>
                <div className={cn("createAccount")}>Create Account</div>
                {/*<NavRegisterComponent/>*/}
                <span className={cn("registration")}>Registration</span>

                {/*<div>*/}
                {/*  <FileUploaderComponent*/}
                {/*    size={"small"}*/}
                {/*    name={"avatar"}*/}
                {/*    required={false}*/}
                {/*    register={register}*/}
                {/*    icon={<FaceIcon />}*/}
                {/*  />*/}
                {/*</div>*/}

                <InputRe
                    isValid={true}
                    error={errors.login}
                    type={"login"}
                    register={register}
                    name={"login"}
                    placeHolder={"Enter name and surname"}
                    required={true}
                    placeholderDisappear={"Howard Lovecraft"}
                />

                <InputRe
                    isValid={true}
                    error={errors.password}
                    type={"password"}
                    register={register}
                    name={"password"}
                    placeHolder={"Create password"}
                    required={true}
                />

                <InputRe
                    isValid={true}
                    error={errors.passwordConfirm}
                    type={"password"}
                    register={register}
                    name={"passwordConfirm"}
                    placeHolder={"Confirm password"}
                    required={true}
                />

                <div className={cn("wrongPassword")}>
                    {errorPassword && !isDirty && (
                        <ErrorComponent title={"Oops...Password do not match"}/>
                    )}
                </div>

                <div className={cn("register_button_container")}>
                    <div className={cn("register_button")}>
                        <Button type={"submit"} onclick={() => {
                        }} size={"large"}>Register</Button>
                    </div>
                </div>


            </form>
            <NavLink to={"/login"} className={cn("switch")}>
                <SwitchToLoginComponent/>
            </NavLink>

        </div>
    );
};

export default RegisterComponent;