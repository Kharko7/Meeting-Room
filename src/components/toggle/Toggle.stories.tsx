import React from "react";
import Toggle from "./Toggle";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "UI/Toggle",
  component: Toggle,
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
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => (
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
    <Toggle {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: "small"
};
