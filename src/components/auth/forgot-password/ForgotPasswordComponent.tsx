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
import {NavLink, useNavigate} from "react-router-dom";
import {useModal} from "../../../hooks/show.modal";
import {DialogComponent} from "../../dialog/DialogComponent";
import CloseBtn from "../../close-btn/CloseBtn";
import "animate.css";

import {FaPaperPlane,FaCloud} from 'react-icons/fa';

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

                            {/*<div className={cn("container")}>*/}
                            {/*    <svg className={cn("mailbox-icon")} viewBox="0 0 105.833 71.462">*/}
                            {/*        <path fill="var(--additionalColor)" stroke="#000" strokeWidth="6"*/}
                            {/*              d="M284.352 253.985h68.594v76.322h-68.594z"*/}
                            {/*              transform="matrix(.16407 0 0 .16797 -9.446 -2.445)"/>*/}
                            {/*        <path*/}
                            {/*            d="M506.335 105.475s62.276-7.22 57.763 155.24l-115.741 44.34c.35-.175-27.452-160.926 57.978-199.58z"*/}
                            {/*            stroke="#000" transform="matrix(.16407 0 0 .16797 -9.446 -2.445)"/>*/}
                            {/*        <g className={cn("mail-message")} stroke="#000" strokeWidth="6">*/}
                            {/*            <path fill="#ffe680" d="M84.703 161.188h209.876v126.114H84.703z"*/}
                            {/*                  transform="matrix(.18674 .02414 -.02414 .18674 13.5 -17.628)"/>*/}
                            {/*            <path*/}
                            {/*                d="M84.697 169.188s63.973 55.998 104.945 55.998c40.97 0 104.932-55.998 104.932-55.998l.006 118.114H84.703z"*/}
                            {/*                fill="#ffe680"*/}
                            {/*                transform="matrix(.18674 .02414 -.02414 .18674 13.5 -17.628)"/>*/}
                            {/*            <path d="M84.703 287.302l67.763-70.586M294.58 287.302l-67.763-70.586"*/}
                            {/*                  fill="none"*/}
                            {/*                  transform="matrix(.18674 .02414 -.02414 .18674 13.5 -17.628)"/>*/}
                            {/*        </g>*/}
                            {/*        <path*/}
                            {/*            d="M156.142 263.423s-27.076-175.096 63.18-181.414l287.013 23.466s-87.549 27.077-56.862 194.953"*/}
                            {/*            fill="var(--additionalColor)" stroke="#000" strokeWidth="6"*/}
                            {/*            transform="matrix(.16407 0 0 .16797 -9.446 -2.445)"/>*/}
                            {/*        <path d="M156.142 263.423l293.331 37.005" fill="none" stroke="#000"*/}
                            {/*              strokeWidth="6" transform="matrix(.16407 0 0 .16797 -9.446 -2.445)"/>*/}
                            {/*        <g className={cn("mail-check")} stroke="#000">*/}
                            {/*            <path d="M419.689 23.466v187.486" fill="none" strokeWidth="12"*/}
                            {/*                  transform="matrix(0 -.16797 .16407 0 24.028 102.317)"/>*/}
                            {/*            <path fill="#a00" strokeWidth="8" d="M334.641 23.466h87.548v47.836h-87.548z"*/}
                            {/*                  transform="matrix(0 -.16797 .16407 0 24.028 102.317)"/>*/}
                            {/*        </g>*/}
                            {/*    </svg>*/}
                            {/*</div>*/}
                                <div className={cn('loader')}>
                                    <div className={cn('rocket')}>
                                        <i className={cn("fas",'fa-rocket')}><FaPaperPlane/></i>
                                        <i className={cn("fas","fa-cloud",'one')} ><FaCloud/></i>
                                        <i className={cn("fas","fa-cloud",'two')} ><FaCloud/></i>
                                        <i className={cn("fas","fa-cloud",'three')} ><FaCloud/></i>
                                        <i className={cn("fas","fa-cloud",'four')} ><FaCloud/></i>
                                        <i className={cn("fas","fa-cloud",'five')} ><FaCloud/></i>
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