import React from 'react';
import {ForgotPasswordComponent} from "../../../components";

import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss'
const cn = classNames.bind(styles)


const ForgotPasswordPage = () => {
    return (<div className={cn("container_ForgotPassword_page")} ><ForgotPasswordComponent/></div>);
};

export default ForgotPasswordPage;