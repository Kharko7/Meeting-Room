import React from 'react';
import {LoginComponent} from "../../../components";

import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss'
import LoadingComponent from "../../../components/tools/simple/loading/LoadingComponent";
import ErrorToManyRequest from "../../../components/tools/simple/error-429/ErrorToManyRequest";

const cn = classNames.bind(styles)

const LoginPage = () => {

    return (
        <div data-testid={'login'} className={cn("container_login_page")}>
            <LoadingComponent/>
            <ErrorToManyRequest/>
            <div className={cn('box_inset')}></div>
            <div className={cn('box_outset')}></div>
            <LoginComponent/>
            <div className={cn('box_inset_2')}></div>
            <div className={cn('box_outset_2')}></div>
        </div>);
};

export default LoginPage;