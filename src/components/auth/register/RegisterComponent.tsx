import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {NavLink, useNavigate, useParams} from "react-router-dom";


import Button from "components/button";
import {ErrorComponent, InputRe, SwitchToLoginComponent} from "../../index";

import classNames from 'classnames/bind';
import styles from './RegisterPage.module.scss'
import {checkPasswordMatch, registerClear} from "../../../utils/auth-foo";
import {useAppDispatch, useAppSelector} from "../../../hooks/toolkitHooks";
import {authActions} from "../../../redux&saga/slices/auth.slice";
import {yupResolver} from "@hookform/resolvers/yup";
import {RegisterSchema} from "../../../utils/yup.validation";

import 'animate.css';
import {ResponsePopup} from "../../tools/simple/response-popup/ResponsePopup";
import {regex} from "../../../constants/valid/regex";


const cn = classNames.bind(styles)

const RegisterComponent = () => {

    const {reset, register, handleSubmit, formState: {errors, isDirty}} = useForm({
        mode: 'all',
        resolver: yupResolver(RegisterSchema)
    });

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    let {success} = useAppSelector(state => state.auth);

    const [errorPassword, setErrorPassword] = useState<boolean>(false);

    useEffect(() => {
        if (success) {
            dispatch(authActions.success(false))
            navigate('/auth/login')
        }

        if(!regex.incoraEmail.test(params.email?params.email:'none')&&!success){
            navigate('/auth/login');
            ResponsePopup.ErrorPopup('404\nWrong registration link').then()
        }

    }, [success,params.email]);





    const submit: SubmitHandler<any> = async (data) => {
            if (checkPasswordMatch(data.password, data.passwordConfirm)) {
                data.email = params.email;
                console.log(data)
                data = registerClear(data);
                await dispatch(authActions.register(data));
                setErrorPassword(false);
            } else {
                setErrorPassword(true);
            }
            reset();

    }

    return (
        <div className={cn("main_container","animate__bounceIn animate__fadeIn")}>
            <form onSubmit={handleSubmit(submit)} className={cn("container")}>
                <div className={cn("createAccount")}>Create Account</div>
                <span className={cn("registration")}>Registration</span>

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
            <NavLink to={"/auth/login"} className={cn("switch")}>
                <SwitchToLoginComponent/>
            </NavLink>

        </div>
    );
};

export default RegisterComponent;