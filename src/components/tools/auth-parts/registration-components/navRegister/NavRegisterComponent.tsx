import React from 'react';
import GoogleIcon from "@mui/icons-material/Google";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";

import classNames from 'classnames/bind';
import styles from './NavRegister.module.scss'
const cn = classNames.bind(styles)

const NavRegisterComponent = () => {
    return (
        <div className={cn("icons_form")}>
                            <span className={cn("btn")}>
                                <GoogleIcon style={{color:"#4285F4"}}/>
                            </span>
            <span className={cn("btn")}>
                               <TelegramIcon style={{color:"#0088CC"}}/>
                            </span>
            <span className={cn("btn") }>
                                <FacebookIcon style={{color:"#3b5998"}}/>
                            </span>
        </div>
    );
};

export default NavRegisterComponent;