import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {NavLink, useNavigate} from "react-router-dom";

import classNames from 'classnames/bind';
import styles from './LoginComponent.module.scss'
import {ErrorComponent, InputRe} from "../../index";
import Button from "components/button";
import {FileUploaderComponent} from "../../fileUploader/FileUploaderComponent";


const cn = classNames.bind(styles)


const LoginComponent = () => {
    const {reset, register, handleSubmit, formState: {errors, isValid, isDirty}} = useForm({mode: 'all'});

    const [error, setError] = useState<boolean>(false);

    const navigate = useNavigate();

    localStorage.setItem('accessToRegister', JSON.stringify(true));


    const submit: SubmitHandler<any> = async (data) => {
        // @ts-ignore
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const login = user.name + " " + user.surname;
            (login === data.login && user.password === data.password)
                ? navigate('/rooms') : setError(true);
            reset();
        } else {
            setError(true)
            reset()
        }
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
                    error={errors.login}
                    type={"login"}
                    register={register}
                    name={"login"}
                    placeHolder={"full name"}
                    required={true}
                    placeholderDisappear={"Sponge Bob"}
                    size={"extra-small"}
                />

                <InputRe
                    isValid={false}
                    error={errors.password}
                    type={"password"}
                    register={register}
                    name={"password"}
                    placeHolder={"password"}
                    required={true}
                    size={"extra-small"}
                />

                <div className={cn("error_container")}>
                    {error && !isDirty && (
                        <ErrorComponent title={"Ooops...Wrong login or password"}/>
                    )}
                </div>

                <div
                    className={cn("login_button")}
                >
                    <Button onclick={() => {
                    }} size={"large"}>Login</Button>
                </div>
            </form>
            <div className={cn("link")}>
                <NavLink to={"/forgotPassword"}>Forgot password?</NavLink>
            </div>
        </div>
    );
};

export default LoginComponent;