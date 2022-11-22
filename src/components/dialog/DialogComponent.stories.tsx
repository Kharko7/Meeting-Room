import React, {useState} from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {DialogComponent} from "./DialogComponent";
import AdminModalTool from "../admin/admin-modal-tools/AdminModalTool";
import {useModal} from "../../hooks/show.modal";

export default {
    title: "LV/CloseBtn",
    component: DialogComponent,
} as ComponentMeta<typeof DialogComponent>;

export const Template: ComponentStory<typeof DialogComponent> = () => {

    const {
        isShowing,
        toggle,
    } = useModal();

    return (
        <div>
            <DialogComponent isShowing={isShowing} children={<AdminModalTool onclick={toggle}/>}></DialogComponent>
        </div>
    );
};

