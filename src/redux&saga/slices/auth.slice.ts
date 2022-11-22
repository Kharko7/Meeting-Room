
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {LoginProps, PasswordChange, RegistrationProps, UserProps} from "../../interfaces/auth/AuthProps";


export interface AuthState {
    pending?: boolean;
    success?: boolean;
    rejected?: boolean;
    login: LoginProps|undefined|null;
    errorCode: number|undefined;
    register:RegistrationProps|undefined,
    forgotPasswordStr:string|undefined,
    changePassword:PasswordChange|undefined,
    invitations:string[]|undefined,

    user:UserProps|undefined,

    strResponse:string|undefined
}

const initialState: AuthState = {
    register: undefined,
    login: undefined,
    user:undefined,

    forgotPasswordStr:undefined,
    changePassword:undefined,
    invitations:undefined,

    errorCode: undefined,
    pending:false,
    success:false,
    rejected:false,

    strResponse:undefined
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginProps>) {
            state.login = action.payload;
            state.errorCode = undefined;
        },
        register(state, action: PayloadAction<RegistrationProps>) {
            state.register = action.payload;
            state.errorCode = undefined;
        },
        setUser(state,action:PayloadAction<UserProps>){
            state.user = action.payload;
        },
        errorMsg(state, action: PayloadAction<number|undefined>) {
            state.errorCode = action.payload;
            state.success = false;
        },
        pending(state, action: PayloadAction<boolean|undefined>) {
            state.success = false;
            state.pending = action.payload;
        },
        success(state, action: PayloadAction<boolean|undefined>) {
            state.success = action.payload;
        },
        forgotPasswordSendEmail(state,action:PayloadAction<string|undefined>){
            state.forgotPasswordStr = action.payload;
        },
        changePassword(state,action:any){
            state.changePassword = action.payload;
        },
        getInvitation(state,action:any){
            state.invitations = action.payload;
        },
        setResponseForgotPassword(state, action:any){
            state.strResponse = action.payload;
        }
    },
});

// Actions
export const authActions = authSlice.actions;

// Reducer
const authReducer = authSlice.reducer;

export default authReducer;
