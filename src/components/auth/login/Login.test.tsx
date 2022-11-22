import {
  fireEvent,
  getByLabelText,
  render,
  screen,
} from "@testing-library/react";
import { LoginComponent } from "../../index";
import {BrowserRouter, useNavigate} from "react-router-dom";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import {useAppDispatch, useAppSelector} from "../../../hooks/toolkitHooks";

const mockDispatch = jest.fn();

const mockState = {
  auth: {
    user: {
      email: "",
      password: "",
    },
    errorCode: undefined,
    success:undefined
  },
};

jest.mock("hooks/toolkitHooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => mockState.auth,
}));

const setup = () => {
  return render(
    <BrowserRouter>
      <LoginComponent />
    </BrowserRouter>
  );
};

describe("Login tests", () => {
  it("should be defined", async () => {
    const render_ = setup();
    const { getByLabelText } = render_;
    const emailInput = fireEvent.input(getByLabelText("Email"), {
      target: {
        value: "user4@incorainc.com",
      },
    });
    const passwordInput = fireEvent.input(getByLabelText("Password"), {
      target: {
        value: "1234",
      },
    });

    await act(async () => {
       const loginButton = await screen.getByText("Login");
      await userEvent.click(loginButton);
    })

      await expect(emailInput).toBeDefined();
      await expect(passwordInput).toBeDefined();

  });

  it("should be on the document", async () => {
    const { getByLabelText } = setup();
    await expect(getByLabelText("Email")).toBeInTheDocument();
    await expect(getByLabelText("Password")).toBeInTheDocument();
  });

  it("should render the component with no errors", async () => {
    const return_ = setup();
    await expect(return_).toBeTruthy();
  });

  it("should have attribute", async () => {
    const { getByLabelText } = setup();

    await act(async () => {
      await expect(getByLabelText("Email")).toHaveAttribute("type", "");
    })
    await act(async () => {
      await expect(getByLabelText("Password")).toHaveAttribute(
        "type",
        "password"
      );
    })

  });

  it('dispatch must be called after click on button', async () => {
    const {getByLabelText, container} = setup();

    fireEvent.input(getByLabelText("Email"), {
      target: {
        value: "user4@incorainc.com"
      }
    });

    fireEvent.input(getByLabelText("Password"), {
      target: {
        value: "1234"
      }
    });

    const login = await screen.getByText('Login');

    await act(async () => {
      await userEvent.click(login);
    })

    await expect(useAppDispatch()).toBeCalled()
  });

  it('email must be required', async () => {
    const {getByLabelText} = setup();
    await expect(getByLabelText('Email')).toBeRequired()
  });

  it('password must be required', async () => {
    const {getByLabelText} = setup();
    await expect(getByLabelText('Password')).toBeRequired()
  });

  it('success must be undefined', async () => {
    const {success} = useAppSelector(state =>state.auth);
    await expect(success).toBe(undefined);
  });

  it('errorCode must be undefined', async () => {
    const {errorCode} = useAppSelector(state =>state.auth);
    await expect(errorCode).toBe(undefined);
  });

});
