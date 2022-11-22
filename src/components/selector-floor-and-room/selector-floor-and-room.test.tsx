import { render, screen, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import * as hooks from 'hooks/toolkitHooks'
import SelectorFloorAndRoom from './SelectorFloorAndRoom';

const handleChangeFloor = jest.fn()
const handleChangeRoom = jest.fn();
const mockDispatch = jest.fn()

const mockRooms = {
  rooms: {
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

const setup = () => render(
  <SelectorFloorAndRoom
    valueFloor={'2'}
    valueRoom={''}
    onChangeFloor={handleChangeFloor}
    onChangeRoom={handleChangeRoom}
  />)

describe('Selector floor and room tests', () => {
  beforeEach(() => {
    jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(mockDispatch)
    jest.spyOn(hooks, 'useAppSelector').mockReturnValue(mockRooms.rooms)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })


  it('should be selector room disabled', () => {
    render(
      <SelectorFloorAndRoom
        valueFloor={''}
        valueRoom={''}
        onChangeFloor={handleChangeFloor}
        onChangeRoom={handleChangeRoom}
      />)

    const selector = screen.getByTestId('selector-room')
    const selectorButton = within(selector).getByRole('button')

    expect(selector).toBeInTheDocument();
    expect(selectorButton).toHaveAttribute('aria-disabled', 'true');
  })

  it("when click on selector floor should popup listbox and call onChange", () => {
    setup()

    const selectFloor = screen.getByTestId('selector-floor');
    const buttonFloor = within(selectFloor).getByRole('button');
    fireEvent.mouseDown(buttonFloor);
    const listfloors = within(screen.getByRole('presentation')).getByRole('listbox');
    fireEvent.click(screen.getByText('3'));

    expect(handleChangeFloor).toBeCalled()
    expect(listfloors).toBeInTheDocument();
  });

  it('click on selector rooms choose select value and call onChange', () => {
    setup()

    const selectorRoom = screen.getByTestId('selector-room')
    const selectorButton = within(selectorRoom).getByRole('button')

    fireEvent.mouseDown(selectorButton);
    const listitems = within(screen.getByRole('listbox')).getAllByRole('option');
    fireEvent.click(listitems[1]);
    expect(handleChangeRoom).toBeCalled()
  })
})