import React, {InputHTMLAttributes, ReactNode, useState} from 'react';
import {FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister} from "react-hook-form";
import FaceIcon from '@mui/icons-material/Face';

import classNames from 'classnames/bind';
import styles from './FileUpload.module.scss'
const cn = classNames.bind(styles)


interface FileUploaderProps{
    name: string;
    required: boolean,
    register: UseFormRegister<FieldValues>,
    icon?: JSX.Element,
    size:"small"|"medium"|"large",
    showFileName?:boolean;
}
export function FileUploaderComponent({register,name,required,icon,size,showFileName=false}:FileUploaderProps){
    const [filename,setName] = useState("");

    function handleChange(event:any) {
        setName(`Selected avatar - ${event.target.files[0]}`);
    }

    return(
        <div className={cn(`wrapper-${size?size:"small"}`)}>
            <div className={cn(`file-upload-${size}`)}>
                <input data-testid={'file'} type="file"{...register(`${name}`, {
                    required: required
                })}
                       onChange={handleChange}
                />
                <div className={cn("icon")}>
                    {icon}
                </div>
            </div>
            {showFileName&&
                <div data-testid={'select'} className={cn(`file_name-${size?size:"small"}`)}>
                    {filename?filename:"Select avatar"}
                </div>}
        </div>
    )
}


// acceptedFormats: files =>
//     ['image/jpeg', 'image/png', 'image/gif'].includes(
//         files[0]?.type
//     ) || 'Only PNG, JPEG e GIF',