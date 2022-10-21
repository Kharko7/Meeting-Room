import { ComponentMeta, ComponentStory } from "@storybook/react";
import DateAndTimePicker from "./DateAndTimePicker";
import "../../styles/index.scss";

export default {
  title: "UI/DateAndTimePicker",
  component: DateAndTimePicker,
} as ComponentMeta<typeof DateAndTimePicker>;

const Template: ComponentStory<typeof DateAndTimePicker> = (args) => <DateAndTimePicker {...args} />;

export const Default = Template.bind({});

Default.args = {
  date: '2022-10-12T10:30:00+03:00',
  errorMsg: '',
  onChange: () => { },
  label: "Start"
};
