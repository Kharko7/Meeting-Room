
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {LoginProps, RegistrationProps} from "../../interfaces/auth/AuthProps";

export interface AuthState {
    pending?: boolean;
    success?: boolean;
    rejected?: boolean;
    user: LoginProps|undefined|null;
    error: string;
    registerUser:RegistrationProps|undefined
}

const initialState: AuthState = {
    registerUser: undefined,
    user: undefined,
    error: '',
    pending:false,
    success:false,
    rejected:false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginProps>) {
            state.user = action.payload;
            state.error = "";
        },
        register(state, action: PayloadAction<RegistrationProps>) {
            state.registerUser = action.payload;
            state.error = "";
        },
        errorMsg(state, action: any) {
            state.error = action.payload;
            state.success = false;
        },
        pending(state, action: any) {
            state.success = false;
            state.pending = action.payload;
        },
        success(state, action: any) {
            state.success = action.payload;
            state.error = "";
        },
    },
});

// Actions
export const authActions = authSlice.actions;

// Reducer
const authReducer = authSlice.reducer;

export default authReducer;
