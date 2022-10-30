// const baseURL = 'https://coursep.herokuapp.com/';
const baseURL = 'https://cors-anywhere.herokuapp.com/https://coursep.herokuapp.com/';


const urls = {
    login: '/signIn',
    // register:'/signup',
    register:'/users',
    forgotPassword: '/forgotPassword',
    getInvitation: '/getInvitation',
    changePassword:'/changePassword'
};

export {
    baseURL,
    urls
}

