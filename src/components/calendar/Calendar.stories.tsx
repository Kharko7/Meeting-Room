import { ComponentMeta, ComponentStory } from "@storybook/react";
import Calendar from "./Calendar";

export default {
  title: 'Components/Calendar',
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

const Template: ComponentStory<typeof Calendar> = () => <Calendar />;

export const Default = Template.bind({})