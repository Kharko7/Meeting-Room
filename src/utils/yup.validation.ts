import { regex } from "constants/valid/regex";
import * as yup from "yup";
import {validErrorsMsg} from "../constants/valid/valid.errors.msg";

export const RegisterSchema = yup.object().shape({
    login: yup.string()
        .required("")
        .matches(regex.twoWordsBySpace,
            validErrorsMsg.loginErrorMsg),
    password: yup.string()
        .required("")
        .matches(regex.strongPassword,
            validErrorsMsg.passwordErrorMsg),
    passwordConfirm: yup.string()
        .required("")
        .matches(regex.strongPassword,
            validErrorsMsg.passwordErrorMsg)

});

export const ChangePasswordSchema = yup.object().shape({
    newPassword: yup.string()
        .required("")
        .matches(regex.strongPassword,
            validErrorsMsg.passwordErrorMsg)
    ,
    passwordConfirm: yup.string()
        .required("")
        .matches(regex.strongPassword,
           validErrorsMsg.passwordErrorMsg)
    ,
    password: yup.string()
        .required(""),

});

export const EmailSchema = yup.object().shape({
    email: yup.string()
        .required("")
        .matches(regex.incoraEmail
            ,validErrorsMsg.emailErrorMsg)
});

export const GetInvitationSchema = yup.object({
    questions: yup.lazy(() => yup.array().of(yup.object({
        email: yup.string().required("")
            .matches(regex.incoraEmail,
                validErrorsMsg.emailErrorMsg)
    })))
})
