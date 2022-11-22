import React, {useEffect} from 'react';
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";

import classNames from 'classnames/bind';
import styles from './GetInvitation.module.scss'
import {InputRe} from "../../index";
import Button from "components/button";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {GetInvitationSchema} from "../../../utils/yup.validation";
import {useAppDispatch, useAppSelector} from "../../../hooks/toolkitHooks";
import {authActions} from "../../../redux&saga/slices/auth.slice";
import {NavLink} from "react-router-dom";

const cn = classNames.bind(styles)

const GetInvitationComponent = () => {

    const {reset, register, handleSubmit, control,formState:{errors}} = useForm(
        {
            mode: 'all',
            resolver: yupResolver(GetInvitationSchema),
            defaultValues: {
                questions: [{email: ""}]
            },
        });

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "questions"
    });

    const dispatch = useAppDispatch();

    const submit: SubmitHandler<any> = async (data) => {
        await dispatch(authActions.getInvitation(data.questions));
        reset();
    }

    return (
        <div className={cn("div4scroll")}>
            <div className={cn("verifyEmail_container")}>
                <div className={cn("verify_container")}>
            <span className={cn("spanAnimation")}>
              <div className={cn("title")}>
               Enter the email(s) that will receive the invitation
              </div>
            </span>
                    <form onSubmit={handleSubmit(submit)} className={cn("form_container")}>
                        <ul>
                            {fields.map((item, index) => {
                                return (
                                    <li key={item.id} className={cn("box-of-input-and-btn")}>
                                        <Controller control={control} name={`questions.${index}.email`}
                                                    render={() =>
                                                        <InputRe
                                                            isValid={true}
                                                            type={""}
                                                            register={register}
                                                            name={`questions[${index}].email`}
                                                            placeHolder={"Email"}
                                                            required={true}
                                                            placeholderDisappear={"...@incorainc.com"}
                                                            size={"small"}
                                                            error={ errors.questions?.[index]?.email}
                                                        />
                                        }
                                        />
                                        <Button size={"smallAndHigh"} onclick={() => remove(index)}>
                                            Delete
                                        </Button>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className={cn("box-of-buttons")}>
                            <div>
                                <Button onclick={() => append({email: ""})}
                                        size={'smallAndHigh'}>Add</Button>
                            </div>
                            <div>
                                <Button onclick={() =>
                                    reset()} size={"smallAndHigh"}>Reset</Button>
                            </div>
                        </div>

                        <div
                            className={cn("checkCode_button")}
                        >
                            <Button type={"submit"} onclick={() => {
                            }} size={"large"}>Send</Button>
                        </div>
                    </form>
                    <div className={cn("link")}>
                        <NavLink to={"/auth/forgotPassword"}>
                            <span>Go to rooms</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default GetInvitationComponent;