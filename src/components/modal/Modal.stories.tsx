import React from "react";
import Modal from "./Modal";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "UI/Modal",
  component: Modal,
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
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <div
    style={{
      width: "100%",
      height: "400px",
      backgroundColor: "#f4f6fa",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Modal {...args}></Modal>
  </div>
);

export const Default = Template.bind({});

Default.args = {
};
