import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Calendar from './Calendar';
import { BookingEvent } from 'interfaces/booking/Booking';
import * as localStorage from 'services/local-storage.service';

const mockDateSelect = jest.fn()
const mockEventSelect = jest.fn()
const mockGetDate = jest.fn()
const mockUseRef = { current: null }
let mockedStorage: any;
const today = new Date()

const mockData: BookingEvent[] = [{
  title: 'event 1',
  start: today.toISOString(),
  end: new Date(today.setHours(today.getHours() + 2)).toISOString(),
  extendedProps: {
    bookingId: 1,
    roomId: 2,
    description: 'First commit',
    isRecurring: false,
    recurringId: null,
    invitations: [],
    daysOfWeek: null,
  },
},
]
const setup = () => render(
  <Calendar
    calendarRef={mockUseRef}
    data={mockData}
    weekends={true}
    loading={false}
    handleDateSelect={mockDateSelect}
    handleEventSelect={mockEventSelect}
    handleGetDate={mockGetDate}
  />
)

describe('Booking tests with error', () => {

  beforeEach(() => {
    mockedStorage = jest.spyOn(localStorage, 'getFromLocalStorage')

    mockedStorage.mockReturnValue('en')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render Ukrainian calendar', () => {
    mockedStorage.mockReturnValue('ua')
    setup()
    const buttonlabel = screen.getByText(/Сьогодні/i)

    expect(buttonlabel).toBeInTheDocument()
  });

  it('should render buttons language and onclick change language', () => {
    setup()

    const buttonUA = screen.getByText('UA')
    const buttonEN = screen.getByText('EN')

    fireEvent.click(buttonUA);

    const buttonlabel = screen.getByText('Сьогодні')

    expect(mockGetDate).toBeCalled()
    expect(buttonEN).toBeInTheDocument()
    expect(buttonlabel).toBeInTheDocument()
  });

  it('should render event in calendar', () => {
    setup()

    const event = screen.getByText('event 1')
    fireEvent.click(event);

    expect(mockEventSelect).toBeCalled()
    expect(event).toBeInTheDocument()
  });

  it('should render loading', () => {
    render(
      <Calendar
        calendarRef={mockUseRef}
        data={mockData}
        weekends={true}
        loading={true}
        handleDateSelect={mockDateSelect}
        handleEventSelect={mockEventSelect}
        handleGetDate={mockGetDate}
      />
    )
    const loading = screen.getByRole('progressbar')

    expect(loading).toBeInTheDocument()
  });
})