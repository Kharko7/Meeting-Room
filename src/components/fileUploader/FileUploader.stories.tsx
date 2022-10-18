import {useForm} from 'react-hook-form';
import {ComponentStory} from "@storybook/react";
import {FileUploaderComponent} from "./FileUploaderComponent";
import FaceIcon from "@mui/icons-material/Face";
import React from "react";


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
       },
       showFileName:{
           type:"boolean",
       },
       required:{
           control:"toggle"
       },
       register:{
           control:"select"
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
    name:"file",
    showFileName:false,
};


