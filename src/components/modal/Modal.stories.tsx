import React, { useState } from "react";
import Modal from "./Modal";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "UI/Modal",
  component: Modal,
} as ComponentMeta<typeof Modal>;

export const Template: ComponentStory<typeof Modal> = () => {

  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div>
      <Modal closeModal={setOpenModal}></Modal>
    </div>
  );
};



