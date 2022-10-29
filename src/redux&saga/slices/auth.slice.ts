
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {LoginProps} from "../../interfaces/auth/AuthProps";

export interface AuthState {
    isLoggedIn: boolean;
    logging?: boolean;
    user: LoginProps|undefined|null;
    error: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    user: undefined,
    error: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginProps>) {
            state.user = action.payload;
        },
    },
});

// Actions
export const authActions = authSlice.actions;


// Reducer
const authReducer = authSlice.reducer;

export default authReducer;
