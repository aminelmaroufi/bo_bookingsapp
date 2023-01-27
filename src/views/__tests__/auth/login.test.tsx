import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "src/redux/store";
import Login from "src/views/auth/Login";
import { loginRequest } from "src/redux/actions";

let store = configureStore();

const email = "test@test.com";
const password = "Azerty123@@";

const setup = () =>
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

describe("Test Login Component", () => {
  beforeEach(() => {
    store.dispatch = jest.fn();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render all form elements", () => {
    setup();

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password"
    );

    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    expect(screen.getByText("Forgt password ?")).toBeInTheDocument();
  });

  it("should update input fields and fire login event", () => {
    setup();

    const emailInput = screen.getByLabelText("Email");
    const pwdInput = screen.getByLabelText("Password");
    //First check the field are empty
    expect(emailInput).toHaveValue("");
    expect(pwdInput).toHaveValue("");
    expect(screen.getByRole("button", { name: "Sign in" })).toBeDisabled();

    //Fill the fields
    userEvent.type(emailInput, email);
    userEvent.type(pwdInput, password);

    //check if input now are fiiled correctly
    expect(emailInput).toHaveValue(email);
    expect(pwdInput).toHaveValue(password);

    //Check now that the login button is enabled
    expect(screen.getByRole("button", { name: "Sign in" })).toBeEnabled();

    //Check that the action creator is called correctly
    userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(loginRequest(email, password));
  });
});
