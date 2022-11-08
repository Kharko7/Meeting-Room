import React from 'react';
import {RegisterComponent} from "../../../components";
import classNames from 'classnames/bind';
import styles from './RegisterPage.module.scss'
const cn = classNames.bind(styles)

const RegisterPage = () => {
    return <div className={cn("container_register_page")}>
        <div className={cn('box_outset')}></div>
        <RegisterComponent/>
        <div className={cn('box_inset')}></div>
    </div> ;
};

export default RegisterPage;