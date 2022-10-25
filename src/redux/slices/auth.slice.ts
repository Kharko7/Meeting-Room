import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {UserService} from "../../services/user.service/user.service";
import {LoginProps, RegistrationProps, User} from "../../interfaces/auth/AuthProps";
import {authService} from "../../services/auth.service/auth.services";
import {ErrorPopup} from "../../components/tools/simple/error-popup/ErrorPopup";

interface AuthState {
    user: User | null;
    isAuth: boolean | null,
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuth: false,
    error: '',
};

export const login = createAsyncThunk
('auth/login', async (user: LoginProps, {rejectWithValue}) => {
    try {
        const {data}: any = await UserService.login(user);
        console.log(data)
        return data;
    } catch (e: any) {
        await ErrorPopup(e)
        return rejectWithValue(e.response.data);
    }
});


const register = createAsyncThunk
('auth/register',
    async (user: RegistrationProps, {rejectWithValue}) => {

        console.log(user);
        try {
            const {data}: any = await UserService.register(user);
            return data;
        } catch (e: any) {
            return rejectWithValue(e.response.data);
        }
    });


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        refreshLocalStorage: (state) => {
            state.user = null;
            authService.deleteTokens()
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                authService.setTokens(action.payload)
                state.isAuth = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                authService.setTokens(action.payload)
                state.isAuth = true;
            })
            // .addCase(login.rejected, (state, action) => {
            //     console.log(action)
            // })
        .addDefaultCase((state, action) => {
            const [type] = action.type.split('/').splice(-1);
            if(type==='rejected'){
                console.log(action)
                state.error = action.payload
            }else {
                state.error = null;
            }
        })
    },

});

const {reducer: AuthReducer, actions: {refreshLocalStorage}} = authSlice;

const AuthActions = {
    register,
    login,
    refreshLocalStorage
}

export {
    AuthReducer,
    AuthActions,
}
