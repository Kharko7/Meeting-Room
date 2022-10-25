import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {NavLink, useNavigate} from "react-router-dom";


import Button from "components/button";
import {ErrorComponent, InputRe, SwitchToLoginComponent} from "../../index";
import {FileUploaderComponent} from "../../fileUploader/FileUploaderComponent";

import classNames from 'classnames/bind';
import styles from './RegisterPage.module.scss'
import FaceIcon from "@mui/icons-material/Face";
import {useAppDispatch, useAppSelector} from "../../../hooks/toolkitHooks";
import {AuthActions} from "../../../redux/slices/auth.slice";
import {checkPasswordMatch, registerClear, validAvatarType} from "../../../utils/auth-foo";

const cn = classNames.bind(styles)

const RegisterComponent = () => {

    const {reset, register, handleSubmit, formState: {errors,isDirty}} = useForm({mode: 'all'});

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {user,error} = useAppSelector(state => state.auth);


    const [errorPassword,setErrorPassword] = useState<boolean>(false);
    const [errorFile,setErrorFile] = useState<boolean>(false);


    const submit:SubmitHandler<any> = async (data) => {
        if (checkPasswordMatch(data.password,data.passwordConfirm)) {
            data.email = "user4@incorainc.com";
            data = registerClear(data);
            if(data.avatar[0]){
                if(validAvatarType(data.avatar[0])){
                    localStorage.setItem('user',JSON.stringify(data))
                    await dispatch(AuthActions.register(data))
                    error&&navigate('/login');
                }else {
                    setErrorFile(true)
                    setErrorPassword(false);
                }
            }else {
                delete data.avatar;
                localStorage.setItem('user',JSON.stringify(data))
                await dispatch(AuthActions.register(data))
                error&&navigate('/login');
            }
        }
        else if(!checkPasswordMatch(data.password,data.passwordConfirm)&&!data.avatar[0]){
            setErrorPassword(true);
        }else {
            setErrorPassword(true);
            setErrorFile(true);
        }
        reset();
    }

    return (
      <div className={cn("main_container")}>
        <form onSubmit={handleSubmit(submit)} className={cn("container")}>
          <div className={cn("createAccount")}>Create Account</div>
          {/*<NavRegisterComponent/>*/}
          <span className={cn("registration")}>Registration</span>

          <div>
            <FileUploaderComponent
              size={"small"}
              name={"avatar"}
              required={false}
              register={register}
              icon={<FaceIcon />}
            />
          </div>

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
              <ErrorComponent title={"Oops...Password do not match"} />
            )}
            {errorFile && !isDirty && (
              <ErrorComponent title={"Oh.Wrong file type"} />
            )}
          </div>

          <div className={cn("register_button_container")}>
            <div className={cn("register_button")}>
              <Button onclick={()=>{}} size={"large"}>Register</Button>
            </div>
          </div>

        </form>

        <NavLink to={"/login"} className={cn("switch")}>
          <SwitchToLoginComponent />
        </NavLink>

      </div>
    );
};

export default RegisterComponent;