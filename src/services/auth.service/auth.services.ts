import {axiosService} from "../axios.service/axios.service";
import {urls} from "../../constants/urls/urls";
import {getFromLocalStorage, removeFromLocalStorage, setToLocalStorage} from "../local-storage.service";

const _access = 'access';
const _refresh = 'refresh';


export const authService = {
    refresh:(refresh:string)=>axiosService.post(`${urls.login}/refresh`,{refresh}),

    setTokens:(access:string)=>{
        setToLocalStorage(_access,access)
    },

    deleteTokens:()=>{
        removeFromLocalStorage(_access);
    },

    getAccessToken:()=>getFromLocalStorage(_access),
    getRefreshToken:()=>getFromLocalStorage(_refresh)
};