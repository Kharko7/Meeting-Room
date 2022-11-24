import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss'
import Button from "components/button";
import {InputRe} from "../../index";
import {EmailSchema} from "../../../utils/yup.validation";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useAppDispatch, useAppSelector} from "../../../hooks/toolkitHooks";
import {authActions} from "../../../redux&saga/slices/auth.slice";
import {NavLink} from "react-router-dom";
import {useModal} from "../../../hooks/show.modal";
import {DialogComponent} from "../../dialog/DialogComponent";
import CloseBtn from "../../close-btn/CloseBtn";
import "animate.css";

import {FaCloud,} from 'react-icons/fa';
import {SiMinutemailer} from "react-icons/si";


const cn = classNames.bind(styles)

const ForgotPasswordComponent = () => {
    const {reset, register, handleSubmit, formState: {errors, isDirty}} = useForm({
        mode: 'all',
        resolver: yupResolver(EmailSchema)
    });
    const dispatch = useAppDispatch();
    let {success} = useAppSelector(state => state.auth);
    let {isShowing, toggle} = useModal();

    useEffect(() => {
        if (success) {
            toggle();
            isShowing = false;
            dispatch(authActions.success(false))

        }
    }, [success])


    const submit: SubmitHandler<any> = async (data) => {
        dispatch(authActions.forgotPasswordSendEmail(data))
        reset();
    }

    return (
        <div className={cn("forgotPassword_container", "animate__bounceIn animate__pulse")}>
            {
                isShowing &&
                <div>
                    <DialogComponent
                        isShowing={isShowing}
                        children={<div className={cn('container-modal')}>

                            <CloseBtn onclick={toggle}></CloseBtn>

                            <div className={cn("response")}>
                                <div className={cn("title-modal")}>{"Check your mail"}</div>
                                <div
                                    className={cn("body")}>
                                    <span className={cn('body-part','body-part-1')}>{"We have sent a new password to it"}</span>
                                    <span className={cn('body-part','body-part-2')}>
                                        <div className={cn('body-box')}></div>
                                        <span className={cn('body-text')}>{"You can log in with it and later change in your account settings"}</span>
                                        <div className={cn('body-box')}></div>
                                    </span>
                                </div>
                            </div>
                                <div className={cn('loader')}>
                                    <div className={cn('plane')}>
                                        <i className={cn("fas",'fa-plane')}><SiMinutemailer/></i>
                                        <i className={cn("fas","fa-cloud",'one')} ><FaCloud/></i>
                                        <i className={cn("fas","fa-cloud",'two')} ><FaCloud/></i>
                                        <i className={cn("fas","fa-cloud",'three')} ><FaCloud/></i>
                                        <i className={cn("fas","fa-cloud",'four')} ><FaCloud/></i>
                                        <i className={cn("fas","fa-cloud",'five')} ><FaCloud/></i>

                                        <i className={cn("fas","fa-cloud-2",'six')} ><FaCloud/></i>
                                        <i className={cn("fas","fa-cloud-2",'seven')} ><FaCloud/></i>
                                        <i className={cn("fas","fa-cloud-2",'eight')} ><FaCloud/></i>
                                        <i className={cn("fas","fa-cloud-2",'nine')} ><FaCloud/></i>
                                        <i className={cn("fas","fa-cloud-2",'ten')} ><FaCloud/></i>

                                        <i className={cn("fas","fa-cloud-3",'eleven')} ><FaCloud/></i>
                                        <i className={cn("fas","fa-cloud-3",'twelve')} ><FaCloud/></i>
                                        <i className={cn("fas","fa-cloud-3",'thirteen')} ><FaCloud/></i>

                                        <i className={cn("fas","fa-cloud-4",'fourteen')} ><FaCloud/></i>
                                        <i className={cn("fas","fa-cloud-4",'fifteen')} ><FaCloud/></i>
                                    </div>
                                    <span><i></i></span>
                                </div>



                            <div className={cn("link-box")}>
                                <NavLink to={'/auth/login'}>To Login</NavLink>
                            </div>
                        </div>}
                    />
                </div>}

            <span className={cn("spanAnimation")}>
          <div className={cn("title")}>
            Enter your user account verified email address and we will send you
            a password reset link
          </div>
        </span>
            <form onSubmit={handleSubmit(submit)} className={cn("form_container")}>
                <InputRe
                    isValid={true}
                    error={errors.email}
                    type={""} // css styles don't work with email type
                    register={register}
                    name={"email"}
                    placeHolder={"Email"}
                    required={true}
                    placeholderDisappear={"...@incora.inc"}
                />
                <div className={cn("send_button")}>
                    <Button type={"submit"} onclick={() => {
                    }} size={"large"}>Send</Button>
                </div>
            </form>
            <div className={cn("link")}>
                <NavLink to={'/auth/login'}> Go to Login</NavLink>
            </div>
        </div>
    );

};

export default ForgotPasswordComponent;