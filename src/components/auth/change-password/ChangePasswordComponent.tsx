import React, { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";

import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss'
import { useNavigate } from "react-router-dom";
import { ErrorComponent, InputRe } from '../..';
import Button from "components/button";
import {checkPasswordMatch} from "../../../utils/auth-foo";
import {ChangePasswordSchema, RegisterSchema} from "../../../utils/yup.validation";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";


const cn = classNames.bind(styles)

const ChangePasswordComponent = () => {
  const { reset, register, handleSubmit, formState: { errors, isDirty } } = useForm({
    mode: 'all',
    resolver: yupResolver(ChangePasswordSchema)
  });
  const navigate = useNavigate();

  const [error, setError] = useState<boolean>(false);


  const user = localStorage.getItem("user");
  const userParse = user && JSON.parse(user);
  let login:string = "";
  if (user) {
    login = userParse.name + " " + userParse.surname;
  }


  const submit: SubmitHandler<any> = async (data) => {
    if (checkPasswordMatch(data.password,data.passwordConfirm)) {
      navigate('/login');
    } else {
      setError(true);
    }
    reset();
  }
  return (
    <div className={cn("changePassword_container")}>
      <form onSubmit={handleSubmit(submit)} className={cn("form_container")}>
        <div className={cn("title")}>Password Change</div>
        <div className={cn("login")}>{login}</div>
        <InputRe
          isValid={true}
          error={errors.password}
          type={"password"}
          register={register}
          name={"password"}
          placeHolder={"Create new password"}
          required={true}
        />
        <InputRe
          isValid={true}
          error={errors.passwordConfirm}
          type={"password"}
          register={register}
          name={"passwordConfirm"}
          placeHolder={"Confirm new password"}
          required={true}
        />
        <div className={cn("error_container")}>
          {error && !isDirty && (
            <ErrorComponent title={"Passwords do not match"} />
          )}
        </div>
        <div
          className={cn("change_button")}
        >
          <Button type={"submit"} onclick={() => { }} size={"large"}>Change Password</Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordComponent