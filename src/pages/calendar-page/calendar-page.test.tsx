/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import * as hooks from 'hooks/toolkitHooks'
import CalendarPage from './CalendarPage';
import { act } from 'react-dom/test-utils';

const handleSubmit = jest.fn()
const handleRemoveEvent = jest.fn();
const mockDispatch = jest.fn()
let mockedSelector: any;

const errorMsg = 'Title should contain from 1 to 20 characters'
const mockStateWithErr = {
  booking: {
    errors: {},
    daysOfWeek: [],
  }
}
const mockState = {
  booking: {
    title: '',
    floor: '2',
    errors: {},
    daysOfWeek: [],
  }
}

const setup = () => render(
  <CalendarPage />)

describe('Booking tests with error', () => {
  beforeEach(() => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(mockDispatch)
    mockedSelector = jest.spyOn(hooks, 'useAppSelector')

    mockedSelector.mockReturnValue(mockStateWithErr.booking)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })




  // it('should show error', () => {
  //   setup()

  //   const error = screen.getByText(errorMsg)

  //   expect(error).toBeInTheDocument()
  // })

  it('should be selector room disabled', () => {
    setup()

    const selector = screen.getByTestId('selector-room')
    const selectorButton = within(selector).getByRole('button')

    expect(selectorButton).toHaveAttribute('aria-disabled', 'true');
  })
  it('should render Checkbox', async () => {
    setup()
    const checkboxLabel = screen.getByLabelText('Show all rooms')

    expect(checkboxLabel).toBeTruthy()
  });


  // it("when click on selector floor should popup listbox and call dispatch", () => {
  //   setup()

  //   const selectFloor = screen.getByTestId('selector-floor');
  //   const buttonFloor = within(selectFloor).getByRole('button');
  //   fireEvent.mouseDown(buttonFloor);
  //   const listfloors = within(screen.getByRole('presentation')).getByRole('listbox');
  //   fireEvent.click(screen.getByText(/2/));

  //   expect(mockDispatch).toBeCalledTimes(4)
  //   expect(listfloors).toBeInTheDocument();
  // });







  // it('click on selector rooms and select value call dispatch', () => {
  //   mockedSelector.mockReturnValue(mockState.booking)
  //   setup()

  //   const selectorRoom = screen.getByTestId('selector-room')
  //   const selectorButton = within(selectorRoom).getByRole('button')

  //   fireEvent.mouseDown(selectorButton);
  //   const listitems = within(screen.getByRole('listbox')).getAllByRole('option');
  //   fireEvent.click(listitems[1]);

  //   expect(mockDispatch).toBeCalled()
  // })






})