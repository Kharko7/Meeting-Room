import { ComponentMeta, ComponentStory } from "@storybook/react";
import Calendar from "./Calendar";

export default {
  title: 'UI/Calendar',
  component: Calendar,
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => <Calendar {...args} />;

export const Default = Template.bind({})

Default.args = {
  handleDateSelect: () => { },
};