import CheckboxWithLabel from './CheckboxWithLabel'
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: 'UI/Checkbox',
  component: CheckboxWithLabel,
} as ComponentMeta<typeof CheckboxWithLabel>;


const Template: ComponentStory<typeof CheckboxWithLabel> = (args) => <CheckboxWithLabel {...args} />;

export const Default = Template.bind({})

Default.args = {
  checked: true,
  label: 'Hello world',
  onChange: () => { },
};