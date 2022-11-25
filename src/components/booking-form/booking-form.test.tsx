import { render, screen, fireEvent, within } from '@testing-library/react'
import BookingForm from './BookingForm';
import '@testing-library/jest-dom'
import * as hooks from 'hooks/toolkitHooks'

const handleSubmit = jest.fn()
const handleRemoveEvent = jest.fn();
const mockDispatch = jest.fn()
let mockedSelector: any;

const errorMsg = 'Title should contain from 1 to 20 characters'
const mockStateWithErr = {
  booking: {
    floor: '2',
    errors: { title: errorMsg },
    daysOfWeek: [],
    invitedId: [],
    rooms: [{
      floor: 2,
      name: 'big room',
      roomId: 4,
    },
    {
      floor: 2,
      name: 'main',
      roomId: 3,
    }],
    floors: [1, 2, 3],
  }
}
const mockState = {
  booking: {
    invitedId: [],
    title: '',
    floor: '',
    roomId: null,
    errors: {},
    daysOfWeek: [],
    rooms: [],
    floors: [1, 2, 3],
  },
}

const setup = () => render(
  <BookingForm
    edit={false}
    handleSubmit={handleSubmit}
    handleRemoveEvent={handleRemoveEvent}
  />)


describe('Booking form tests', () => {
  beforeEach(() => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(mockDispatch)
    mockedSelector = jest.spyOn(hooks, 'useAppSelector')

    mockedSelector
      .mockReturnValue(mockStateWithErr.booking)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render Title Booking', () => {
    setup()

    const inputLabel = screen.getByText(/Booking/i)

    expect(inputLabel).toBeInTheDocument()
  });

  it('should render title and description input', () => {
    setup()

    const inputTitle = screen.getByTestId('input-title')
    const inputDescription = screen.getByTestId('input-description')

    expect(inputTitle).toBeInTheDocument()
    expect(inputDescription).toBeInTheDocument()
  })

  it('should change title value', () => {
    setup()

    const inputTitle = screen.getByLabelText('Title') as HTMLInputElement
    fireEvent.change(inputTitle, { target: { value: 'my event' } })

    expect(mockDispatch).toBeCalled()
    expect(inputTitle.value).toBe('my event')
  })

  it('should call dispatch in description input', () => {
    setup()

    const inputDescription = screen.getByLabelText('Description') as HTMLInputElement
    fireEvent.change(inputDescription, { target: { value: 'description' } })

    expect(mockDispatch).toBeCalled()
  })

  it('should show error', () => {
    setup()

    const error = screen.getByText(errorMsg)

    expect(error).toBeInTheDocument()
  })

  it('should render selector floor', () => {
    setup()

    const selector = screen.getByTestId('selector-floor')

    expect(selector).toBeTruthy();
  })

  it("when click on selector room should popup listbox and call dispatch", () => {
    setup()

    const selectFloor = screen.getByTestId('selector-room');
    const buttonFloor = within(selectFloor).getByRole('button');
    fireEvent.mouseDown(buttonFloor);
    const listfloors = within(screen.getByRole('presentation')).getByRole('listbox');
    fireEvent.click(screen.getByText('big room'));

    expect(mockDispatch).toBeCalled()
    expect(listfloors).toBeInTheDocument();
  });

  it("check how mutch items is in selector multiple and call dispatch", () => {
    setup()

    const selectMultiple = screen.getByTestId('selector-multiple');
    const button = within(selectMultiple).getByRole('button');
    fireEvent.mouseDown(button);
    const listitems = within(screen.getByRole('listbox')).getAllByRole('option');

    fireEvent.click(listitems[2]);

    expect(mockDispatch).toBeCalled()
    expect(listitems).toHaveLength(7);
  });

  it("should render Start and End date picker and call dispatch", () => {
    setup()

    const dateStart = screen.getByLabelText('Start')
    const dateEnd = screen.getByLabelText('End')

    fireEvent.change(dateStart, { target: { value: '09/11/2022 12:00 AM' } })
    fireEvent.change(dateEnd, { target: { value: '09/11/2022 15:00 AM' } })

    expect(mockDispatch).toBeCalled()
    expect(dateStart).toBeTruthy();
    expect(dateEnd).toBeTruthy();
  });

  it("should not submit", () => {
    setup()

    const button = screen.getByTestId('button-submit');
    fireEvent.click(button)

    expect(handleSubmit).not.toBeCalled();
  });

  it("should not render delete button", () => {
    setup()

    const button = screen.queryByTestId('button-delete');

    expect(button).not.toBeInTheDocument();
  });

  it('should render Autocomplete invite coworkers', () => {
    setup()

    const selectorRoom = screen.getByTestId('invite-coworkers')

    expect(selectorRoom).toBeTruthy()
  })

  it("should submit event", () => {
    mockedSelector.mockReturnValue(mockState.booking)

    setup()
    const button = screen.getByTestId('button-submit');

    fireEvent.submit(button);

    expect(handleSubmit).toBeCalled()
  });

  it("should remove event", () => {
    mockedSelector.mockReturnValue(mockState.booking)

    render(
      <BookingForm
        edit={true}
        handleSubmit={handleSubmit}
        handleRemoveEvent={handleRemoveEvent}
      />)

    const button = screen.getByTestId('button-delete');
    fireEvent.click(button)

    const buttonConfirm = within(screen.getByRole('dialog')).getAllByRole('button');

    fireEvent.click(buttonConfirm[0])

    expect(handleRemoveEvent).toBeCalled()
    expect(button).toBeInTheDocument();
  });

  it('should be selector room disabled', () => {
    mockedSelector.mockReturnValue(mockState.booking)
    setup()

    const selector = screen.getByTestId('selector-room')
    const selectorButton = within(selector).getByRole('button')

    expect(selectorButton).toHaveAttribute('aria-disabled', 'true');
  })
})