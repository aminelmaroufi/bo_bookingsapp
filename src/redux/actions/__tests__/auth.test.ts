import actionTypes from "src/utils/actionTypes";
import {
  checkUser,
  loginRequest,
  forgtPasswordRequest,
  resetPasswordRequest,
} from "../auth";

describe("Test auth actions", () => {
  it("should dispatch checkUser action", () => {
    const expectedAction = {
      type: actionTypes.CHECK_USER_REQUEST,
    };
    expect(checkUser()).toEqual(expectedAction);
  });

  it("should dispatch loginRequest action with the correct params", () => {
    const email = "test@test.com",
      password = "Azerty!@#@@";
    const expectedAction = {
      type: actionTypes.LOGIN_REQUEST,
      email,
      password,
    };
    expect(loginRequest(email, password)).toEqual(expectedAction);
  });

  it("should dispatch forgtPasswordRequest action with the correct params", () => {
    const email = "test@test.com";
    const expectedAction = {
      type: actionTypes.FORGOT_PASSWORD_REQUEST,
      email,
    };
    expect(forgtPasswordRequest(email)).toEqual(expectedAction);
  });

  it("should dispatch resetPasswordRequest action with the correct params", () => {
    const token = "123",
      password = "Azerty123@@",
      verifyPassword = "Azerty123@@";
    const expectedAction = {
      type: actionTypes.RESET_PASSWORD_REQUEST,
      token,
      password,
      verifyPassword,
    };
    expect(resetPasswordRequest(token, password, verifyPassword)).toEqual(
      expectedAction
    );
  });
});
