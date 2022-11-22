interface RegistrationProps {
    firstName: string;
    lastName: string;
    password: string;
    email:string
}
interface LoginProps {
    email:string;
    password: string;
}

interface ForgotPasswordProps{
    email:string
}

interface PasswordChange{
    password:string;
    newPassword:string;
    email:string;
}

interface UserWithToken{
    email:string;
    access_token: string
}

export enum role{
    'user',
    'admin'
}

interface UserProps{
    firstName: string;
    lastName: string;
    email:string;
    password:string;
    role:role|string,
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
    PasswordChange,
    ForgotPasswordProps,
    UserWithToken
    ,UserProps,
    ErrorMessageObject
};