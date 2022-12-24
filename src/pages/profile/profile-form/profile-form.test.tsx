/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProfileForm from './ProfileForm';

const mockNavigate = jest.fn();
const mockSetLocalStorage = jest.fn();
const mockRemoveLocalStorage = jest.fn();
const mockUserData = { firstName: 'User', lastName: 'First', email: 'user1@incorainc.com' }

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

jest.mock('services/local-storage.service', () => ({
  setToLocalStorage: () => mockSetLocalStorage,
  removeFromLocalStorage: () => mockRemoveLocalStorage,
  getFromLocalStorage: (key: string) => {
    if (key === 'weekends') {
      return false
    } else return 'false'
  },
  getUserData: () => mockUserData,
}));

const setup = () => render(<ProfileForm />)

describe('Profile form tests', () => {

  it('should render firstName and lastName input', () => {
    setup()

    const inputFirstName = screen.getByTestId('firstName')
    const inputLastName = screen.getByTestId('lastName')

    expect(inputFirstName).toBeInTheDocument()
    expect(inputLastName).toBeInTheDocument()
  })

  it('should render Checkbox', async () => {
    setup()
    const checkboxLabel = screen.getByLabelText('Show weekends on calendar')

    await act(async () => {
      fireEvent.click(checkboxLabel);
    });

    expect(checkboxLabel).toBeChecked()
  });

  it('should render button log out', async () => {
    setup()
    const button = screen.getByTestId('button-log-out')

    await act(async () => {
      fireEvent.click(button);
    });

    expect(button).toBeInTheDocument()
    expect(mockNavigate).toBeCalled()
  });

  it('should render Toggle', async () => {
    setup()
    const toggle = screen.getByTestId('toggle')

    expect(toggle).toBeTruthy()
  });
})
