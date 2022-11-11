interface RegistrationProps {
    firstName: string;
    lastName: string;
    password: string;
}
interface LoginProps {
    email:string;
    password: string;
}

interface ForgotPasswordProps{
    email:string
}

interface ChangePasswordProps{
    id:number|string;
    password:string
}

interface UserWithToken{
    email:string;
    access_token: string
}

interface UserProps{
    firstName: string;
    lastName: string;
    email:string;
    password:string;
    role:'user'|'admin',
    iat:number,
    exp:number,
    id:number
}

interface ErrorMessageObject {
    statusCode: number,
    message: string
    error: string
}

export type {
    RegistrationProps,
    LoginProps,
    ChangePasswordProps,
    ForgotPasswordProps,
    UserWithToken
    ,UserProps,
    ErrorMessageObject
};