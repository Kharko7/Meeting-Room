import * as yup from "yup";

import { Errors } from "constants/errors";
import { regex } from "constants/regexp";

export const LoginSchema = yup.object().shape({
  email: yup.string()
    .required(Errors.emptyField),
  password: yup.string()
    .required(Errors.emptyField)
});

export const RegisterSchema = yup.object().shape({
  firstName: yup.string()
    .required(Errors.emptyField),
  lastName: yup.string()
    .required(Errors.emptyField),
  password: yup.string()
    .min(8, Errors.passwordLength)
    .max(25, Errors.passwordLength)
    .matches(regex.strongPassword,
      Errors.password),
  confirmPassword: yup.string()
    .required(Errors.emptyField)
    .oneOf([yup.ref('password'), null], "Passwords don't match!")
});

export const ChangePasswordSchema = yup.object().shape({
  newPassword: yup.string()
    .min(8, Errors.passwordLength)
    .max(25, Errors.passwordLength)
    .matches(regex.strongPassword,
      Errors.password),
  confirmPassword: yup.string()
    .required(Errors.emptyField)
    .oneOf([yup.ref('newPassword'), null], "Passwords don't match!"),
  password: yup.string()
    .required(Errors.emptyField),
});

export const EmailSchema = yup.object().shape({
  email: yup.string()
    .required(Errors.emptyField)
    .matches(regex.incoraEmail, Errors.email)
});

export const InviteUsersSchema = yup.object({
  emails: yup.lazy(() => yup.array().of(yup.object({
    email: yup.string()
      .required(Errors.emptyField)
      .matches(regex.incoraEmail,
        Errors.email)
  })))
})