import React from 'react';

import classNames from 'classnames/bind';
import styles from './ErrorContainer.module.scss'
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const cn = classNames.bind(styles)

interface ErrorProp{
    title:string
}


const ErrorComponent = ({title}:ErrorProp) => {

    return (
        <div className={cn("error_container")} data-testid={'error'}>
            <ErrorOutlineIcon/>
            <span>{title}</span>
        </div>
    );
};

export default ErrorComponent;