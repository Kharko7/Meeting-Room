
import axios from "axios";
import { getFromLocalStorage } from "services/local-storage.service";
import { baseURL } from "constants/request";
const axiosService = axios.create({ baseURL });

axiosService.interceptors.request.use((config: any) => {
    const token = getFromLocalStorage('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
});

export {
    axiosService
}