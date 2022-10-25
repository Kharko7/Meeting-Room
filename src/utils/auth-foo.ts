export const checkPasswordMatch = (passwordConfirm:string, password:string)=>{
    return password === passwordConfirm;
}

export const registerClear = (data:any)=>{
    let username = data.login.split(" ") ;
    data.firstName = username[0];
    data.lastName = username[1];
    delete data.passwordConfirm ;
    delete data.login;
    return data
}

export const validAvatarType = (data:any)=>{
    return data.type==="image/jpeg"||data.type==="image/png"||data.type==="image/gif"
}



