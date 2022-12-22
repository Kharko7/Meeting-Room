
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";
import { ChangePasswordInterface, InviteUsersInterface, Login, RecoveryPasswordInterface, RegisterInterface, Role, UserResponse } from 'interfaces/User';
import { snackbarVariants } from 'constants/snackbar';

interface Notification {
    message: string;
    status: snackbarVariants;
}
export interface InitialStateUser {
    firstName: string;
    lastName: string;
    userId: number | null;
    userRole: Role | null;
    userEmail: string;
    loading: boolean;
    notification: Notification;
    userRecovered: boolean;
}

const initialState: InitialStateUser = {
    firstName: '',
    lastName: '',
    userEmail: '',
    userId: null,
    userRole: null,
    loading: true,
    notification: { message: '', status: snackbarVariants.error },
    userRecovered: false
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
            state.loading = false;
            state.firstName = userData.firstName;
            state.lastName = userData.lastName;
            state.userId = userData.id;
            state.userRole = userData.role;
            state.userEmail = userData.email;

        },
        userLoginError(state, action: PayloadAction<string>) {
            state.notification = { status: snackbarVariants.error, message: action.payload };
            state.loading = false;
        },

        userSignup(state, action: PayloadAction<RegisterInterface>) {
            state.loading = true;
        },
        userSignupSuccess(state, action: PayloadAction<string>) {
            state.notification = { status: snackbarVariants.success, message: action.payload };
            state.loading = false;
        },
        userSignupError(state, action: PayloadAction<string>) {
            state.notification = { status: snackbarVariants.error, message: action.payload };
            state.loading = false;
        },

        changePassword(state, action: PayloadAction<ChangePasswordInterface>) {
            state.loading = true;
        },
        changePasswordError(state, action: PayloadAction<string>) {
            state.notification = { status: snackbarVariants.error, message: action.payload };
            state.loading = false;
        },
        changePasswordSuccess(state, action: PayloadAction<string>) {
            state.notification = { status: snackbarVariants.success, message: action.payload };
            state.loading = false;
        },

        recoveryPassword(state, action: PayloadAction<RecoveryPasswordInterface>) {
            state.loading = true;
        },
        recoveryPasswordError(state, action: PayloadAction<string>) {
            state.notification = { status: snackbarVariants.error, message: action.payload };
            state.loading = false;
        },
        recoveryPasswordSuccess(state, action: PayloadAction<boolean>) {
            state.userRecovered = action.payload
            state.loading = false;
        },

        inviteUsers(state, action: PayloadAction<InviteUsersInterface[]>) {
            state.loading = true;
        },


        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setNotification(state, action: PayloadAction<Partial<Notification>>) {
            state.notification = { ...state.notification, ...action.payload };
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
    userSignup,
    userSignupSuccess,
    userSignupError,
    changePassword,
    changePasswordSuccess,
    changePasswordError,
    recoveryPassword,
    recoveryPasswordSuccess,
    recoveryPasswordError,
    inviteUsers,

    setLoading,
    setNotification,
    resetState,
} = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
