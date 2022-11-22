import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import DateAndTimePicker from './DateAndTimePicker';

const onChange = jest.fn()

const errorMsg = 'error message'
const label = 'date picker'

const setup = () => render(
  <DateAndTimePicker
    date=''
    minDate={'09/11/2022 09:00 AM'}
    errorMsg={errorMsg}
    onChange={onChange}
    label={label}
  />)

describe('Date and Time picker', () => {

  it('should render date picker', () => {
    setup()

    const datePicker = screen.getByLabelText(label)

    expect(datePicker).toBeInTheDocument()
  });
  it('should change date', () => {
    setup()

    const datePicker = screen.getByLabelText(label)
    fireEvent.change(datePicker, { target: { value: '09/11/2022 10:00 AM' } })
    expect(onChange).toBeCalledTimes(1)
  });

  it('should render error', () => {
    setup()

    const error = screen.getByText(errorMsg)
    expect(error).toBeInTheDocument()
  });
})