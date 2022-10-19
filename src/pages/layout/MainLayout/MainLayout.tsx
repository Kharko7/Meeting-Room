import React from 'react';
import {NavLink, Outlet} from "react-router-dom";

import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss'

const cn = classNames.bind(styles)


const MainLayout = () => {
    return (
        <div className={cn("box")}>
            <div className={cn("routes")}>
                <NavLink to={"/register"}>Register</NavLink>
                <NavLink to={"/login"}>Login</NavLink>
                <NavLink to={"/forgotPassword"}>Forgot Password</NavLink>
                <NavLink to={"/changePassword"}>Change Password</NavLink>
                <NavLink to={"/getInvitation"}>Get Invitation</NavLink>
                <NavLink to={"/calendar"}>Calendar</NavLink>
                <NavLink to={"/rooms"}>Rooms</NavLink>
            </div>

            <Outlet/>
        </div>
    );
};

export default MainLayout;