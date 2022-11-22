import React from 'react';
import {useAppSelector} from "../../../../hooks/toolkitHooks";

import classNames from 'classnames/bind';
import styles from './Loading.module.scss'
const cn = classNames.bind(styles)

const LoadingComponent = () => {
    const {pending} = useAppSelector(state => state.auth);

    return (
        <>
            {
                pending &&
                <div className={cn('loading')} data-testid={'loading'}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
            </div>}

        </>
    );
};

export default LoadingComponent;