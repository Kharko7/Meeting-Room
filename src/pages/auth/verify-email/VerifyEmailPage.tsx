import React from 'react';
import {GetInvitationComponent} from "../../../components";

import classNames from 'classnames/bind';
import styles from './VerifyEmail.module.scss'
const cn = classNames.bind(styles)



const VerifyEmailPage = () => {
    return <div className={cn("container_verifyEmail_page")}><GetInvitationComponent/></div>;
};

export default VerifyEmailPage;