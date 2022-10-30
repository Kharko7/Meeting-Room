import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";


import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss'
import Button from "components/button";
import {InputRe} from "../../index";
import {EmailSchema, RegisterSchema} from "../../../utils/yup.validation";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";

const cn = classNames.bind(styles)


const ForgotPasswordComponent = () => {
    const {reset, register, handleSubmit, formState: {errors,isDirty}} = useForm({
        mode: 'all',
        resolver: yupResolver(EmailSchema)
    });
    const [email,setEmail] = useState("");

    const submit:SubmitHandler<any> = async (data) => {
        setEmail(data.email);
        reset();
    }
    return (
      <div className={cn("forgotPassword_container")}>
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
            <Button type={"submit"} onclick={()=>{}} size={"large"}>Send</Button>
          </div>
        </form>
        <div className={cn("resetMessage")}>
          {email && !isDirty && `Email was send on ${email}`}
        </div>
      </div>
    );

};

export default ForgotPasswordComponent ;