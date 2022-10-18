import React from 'react';

import classNames from 'classnames/bind';
import styles from './SwitchToLogin.module.scss'

const cn = classNames.bind(styles)

const SwitchToLoginComponent = () => {
    return (
        <div className={cn("switchToLogin")}>
            <div className={cn("switch_container")}>
                <div className={cn("title_switch_to_login")}>
                    <span className={cn("title-word-1","title")}>Already </span>
                    <span className={cn("title-word-2","title")}>have </span>
                    <span className={cn("title-word-3","title")}>an </span>
                    <span className={cn("title-word-4","title")}>account? </span>
                </div>
                <div className={cn("switch_to_login_description")}>Please click to login</div>
            </div>
        </div>
    );
};

export default SwitchToLoginComponent;