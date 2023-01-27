import actionTypes from "../utils/actionTypes";
import { IUser } from "../models";

export interface AuthState {
  fetching: boolean;
  isLoggedIn: boolean | null;
  message: string;
  error: boolean;
  user: IUser;
  success: boolean;
  reset_pwd_success: boolean;
}

export interface FetchRequest {
  fetching: boolean;
  success: boolean;
  error: boolean;
  reset_pwd_success: boolean;
  message: string;
}

export interface FetchRequestSuccess {
  fetching: boolean;
  success: boolean;
}

export interface FetchRequestFailure {
  fetching: boolean;
  error: boolean;
  message: string;
}

export interface FetchRequestSuccessOperation {
  fetching: boolean;
  success: boolean;
  message: string;
}

export interface checkUserSuccess {
  user: IUser;
  isLoggedIn: boolean;
}

export interface loginSuccess {
  user: IUser;
  isLoggedIn: boolean;
}

export interface logoutSuccess {
  message: string;
}

export interface resetPwdSuccess {
  reset_pwd_success: boolean;
}

export type FetchRequestPayload = {
  type: typeof actionTypes.API_CALL_REQUEST;
  payload: FetchRequest;
};

export type FetchRequestSuccessPayload = {
  type: typeof actionTypes.API_CALL_SUCCESS;
  payload: FetchRequestSuccess;
};

export type FetchRequestFailurePayload = {
  type: typeof actionTypes.API_CALL_FAILURE;
  payload: FetchRequestFailure;
};

export type FetchRequestSuccessOperationPayload = {
  type: typeof actionTypes.SUCCESS_OPERATION;
  payload: FetchRequestSuccessOperation;
};

export type checkUserSuccessPayload = {
  type: actionTypes.CHECK_USER_SUCCESS;
  payload: checkUserSuccess;
};

export type loginSuccessPayload = {
  type: actionTypes.LOGIN_SUCCESS;
  payload: loginSuccess;
};

export type logoutSuccessPayload = {
  type: actionTypes.LOGOUT_SUCCESS;
};

export type resetPwdSuccessPayload = {
  type: actionTypes.RESET_PASSWORD_SUCCESS;
  payload: resetPwdSuccess;
};

export type notActionPayload = {
  type: "";
  payload: null;
};

export type authActions =
  | notActionPayload
  | FetchRequestPayload
  | FetchRequestSuccessPayload
  | FetchRequestFailurePayload
  | FetchRequestSuccessOperationPayload
  | loginSuccessPayload
  | checkUserSuccessPayload
  | logoutSuccessPayload
  | resetPwdSuccessPayload;
