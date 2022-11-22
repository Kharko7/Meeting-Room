import React from 'react';

import classNames from 'classnames/bind';
import styles from './CloseBtn.module.scss'

const cn = classNames.bind(styles)

export interface CloseBtnProps{
    onclick: () => void;
}

const CloseBtn = ({onclick}:CloseBtnProps) => {
    return (
            <span className={cn(`close-button`)} onClick={onclick} data-testid={'button'}>
                <div className={cn("in")}>
                    <div className={cn("close-button-block")}></div>
                    <div className={cn("close-button-block")}></div>
                </div>
                <div className={cn("out")}>
                    <div className={cn("close-button-block")}></div>
                    <div className={cn("close-button-block")}></div>
                </div>
            </span>
    );
};

export default CloseBtn;