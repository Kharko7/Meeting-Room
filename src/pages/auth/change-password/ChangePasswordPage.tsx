import React from 'react';
import {ChangePasswordComponent} from "../../../components";

import classNames from 'classnames/bind';
import styles from './ChangePasswordPage.module.scss'
const cn = classNames.bind(styles)


const ChangePasswordPage = () => {
    return (<div data-testid={'page'} className={cn("container_changePassword_page")}><ChangePasswordComponent/></div>);
};

export default ChangePasswordPage;