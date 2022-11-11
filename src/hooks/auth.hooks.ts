import {getFromLocalStorage} from "../services/local-storage.service";

export const useAuth = () => {
    return getFromLocalStorage('access')
}