import * as React from 'react';
import Badge from '@mui/material/Badge';

import classNames from 'classnames/bind';
import styles from './Badge.module.scss'

const cn = classNames.bind(styles)


interface BadgeProps{
    innerContent?:string|number,
    badgeColor?:"red"|"blue"|"orange"|"mint"|"cerulean"|"turquoise"|"violet"|"lightBlue",
    component?:any,
    variant?:"dot"|"standard",
    vertical?:'top'|'bottom',
    horizontal?:"right"|"left"

}

export default function BadgeRe({badgeColor,innerContent,component,variant,vertical,horizontal}:BadgeProps) {
    return (
        <Badge badgeContent={(innerContent?innerContent:"")} className={cn(component&&`badge`,badgeColor?badgeColor:"blue")} max={99} variant={variant} anchorOrigin={{
            vertical: vertical?vertical:"top",
            horizontal: horizontal? horizontal:"right",
        }}>
            {component}
        </Badge>
    );
}