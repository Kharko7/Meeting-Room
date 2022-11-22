import {useForm} from 'react-hook-form';
import {InputRe} from "../index";
import {ComponentStory} from "@storybook/react";


export default {
    title: "LV/Input",
    component: InputRe,
    argTypes: {
        type: {
            options: ['text', "" as "email", 'password',"login"],
            control: {
                type: 'select'
            }
        },
            size:{
                type: "string",
                defaultalue: "small",
                options: ["extra-small","small", "medium", "large"],
                control: {
                    type: "radio",
                },
            },
        error:{
            control:"select"
        },
        name:{
            control:"select"
        },
        isValid:{
            control:"toggle"
        },
        required:{
            control:"toggle"
        },
        register:{
            control:"select"
        }
        }
};


const Template: ComponentStory<typeof InputRe> = (args) => {
    let {register,formState:{errors}} = useForm({mode: "all"});
    return <InputRe {...args}  register={register}/>
};


export const Text = Template.bind({});
Text.args = {
    size:'small',
    type: 'text',
    placeHolder: 'Text goes here',
    placeholderDisappear:"",
    isValid:true,
    required:true,
    name: 'text',
};

export const Email = Template.bind({});
Email.args = {
    size:'small',
    type: '',
    placeholderDisappear:"xxxxx@incora.inc",
    placeHolder: 'email',
    isValid:true,
    required:true,
    name: 'email',
};

export const Password = Template.bind({});
Password.args = {
    size:'small',
    type: 'password',
    placeholderDisappear:"",
    placeHolder: 'password',
    isValid:true,
    required:true,
    name: 'password',
};

export const Login = Template.bind({});
Login.args = {
    size:'small',
    type: 'login',
    placeholderDisappear:"Jimmi Neutron",
    placeHolder: 'login',
    isValid:true,
    required:true,
    name: 'login',
};


