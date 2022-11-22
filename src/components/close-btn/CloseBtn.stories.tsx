import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import CloseBtn from "./CloseBtn";

export default {
    title: "LV/CloseBtn",
    component: CloseBtn,
} as ComponentMeta<typeof CloseBtn>;

const Template: ComponentStory<typeof CloseBtn> = (args) => (
<CloseBtn {...args}></CloseBtn>
);

export const Default = Template.bind({});

Default.args = {
    onclick: () => {},
};
