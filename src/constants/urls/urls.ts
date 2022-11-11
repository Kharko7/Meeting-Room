// const baseURL = 'https://coursep.herokuapp.com/';
const baseURL = 'https://cors-anywhere.herokuapp.com/https://coursep.herokuapp.com/';


const urls = {
    login: '/signin',
    // register:'/signup',
    register:'/users',
    forgotPassword: '/forgotPassword',
    getInvitation: 'admin/user',
    changePassword:'/changePassword'
};

export {
    baseURL,
    urls
}

