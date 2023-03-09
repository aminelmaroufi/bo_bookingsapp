import { takeLatest, all } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import nock from "nock";
import { push } from "@lagunovsky/redux-react-router";
import recordSaga from "../recordSaga";
import watchAuthRequest, {
  check_user_request,
  login_request,
  logout_request,
  forgot_password_request,
  reset_password_request,
} from "../auth";
import ActionTypes from "src/utils/actionTypes";
import * as api from "src/api/auth";
import { IAdmin } from "src/models";

const error_message = "Error from API";
const success_message = "SUCCESS_OPERATION";

describe("Test watchAuthRequest sagas", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should call 'all' with the correct functions", async () => {
    const genObject = watchAuthRequest();
    const effects = genObject.next().value;
    expect(effects).toEqual(
      all([
        takeLatest(ActionTypes.CHECK_USER_REQUEST, check_user_request),
        takeLatest(ActionTypes.LOGIN_REQUEST, login_request),
        takeLatest(ActionTypes.LOGOUT, logout_request),
        takeLatest(
          ActionTypes.FORGOT_PASSWORD_REQUEST,
          forgot_password_request
        ),
        takeLatest(ActionTypes.RESET_PASSWORD_REQUEST, reset_password_request),
      ])
    );
  });

  //Test check_user_request saga
  describe("Test check_user_request saga", () => {
    it("should call api and dispatch success action", async () => {
      const currUser: IAdmin = {
        _id: "1",
        firstname: "test",
        lastname: "test",
        fullname: "test test",
        email: "test@test.com",
        roles: ["admin"],
        created_at: "",
        updated_at: "",
      };
      const res: AxiosResponse<any> = {
        data: {
          ok: true,
          result: {
            user: currUser,
          },
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: undefined,
      };

      const checkUserRequest = jest
        .spyOn(api, "checkUser")
        .mockImplementation(() => Promise.resolve(res));

      const dispatched = await recordSaga(check_user_request, null);
      expect(checkUserRequest).toHaveBeenCalledTimes(1);
      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_SUCCESS,
        },
        { type: ActionTypes.CHECK_USER_SUCCESS, payload: { user: currUser } },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      checkUserRequest.mockClear();
    });

    it("should check_user_request saga disptach failure from the server", async () => {
      const res: AxiosResponse<any> = {
        data: {
          ok: false,
          result: {
            message: error_message,
            user: null,
          },
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: undefined,
      };
      const checkUserRequest = jest
        .spyOn(api, "checkUser")
        .mockImplementation(() => Promise.resolve(res));

      const dispatched = await recordSaga(check_user_request, null);
      expect(checkUserRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: { message: error_message },
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      checkUserRequest.mockClear();
    });

    it("should check_user_request saga disptach failure", async () => {
      const checkUserRequest = jest
        .spyOn(api, "checkUser")
        .mockImplementation(() => Promise.reject(new Error(error_message)));

      const dispatched = await recordSaga(check_user_request, null);
      expect(checkUserRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: { message: error_message },
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      checkUserRequest.mockClear();
    });
  });

  //Test login_request saga
  describe("Test login_request saga", () => {
    const action = {
      email: "test@test.com",
      password: "Azerty123@@",
    };
    it("should call api and dispatch success action", async () => {
      const currUser: IAdmin = {
        _id: "1",
        firstname: "test",
        lastname: "test",
        fullname: "test test",
        email: "test@test.com",
        roles: ["admin"],
        created_at: "",
        updated_at: "",
      };
      const res: AxiosResponse<any> = {
        data: {
          ok: true,
          result: {
            user: currUser,
          },
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: undefined,
      };
      const loginRequest = jest
        .spyOn(api, "login")
        .mockImplementation(() => Promise.resolve(res));

      const dispatched = await recordSaga(login_request, action);
      expect(loginRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_SUCCESS,
        },
        { type: ActionTypes.LOGIN_SUCCESS, payload: { user: currUser } },
        push("/"),
      ];
      expect(dispatched).toEqual(expectedDispatched);
      loginRequest.mockClear();
    });

    it("should login_request saga disptach failure from the server", async () => {
      const res: AxiosResponse<any> = {
        data: {
          ok: false,
          result: {
            message: error_message,
            user: null,
          },
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: undefined,
      };
      const loginRequest = jest
        .spyOn(api, "login")
        .mockImplementation(() => Promise.resolve(res));

      const dispatched = await recordSaga(login_request, action);
      expect(loginRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: { message: error_message },
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      loginRequest.mockClear();
    });

    it("should login_request saga disptach failure", async () => {
      const loginRequest = jest
        .spyOn(api, "login")
        .mockImplementation(() => Promise.reject(new Error(error_message)));

      const dispatched = await recordSaga(login_request, action);
      expect(loginRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: { message: error_message },
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      loginRequest.mockClear();
    });
  });

  // Test logout_request saga
  describe("Test logout_request saga", () => {
    it("should call api and dispatch success action", async () => {
      const res: AxiosResponse<any> = {
        data: {
          ok: true,
          result: {
            message: "",
          },
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: undefined,
      };
      const logutRequest = jest
        .spyOn(api, "logout")
        .mockImplementation(() => Promise.resolve(res));

      const dispatched = await recordSaga(logout_request, null);
      expect(logutRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_SUCCESS,
        },
        { type: ActionTypes.LOGOUT_SUCCESS },
        push("/login"),
      ];
      expect(dispatched).toEqual(expectedDispatched);
      logutRequest.mockClear();
    });

    it("should logout_request saga disptach failure from the server", async () => {
      const res: AxiosResponse<any> = {
        data: {
          ok: false,
          result: {
            message: error_message,
          },
        },
        status: 200,
        statusText: "",
        headers: undefined,
        config: undefined,
      };
      const logoutRequest = jest
        .spyOn(api, "logout")
        .mockImplementation(() => Promise.resolve(res));

      const dispatched = await recordSaga(logout_request, null);
      expect(logoutRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: { message: error_message },
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      logoutRequest.mockClear();
    });

    it("should logout_request saga disptach failure", async () => {
      const logoutRequest = jest
        .spyOn(api, "logout")
        .mockImplementation(() => Promise.reject(new Error(error_message)));

      const dispatched = await recordSaga(logout_request, null);
      expect(logoutRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: { message: error_message },
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      logoutRequest.mockClear();
    });
  });

  //Test forgot_password_request saga
  describe("Test forgot_password_request saga", () => {
    const action = {
      email: "test@test.com",
    };
    it("should call api and dispatch success action", async () => {
      const res: AxiosResponse<any> = {
        data: {
          ok: true,
          result: {
            message: success_message,
          },
        },
        status: 0,
        statusText: "",
        headers: undefined,
        config: undefined,
      };
      const forgotPwdRequest = jest
        .spyOn(api, "forgotPwd")
        .mockImplementation(() => Promise.resolve(res));

      const dispatched = await recordSaga(forgot_password_request, action);
      expect(forgotPwdRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.SUCCESS_OPERATION,
          payload: { message: success_message },
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      forgotPwdRequest.mockClear();
    });

    it("should forgot_password_request saga disptach failure from the server", async () => {
      const res: AxiosResponse<any> = {
        data: {
          ok: false,
          result: {
            message: error_message,
          },
        },
        status: 0,
        statusText: "",
        headers: undefined,
        config: undefined,
      };
      const forgotPwdRequest = jest
        .spyOn(api, "forgotPwd")
        .mockImplementation(() => Promise.resolve(res));

      const dispatched = await recordSaga(forgot_password_request, action);
      expect(forgotPwdRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: { message: error_message },
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      forgotPwdRequest.mockClear();
    });

    it("should forgot_password_request saga disptach failure", async () => {
      const forgotPwdRequest = jest
        .spyOn(api, "forgotPwd")
        .mockImplementation(() => Promise.reject(new Error(error_message)));

      const dispatched = await recordSaga(forgot_password_request, action);
      expect(forgotPwdRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: { message: error_message },
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      forgotPwdRequest.mockClear();
    });
  });

  //Test reset_password_request saga
  describe("Test reset_password_request saga", () => {
    const action = {
      token: "123",
      password: "Azerty123@@",
      verifyPassword: "Azerty123@@",
    };
    it("should call api and dispatch success action", async () => {
      const res: AxiosResponse<any> = {
        data: {
          ok: true,
          result: {
            message: success_message,
          },
        },
        status: 0,
        statusText: "",
        headers: undefined,
        config: undefined,
      };
      const resetPwdRequest = jest
        .spyOn(api, "resetPwd")
        .mockImplementation(() => Promise.resolve(res));

      const dispatched = await recordSaga(reset_password_request, action);
      expect(resetPwdRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.SUCCESS_OPERATION,
          payload: { message: success_message },
        },
        {
          type: ActionTypes.RESET_PASSWORD_SUCCESS,
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      resetPwdRequest.mockClear();
    });

    it("should reset_password_request saga disptach failure from the server", async () => {
      const res: AxiosResponse<any> = {
        data: {
          ok: false,
          result: {
            message: error_message,
          },
        },
        status: 0,
        statusText: "",
        headers: undefined,
        config: undefined,
      };
      const resettPwdRequest = jest
        .spyOn(api, "resetPwd")
        .mockImplementation(() => Promise.resolve(res));

      const dispatched = await recordSaga(reset_password_request, action);
      expect(resettPwdRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: { message: error_message },
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      resettPwdRequest.mockClear();
    });

    it("should reset_password_request saga disptach failure", async () => {
      const resettPwdRequest = jest
        .spyOn(api, "resetPwd")
        .mockImplementation(() => Promise.reject(new Error(error_message)));

      const dispatched = await recordSaga(reset_password_request, action);
      expect(resettPwdRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: { message: error_message },
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      resettPwdRequest.mockClear();
    });
  });
});
