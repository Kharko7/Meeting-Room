import React, {useEffect} from 'react';
import {DialogComponent} from "../../../dialog/DialogComponent";
import {useModal} from "../../../../hooks/show.modal";
import CloseBtn from "../../../close-btn/CloseBtn";
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import MoodBadIcon from '@mui/icons-material/MoodBad';

import "animate.css";

import classNames from 'classnames/bind';
import styles from './ErrorToManyRequest.module.scss'
import {useAppSelector} from "../../../../hooks/toolkitHooks";
import { FaAngellist } from 'react-icons/fa';

const cn = classNames.bind(styles)


const ErrorToManyRequest = () => {

    let {errorCode} = useAppSelector(state => state.auth);
    let {isShowing,toggle} = useModal();

    useEffect(()=>{
        errorCode===429&&toggle()
    },[errorCode])

    return (isShowing?<DialogComponent isShowing={isShowing} children={
        <div className={cn('error-container',"animate__animated","animate__headShake")}>
            <CloseBtn onclick={toggle}></CloseBtn>
            <div className={cn('error-box')}>
                <div className={cn('error-title-container')}>
                        <span className={cn('code')}>429</span>
                        <div className={cn('error-title')}>Too many requests</div>
                </div>
            </div>
            <div className={cn('error-advise')}>
                <div className={cn('error-icon-box')}><GppMaybeOutlinedIcon/></div>
                <div className={cn('error-advise-title')}>Please wait some time and try again</div>
                <div className={cn('error-icon-box')}><GppMaybeOutlinedIcon/></div>
            </div>
        </div>
    }/>:null);
};

export default ErrorToManyRequest;