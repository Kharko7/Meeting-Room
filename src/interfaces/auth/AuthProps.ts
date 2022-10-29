interface RegistrationProps {
    firstName: string;
    lastName: string;
    password: string;
}
interface LoginProps {
    // firstName: string;
    // lastName: string;
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

interface User{
    firstName: string;
    lastName: string;
    email:string;
    password:string
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
    ,User,
    ErrorMessageObject
};