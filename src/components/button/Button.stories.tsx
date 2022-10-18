import React from "react";
import Button from "./Button";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "UI/Button",
  component: Button,
  argTypes: {
    size: {
      type: "string",
      defaultalue: "small",
      options: ["small", "medium", "large"],
      control: {
        type: "radio",
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <div
    style={{
      width: "400px",
      height: "400px",
      backgroundColor: "#f4f6fa",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Button {...args}></Button>
  </div>
);

export const Default = Template.bind({});

Default.args = {
  children: "button",
  size: "small",
  onclick: () => {},
};
