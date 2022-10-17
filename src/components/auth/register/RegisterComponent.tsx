import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {NavLink, useNavigate} from "react-router-dom";


import Button from "../../Button/ButtonComponent";
import {ErrorComponent, InputRe, SwitchToLoginComponent} from "../../index";
import {FileUploaderComponent} from "../../fileUploader/FileUploaderComponent";

import classNames from 'classnames/bind';
import styles from './RegisterPage.module.scss'
import FaceIcon from "@mui/icons-material/Face";

const cn = classNames.bind(styles)

const RegisterComponent = () => {

    const {reset, register, handleSubmit, formState: {errors,isDirty}} = useForm({mode: 'all'});

    const navigate = useNavigate();

    const [error,setError] = useState<boolean>(false);

    // localStorage.setItem('accessToRegister',JSON.stringify(false));
    localStorage.setItem('accessToGetInvitation',JSON.stringify(true));

    console.log(errors)


    const submit:SubmitHandler<any> = (data) => {

        if (data.password === data.passwordConfirm) {

            let username = data.login.split(" ") ;
            data.name = username[0];
            data.surname = username[1];
            delete data.passwordConfirm ;
            delete data.login;


            if(data.avatar[0])data.avatar = data.avatar[0].name
            console.log(data.avatar[0])



            localStorage.setItem('user', JSON.stringify(data));
            navigate('/login');
        }else {
            setError(true);
        }
        reset();
    }

    return (
            <div className={cn('main_container')}>
                    <form onSubmit={handleSubmit(submit)} className={cn("container")}>

                        <div className={cn("createAccount")}>
                            Create Account
                        </div>
                        {/*<NavRegisterComponent/>*/}

                        <span className={cn("registration")}>
                            Registration
                        </span>


                        <div><FileUploaderComponent size={"small"} name={"avatar"} required={false} register={register} icon={<FaceIcon/>}/></div>

                        <InputRe isValid={true} error={errors.login} type={"login"} register={register}
                               name={'login'} placeHolder={'Enter name and surname'} required={true} placeholderDisappear={"Howard Lovecraft"}/>

                        <InputRe isValid={true} error={errors.password} type={"password"} register={register}
                               name={'password'} placeHolder={'Create password'} required={true}/>

                        <InputRe isValid={true} error={errors.passwordConfirm} type={"password"} register={register}
                               name={'passwordConfirm'} placeHolder={'Confirm password'} required={true}/>

                        <div className={cn("wrongPassword")}>
                            {(error&&!isDirty)&&<ErrorComponent title={"Wrong password"}/>}
                        </div>

                        <div className={cn("register_button_container")}>
                            <button className={cn("register_button")}><Button label={"Register"}/></button>
                        </div>

                        <NavLink to={"/getInvitation"} className={cn("dontHaveAnAccount")}>
                            <div>Dont have an account?</div>
                        </NavLink>

                    </form>
                <NavLink to={'/login'} className={cn("switch")}><SwitchToLoginComponent/></NavLink>
            </div>
    );
};

export default RegisterComponent;