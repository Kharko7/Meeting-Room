import React from 'react';
import {RegisterComponent} from "../../../components";
import classNames from 'classnames/bind';
import styles from './RegisterPage.module.scss'
import LoadingComponent from "../../../components/tools/simple/loading/LoadingComponent";
import ErrorToManyRequest from "../../../components/tools/simple/error-429/ErrorToManyRequest";
const cn = classNames.bind(styles)

const RegisterPage = () => {
    return <div data-testid={'register'} className={cn("container_register_page")}>
        <LoadingComponent/>
        <ErrorToManyRequest/>
        <div className={cn('box_outset')}></div>
        <RegisterComponent/>
        <div className={cn('box_inset')}></div>
    </div> ;
};

export default RegisterPage;