import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {ErrorComponent, InputRe} from '../..';
import Button from "components/button";
import {checkPasswordMatch} from "../../../utils/auth-foo";
import {ChangePasswordSchema} from "../../../utils/yup.validation";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import KeyIcon from '@mui/icons-material/Key';

import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks/toolkitHooks";
import {authActions} from "../../../redux&saga/slices/auth.slice";
import {getUserData} from "../../../services/local-storage.service";
import LoadingComponent from "../../tools/simple/loading/LoadingComponent";
import ErrorToManyRequest from "../../tools/simple/error-429/ErrorToManyRequest";

const cn = classNames.bind(styles)

const ChangePasswordComponent = () => {
    const {reset, register, handleSubmit, formState: {errors, isDirty}} = useForm({
        mode: 'all',
        resolver: yupResolver(ChangePasswordSchema)
    });

    const dispatch = useAppDispatch();
    const [error, setError] = useState<boolean>(false);
    const [errorOldPassword, setErrorOldPassword] = useState<boolean>(false);
    const {success, errorCode} = useAppSelector(state => state.auth);

    const user_data = getUserData();

    useEffect(() => {
        if (success) {
            dispatch(authActions.success(false))
        }
        errorCode === 403 && setErrorOldPassword(true);
    }, [success, errorCode])

    const submit: SubmitHandler<any> = async (data) => {
        if (checkPasswordMatch(data.newPassword, data.passwordConfirm)) {
            delete data.passwordConfirm
            data.email = user_data?.email;
            await dispatch(authActions.changePassword(data));
            setError(false);
        } else {
            setError(true);
        }
        setErrorOldPassword(false);
        reset();

    }

    return (
        <div className={cn("changePassword_container")}>
            <LoadingComponent/>
            <ErrorToManyRequest/>
            <form onSubmit={handleSubmit(submit)} className={cn("form_container")}>
                <div className={cn("title")}>Password Change</div>
                <div className={cn("login")}>
                    <KeyIcon/>
                </div>

                <span className={cn("oldPassword")}><InputRe
                    isValid={false}
                    error={errors.password}
                    type={"password"}
                    register={register}
                    name={"password"}
                    placeHolder={"Enter old password"}
                    required={true}
                /></span>

                <InputRe
                    isValid={true}
                    error={errors.newPassword}
                    type={"password"}
                    register={register}
                    name={"newPassword"}
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
                        <ErrorComponent title={"Oops!!! Newly created passwords do not match"}/>
                    )}
                    {
                        errorOldPassword && !isDirty && (
                            <ErrorComponent title={'Hmm... It is not your old password...'}/>
                        )
                    }
                </div>
                <div
                    className={cn("change_button")}
                >
                    <Button type={"submit"} onclick={() => {
                    }} size={"large"}>Change Password</Button>
                </div>

            </form>
        </div>
    );
};

export default ChangePasswordComponent