import React, {InputHTMLAttributes, useState} from 'react';
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
    size:"small"|"medium"|"large"

}
export function FileUploaderComponent({register,name,required,icon,size}:FileUploaderProps){

    // const [filename,setName] = useState("");
    //
    // function handleChange(event:any) {
    //    setName(`Selected avatar - ${event.target.files[0].name}`);
    // }


    return(
            <div className={cn(`wrapper-${size}`)}>
                <div className={cn(`file-upload-${size}`)}>
                    <input type="file"{...register(`${name}`, {
                        required: required
                    })}
                           // onChange={handleChange}
                    />
                    <div className={cn("icon")}>
                        {icon}
                    </div>
                </div>
                {/*<div className={cn("avatar_name")}>*/}
                {/*    {filename?filename:"Select avatar"}*/}
                {/*</div>*/}
            </div>
    )
}