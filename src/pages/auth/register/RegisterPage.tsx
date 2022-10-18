import React from 'react';
import {RegisterComponent} from "../../../components";
import classNames from 'classnames/bind';
import styles from './RegisterPage.module.scss'
const cn = classNames.bind(styles)

const RegisterPage = () => {
    return <div className={cn("container_register_page")}><RegisterComponent/></div> ;
};

export default RegisterPage;