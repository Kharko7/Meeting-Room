import React from "react";
import DatePickerComponent from "./Datepicker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import "../../app.scss";
export default {
  title: "UI/DatePicker",
  component: DatePickerComponent,
} as ComponentMeta<typeof DatePickerComponent>;

const Template: ComponentStory<typeof DatePickerComponent> = (args) => (
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
    <DatePickerComponent {...args}></DatePickerComponent>
  </div>
);

export const Default = Template.bind({});

Default.args = {
  date: undefined,
  errorMsg: '',
  onChange: () => { },
  label: "End"
};
