import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";



import classNames from 'classnames/bind';
import styles from './GetInvitation.module.scss'
import {InputRe} from "../../index";
import Button from "components/button";
const cn = classNames.bind(styles)




const GetInvitationComponent = () => {
    const {reset, register, handleSubmit, formState: {errors,isValid,isDirty}} = useForm({mode: 'all'});

    const [error,setError] = useState<boolean>(false);

    const navigate = useNavigate();
    localStorage.setItem('accessToGetInvitation',JSON.stringify(false));

    const submit:SubmitHandler<any> = async (data) => {
        navigate('/login');
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
              <div className={cn("title")}>
                Enter your email to receive an invitation
              </div>
            </span>
            <form
              onSubmit={handleSubmit(submit)}
              className={cn("form_container")}
            >
              <InputRe
                isValid={true}
                error={errors.verifyEmail}
                type={""}
                register={register}
                name={"verifyEmail"}
                placeHolder={"email"}
                required={true}
                placeholderDisappear={"...@incora.inc"}
              />
              <button
                className={cn("checkCode_button")}
                disabled={!isDirty || !isValid}
              >
                <Button onclick={()=>{}}>Send</Button>
              </button>
            </form>
          </div>
        </div>
      </div>
    );

};

export default GetInvitationComponent;