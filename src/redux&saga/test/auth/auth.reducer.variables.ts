import {AuthState} from "../../slices/auth.slice";
import {role} from "../../../interfaces/auth/AuthProps";

export const initialState: AuthState = {
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

export const state = {
    register: {
        firstName:"sss" ,
        lastName: "sds",
        password: 'dwwddwdw233D#',
        email:'ddss@incoeainc.com'
    },
    login: {
        email:'user4@incorainc.com',
        password: '1234',
    },
    user:{
        firstName: "Jake",
        lastName: "Hill",
        email:"jake@incorainc.com",
        password:'dcd23F#fefe1D',
        role:role.user,
        iat:2222,
        exp:233,
        id:112
    },

    forgotPasswordStr:'str',
    changePassword:{
        password:"12345ffF$",
        newPassword:'12345ffF$',
        email:'user4@incorainc.com'
    },
    invitations:[{
        email:'user3@incorainc.com'
    }],

    errorCode: 404,
    pending:true,
    success:true,
    rejected:true,

    strResponse:"str"
};