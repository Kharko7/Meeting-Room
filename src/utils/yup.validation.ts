import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
    login: yup.string()
        .required("")
        .matches(new RegExp(/^[a-zA-ZА-яіІїЇґҐёЁє`'-]{2,}\s[a-zA-ZА-яіІїЇґҐёЁє`'-]{2,}$/),
            "Enter your name and surname"),
    password: yup.string()
        .required("")
        .matches(new RegExp(/^(?=.*[a-zа-яіїґёєу])(?=.*[A-ZА-ЯІЇҐЁЄ])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/),
            "Enter at least 8 characters, including lowercase, uppercase, numbers and special symbols"),
    passwordConfirm: yup.string()
        .required("")
        // .oneOf([yup.ref('password'), null], 'Passwords must match')
        .matches(new RegExp(/^(?=.*[a-zа-яіїґёєу])(?=.*[A-ZА-ЯІЇҐЁЄ])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/),
            "Enter at least 8 characters, including lowercase, uppercase, numbers and special symbols")

});

export const ChangePasswordSchema = yup.object().shape({
    password: yup.string()
        .required("")
        .matches(new RegExp(/^(?=.*[a-zа-яіїґёєу])(?=.*[A-ZА-ЯІЇҐЁЄ])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/),
            "Enter at least 8 characters, including lowercase, uppercase, numbers and special symbols"),
    passwordConfirm: yup.string()
        .required("")
        // .oneOf([yup.ref('password'), null], 'Passwords must match')
        .matches(new RegExp(/^(?=.*[a-zа-яіїґёєу])(?=.*[A-ZА-ЯІЇҐЁЄ])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/),
            "Enter at least 8 characters, including lowercase, uppercase, numbers and special symbols")

});

export const EmailSchema = yup.object().shape({
    email: yup.string()
        .required("")
        .matches(new RegExp(/^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@incorainc.com+$/, "gm"),"Only domain @incorainc.com is accepted")
});

export const GetInvitationSchema = yup.object({
    questions: yup.lazy(() => yup.array().of(yup.object({
        email: yup.string().required("")
            .matches(new RegExp(/^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@incorainc.com+$/, "gm"),"Only domain @incorainc.com is accepted")
    })))
})
