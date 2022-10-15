import React from "react";
import ActionButton from "./ActionButton";
interface btn {
  type: string;
  size: string;
  onclick:()=>{}
}
export default {
  title: "UI/ActionButton",
  component: ActionButton,
  argTypes: {
    type: {
      type: "string",
      defaultalue: "edit",
      options: ["edit", "delete", "settings", "home","close"],
      control: {
        type: "radio",
      },
    },
    size: {
      type: "string",
      defaultalue: "small",
      options: ["small", "medium", "large"],
      control: {
        type: "select",
      },
    },
  },
};


const Template = (arg: btn) => (
  <div style={{ width: "150px", height: "150px", backgroundColor: "#f4f6fa", display:'flex', justifyContent:'center', alignItems:'center'}}>
    <ActionButton {...arg}></ActionButton>
  </div>
);

export const Button = Template.bind({});
//@ts-ignore
Button.args = {
  type: "edit",
  size: "small",
  onclick:()=>{}
};