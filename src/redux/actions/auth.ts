import actionTypes from "../../utils/actionTypes";

export const checkUser = () => ({
  type: actionTypes.CHECK_USER_REQUEST,
});

export const loginRequest = (email: string, password: string) => ({
  type: actionTypes.LOGIN_REQUEST,
  email,
  password,
});

export const logoutRequest = () => ({
  type: actionTypes.LOGOUT,
});

export const forgtPasswordRequest = (email: string) => ({
  type: actionTypes.FORGOT_PASSWORD_REQUEST,
  email,
});

export const resetPasswordRequest = (
  token: string,
  password: string,
  verifyPassword: string
) => ({
  type: actionTypes.RESET_PASSWORD_REQUEST,
  token,
  password,
  verifyPassword,
});
