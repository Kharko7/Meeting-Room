import * as React from 'react';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ConstructionIcon from '@mui/icons-material/Construction';

import classNames from 'classnames/bind';
import styles from './AdminModalTool.module.scss'
import CloseBtn from "../../close-btn/CloseBtn";
import {NavLink} from "react-router-dom";

const cn = classNames.bind(styles)

export interface AdminModalTool{
    onclick: () => void;
}

export default function AdminModalTool({onclick}:AdminModalTool) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div data-testid={'admin'} className={cn("container")}>
            <div className={cn("close-btn")}>
                <CloseBtn onclick={onclick}/>
            </div>
            <List
            sx={{width: '100%', bgcolor: 'background.paper'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={cn('admin-box')}
            subheader={
                <div className={cn('header')} id="nested-list-subheader" data-testid={'subheader'}>
                    <ConstructionIcon/>
                    <div>Admin tools</div>
                </div>
            }
        >
            <div onClick={handleClick} className={cn('part-of-list')}>
                <ListItemIcon>
                    <DraftsIcon/>
                </ListItemIcon>
                <ListItemText primary="Invite"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <NavLink to={'admin/getInvitation'}>
                    <div className={cn('link')}>
                        <ListItemIcon>
                            <SendIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Invite to source"/>
                    </div>
                    </NavLink>
                </List>
            </Collapse>
        </List></div>
    );
}