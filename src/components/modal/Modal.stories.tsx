import React from "react";
import Modal from "./Modal";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "UI/Modal",
  component: Modal,  
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (arg) => (

    <Modal {...arg}></Modal>

);

export const ModalComponent = Template.bind({});

