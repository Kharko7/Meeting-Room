import React from 'react';
import {ForgotPasswordComponent} from "../../../components";

import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss'
const cn = classNames.bind(styles)


const ForgotPasswordPage = () => {
    return (<div className={cn("container_ForgotPassword_page")} >
        <div className={cn('box_outset')}></div>
        <div className={cn('box_outset2')}></div>
        <ForgotPasswordComponent/>
        <div className={cn('box_inset')}></div>
        <div className={cn('box_circle')}></div>
    </div>);
};

export default ForgotPasswordPage;