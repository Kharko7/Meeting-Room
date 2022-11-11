import React from 'react';
import {LoginComponent} from "../../../components";

import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss'

const cn = classNames.bind(styles)

const LoginPage = () => {
    return (
        <div className={cn("container_login_page")}>
            <div className={cn('box_inset')}></div>
            <div className={cn('box_outset')}></div>
            <LoginComponent/>
            <div className={cn('box_inset_2')}></div>
            <div className={cn('box_outset_2')}></div>
        </div>);
};

export default LoginPage;