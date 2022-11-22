import React from 'react';
import {ForgotPasswordComponent} from "../../../components";

import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss'
import LoadingComponent from "../../../components/tools/simple/loading/LoadingComponent";
import ErrorToManyRequest from "../../../components/tools/simple/error-429/ErrorToManyRequest";
const cn = classNames.bind(styles)


const ForgotPasswordPage = () => {
    return (<div data-testid={'forgot'} className={cn("container_ForgotPassword_page")} >
        <LoadingComponent/>
        <ErrorToManyRequest/>
        <div className={cn('box_outset')}></div>
        <div className={cn('box_outset2')}></div>
        <ForgotPasswordComponent/>
        <div className={cn('box_inset')}></div>
        <div className={cn('box_circle')}></div>
    </div>);
};

export default ForgotPasswordPage;