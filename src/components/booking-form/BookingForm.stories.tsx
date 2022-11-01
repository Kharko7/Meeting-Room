import { ComponentStory, ComponentMeta } from '@storybook/react';
import BookingFormAdd from './BookingForm';
import { Provider } from 'react-redux'
import { store } from 'redux&saga/store';

export default {
  title: 'UI/BookingFormAdd',
  component: BookingFormAdd,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div style={{ height: '500px', width: '400px', backgroundColor: '#f4f6fa', margin: '0 auto' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof BookingFormAdd>;

const Template: ComponentStory<typeof BookingFormAdd> = (args) => <BookingFormAdd {...args} />;

export const Default = Template.bind({});

Default.args = {
  handleSubmit: () => { }
};