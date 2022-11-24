// const baseURL = 'https://coursep.herokuapp.com/';
const baseURL = 'https://cors-anywhere.herokuapp.com/https://coursep.herokuapp.com/';


const urls = {
    login: '/signin',
    register:'/signup',
    forgotPassword: 'auth/reset-password',
    getInvitation: 'admin/user',
    changePassword:
        'auth/change-password'
};

export {
    baseURL,
    urls
}

