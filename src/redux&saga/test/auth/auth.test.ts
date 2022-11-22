import {
    initialState,
    state
} from './auth.reducer.variables'
import bookingReducer from "redux&saga/slices/booking.slice";
import authReducer, {authActions} from 'redux&saga/slices/auth.slice';

describe('reducer login test', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, { type: undefined })).toEqual(initialState)
    })

    it('should set login to auth reducer', () => {
        expect(authReducer(initialState, authActions.login(state.login))).toEqual(
            { ...initialState, login: state.login }
        )
    })

    it('should set register to auth reducer', () => {
        expect(authReducer(initialState, authActions.register(state.register))).toEqual(
            { ...initialState, register: state.register }
        )
    })

    it('should set user to auth reducer', () => {
        expect(authReducer(initialState, authActions.setUser(state.user))).toEqual(
            { ...initialState, user: state.user }
        )
    })

    it('should set errorMsg to auth reducer', () => {
        expect(authReducer(initialState, authActions.errorMsg(state.errorCode))).toEqual(
            { ...initialState, errorCode: state.errorCode }
        )
    })

    it('should set success to auth reducer', () => {
        expect(authReducer(initialState, authActions.success(state.success))).toEqual(
            { ...initialState, success: state.success }
        )
    })

    it('should set pending to auth reducer', () => {
        expect(authReducer(initialState, authActions.pending(state.pending))).toEqual(
            { ...initialState, pending: state.pending }
        )
    })

    it('should set changePassword to auth reducer', () => {
        expect(authReducer(initialState, authActions.changePassword(state.changePassword))).toEqual(
            { ...initialState, changePassword: state.changePassword }
        )
    })

    it('should set invitations to auth reducer', () => {
        expect(authReducer(initialState, authActions.getInvitation(state.invitations))).toEqual(
            { ...initialState, invitations: state.invitations }
        )
    })

    it('should set forgotPasswordSendEmail to auth reducer', () => {
        expect(authReducer(initialState, authActions.forgotPasswordSendEmail(state.forgotPasswordStr))).toEqual(
            {
                ...initialState,forgotPasswordStr:state.forgotPasswordStr
            }
        )
    })

    it('should set setResponseForgotPassword to auth reducer', () => {
        expect(authReducer(initialState, authActions.setResponseForgotPassword(state.strResponse))).toEqual({
            ...initialState,strResponse:state.strResponse
        })
    })

})


