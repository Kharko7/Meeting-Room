import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {AuthReducer} from "../slices/auth.slice";


const comb = combineReducers({
    auth:AuthReducer
});

const setupStore = () => configureStore({
    reducer:comb,
    middleware:getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

type RootState = ReturnType<typeof comb>
type setup = ReturnType<typeof setupStore>
type AppDispatch = setup['dispatch']

export type {
    RootState,
    setup,
    AppDispatch
}

export {
    setupStore
}