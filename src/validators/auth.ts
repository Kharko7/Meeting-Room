import * as yup from "yup";

import { Errors } from "constants/errors";
import { regex } from "constants/regexp";

export const RegisterSchema = yup.object().shape({
  login: yup.string()
    .required("")
    .matches(regex.twoWordsBySpace,
      Errors.email),
  password: yup.string()
    .required("")
    .matches(regex.strongPassword,
      Errors.password),
  passwordConfirm: yup.string()
    .required("")
    .matches(regex.strongPassword,
      Errors.password)

});

export const ChangePasswordSchema = yup.object().shape({
  newPassword: yup.string()
    .required("")
    .matches(regex.strongPassword,
      Errors.password)
  ,
  passwordConfirm: yup.string()
    .required("")
    .matches(regex.strongPassword,
      Errors.password)
  ,
  password: yup.string()
    .required(""),

});

export const EmailSchema = yup.object().shape({
  email: yup.string()
    .required("")
    .matches(regex.incoraEmail
      , Errors.email)
});

export const GetInvitationSchema = yup.object({
  questions: yup.lazy(() => yup.array().of(yup.object({
    email: yup.string().required("")
      .matches(regex.incoraEmail,
        Errors.email)
  })))
})