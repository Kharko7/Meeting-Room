import React from "react";
import Toggle from "./Toggle";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Components/Toggle",
  component: Toggle,

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
