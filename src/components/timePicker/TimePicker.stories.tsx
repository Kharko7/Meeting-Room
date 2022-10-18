import React from "react";
import TimePickerComponent from "./Timepicker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import "../../app.scss";
export default {
  title: "UI/TimePicker",
  component: TimePickerComponent,
} as ComponentMeta<typeof TimePickerComponent>;

const Template: ComponentStory<typeof TimePickerComponent> = (args) => (
  <div
    style={{
      width: "80%",
      height: "70vh",
      backgroundColor: "#f4f6fa",
      display: "flex",
      justifyContent: "center",
      padding: "30px",
    }}
  >
    <TimePickerComponent></TimePickerComponent>
  </div>
);

export const Default = Template.bind({});

Default.args = {};
