import React from 'react';
import {LoginComponent} from "../../../components";

import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss'
const cn = classNames.bind(styles)

const LoginPage = () => {
    return (<div className={cn("container_login_page")} ><LoginComponent/></div>);
};

export default LoginPage;