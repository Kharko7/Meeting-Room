
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";
import { Login, Role, UserResponse } from 'interfaces/User';

export interface InitialStateUser {
    firstName: string;
    lastName: string;
    userId: number | null;
    userRole: Role | null;
    userEmail: string;
    loading: boolean;
    error: string;
}

const initialState: InitialStateUser = {
    firstName: '',
    lastName: '',
    userEmail: '',
    userId: null,
    userRole: null,
    loading: true,
    error: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin(state, action: PayloadAction<Login>) {
            state.loading = true;
        },
        userLoginSuccess(state, action: PayloadAction<string>) {
            const userData: UserResponse = jwt_decode(action.payload);
            console.log(userData)
            state.loading = false;
            state.firstName = userData.firstName;
            state.lastName = userData.lastName;
            state.userId = userData.id;
            state.userRole = userData.role;
            state.userEmail = userData.email;

        },
        userLoginError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        resetState(state) {
            state.userId = initialState.userId
            state.userRole = initialState.userRole
            state.userEmail = initialState.userEmail
            state.firstName = initialState.firstName
            state.lastName = initialState.lastName
        },
    },
});
export const {
    userLogin,
    userLoginSuccess,
    userLoginError,
    setLoading,
    setError,
    resetState,
} = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
