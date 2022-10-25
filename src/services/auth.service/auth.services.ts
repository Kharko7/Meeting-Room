import {axiosService} from "../axios.service/axios.service";
import {urls} from "../../constants/urls/urls";

const _access = 'access';
const _refresh = 'refresh';


export const authService = {
    refresh:(refresh:string)=>axiosService.post(`${urls.login}/refresh`,{refresh}),

    setTokens:({access}:any)=>{
        localStorage.setItem(_access,access);
        // localStorage.setItem(_refresh,refresh);
    },

    deleteTokens:()=>{
        localStorage.removeItem(_access);
        localStorage.removeItem(_refresh);
    },

    getAccessToken:()=>localStorage.getItem(_access),
    getRefreshToken:()=>localStorage.getItem(_refresh)
};