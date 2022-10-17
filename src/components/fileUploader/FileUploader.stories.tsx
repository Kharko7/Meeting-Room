import {FieldError, FieldErrorsImpl, Merge, useForm} from 'react-hook-form';
import {InputRe} from "../index";
import {ComponentStory} from "@storybook/react";
import BadgeRe from "../badge/BadgeRe";
import {FileUploaderComponent} from "./FileUploaderComponent";
import FaceIcon from "@mui/icons-material/Face";
import React from "react";
import {Badge} from "../badge/Badge.stories";


export default {
    title: "LV/FileUploader",
    component: FileUploaderComponent,
   argTypes:{
       size:{
           type: "string",
           defaultalue: "small",
           options: ["small", "medium", "large"],
           control: {
               type: "radio",
           },
       },
       name:{
           type:"string",
           defaultalue: "file",
           options: ["file"],
           control: {
               type:"radio"
           }
       }
   }

};


const Template: ComponentStory<typeof FileUploaderComponent> = (args) => {
    let {register} = useForm({mode: "all"});
    return <FileUploaderComponent {...args} register={register}/>
};


export  const FileUploader = Template.bind({});

FileUploader.args = {
    size: "small",
    icon:<FaceIcon/>,
    name:"file"
};


