import React from 'react';
import ReactDOM from 'react-dom';

import classNames from 'classnames/bind';
import styles from './DialogComponent.module.scss'
const cn = classNames.bind(styles)


interface ModalProps{
    isShowing:boolean;
    children:JSX.Element;
}

export const DialogComponent = ({ isShowing,children}:ModalProps) => {

return isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className={cn("modal-overlay")} data-testid={"dialog"} />
        <div className={cn("modal-wrapper")} aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className={cn("modal")}>
                {children}
            </div>
        </div>
    </React.Fragment>, document.body
) : null;}

