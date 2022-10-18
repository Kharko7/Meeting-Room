import {FieldError, FieldErrorsImpl, Merge, useForm} from 'react-hook-form';
import {InputRe} from "../index";
import BadgeRe from "./BadgeRe";
import {ComponentStory} from "@storybook/react";


export default {
    title: "LV/Badge",
    component: BadgeRe ,
    argTypes: {
        variant: {
            matchers: {
                badgeColor: /(background|color)$/i
            },
        },
        innerContent: { control: 'text'||'number' },
        component: { control: 'text' },
    },

};

const Template: ComponentStory<typeof BadgeRe> = (args) => {
    return <BadgeRe {...args}></BadgeRe>
};

export const Badge = Template.bind({});
Badge.args = {
    badgeColor: "blue",
    innerContent:'',
    component:"",
};






