
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {LoginProps, RegistrationProps, UserProps} from "../../interfaces/auth/AuthProps";

export interface AuthState {
    pending?: boolean;
    success?: boolean;
    rejected?: boolean;
    login: LoginProps|undefined|null;
    errorCode: number|undefined;
    register:RegistrationProps|undefined,
    forgotPasswordEmail:string|undefined,
    changePassword:string|undefined,
    invitations:string[]|undefined,

    user:UserProps|undefined
}

const initialState: AuthState = {
    register: undefined,
    login: undefined,
    user:undefined,

    forgotPasswordEmail:undefined,
    changePassword:undefined,
    invitations:undefined,

    errorCode: undefined,
    pending:false,
    success:false,
    rejected:false,
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
        errorMsg(state, action: any) {
            state.errorCode = action.payload;
            state.success = false;
        },
        pending(state, action: any) {
            state.success = false;
            state.pending = action.payload;
        },
        success(state, action: any) {
            state.success = action.payload;
        },
        forgotPasswordSendEmail(state,action:any){
            state.forgotPasswordEmail = action.payload;
        },
        changePassword(state,action:any){
            state.changePassword = action.payload;
        },
        getInvitation(state,action:any){
            state.invitations = action.payload;
        },

    },
});

// Actions
export const authActions = authSlice.actions;

// Reducer
const authReducer = authSlice.reducer;

export default authReducer;
