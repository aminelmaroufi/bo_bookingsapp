import { put, call, all, takeLatest } from "redux-saga/effects";
import { push } from "@lagunovsky/redux-react-router";
import ActionTypes from "../../utils/actionTypes";
import { checkUser, login, logout, forgotPwd, resetPwd } from "../../api";
import { AxiosResponse } from "axios";

function* check_user_request() {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(checkUser);

    if (!response) {
      yield put({
        type: ActionTypes.API_CALL_SUCCESS,
      });
      return;
    }
    const data = response.data;

    if (data.ok) {
      yield all([
        put({
          type: ActionTypes.API_CALL_SUCCESS,
        }),
        put({
          type: ActionTypes.CHECK_USER_SUCCESS,
          payload: {
            user: data.result.user,
          },
        }),
      ]);
    } else {
      yield put({
        type: ActionTypes.API_CALL_FAILURE,
        payload: {
          message: data.result.message,
        },
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.API_CALL_FAILURE,
      payload: {
        message: typeof err === "string" ? err : err.message,
      },
    });
  }
}

function* login_request(action: any) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(
      login,
      action.email,
      action.password
    );
    const data = response.data;

    if (data.ok) {
      yield all([
        put({
          type: ActionTypes.API_CALL_SUCCESS,
        }),
        put({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: {
            user: data.result.user,
          },
        }),
        put(push("/")),
      ]);
    } else {
      yield put({
        type: ActionTypes.API_CALL_FAILURE,
        payload: {
          message: data.result.message,
        },
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.API_CALL_FAILURE,
      payload: {
        message: typeof err === "string" ? err : err.message,
      },
    });
  }
}

function* logout_request() {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(logout);
    const data = response.data;

    if (data.ok) {
      yield all([
        put({
          type: ActionTypes.API_CALL_SUCCESS,
        }),
        put({
          type: ActionTypes.LOGOUT_SUCCESS,
          payload: {
            message: data.result.message,
          },
        }),
        put(push("/login")),
      ]);
    } else {
      yield put({
        type: ActionTypes.API_CALL_FAILURE,
        payload: {
          message: data.result.message,
        },
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.API_CALL_FAILURE,
      payload: {
        message: typeof err === "string" ? err : err.message,
      },
    });
  }
}

function* forgot_password_request(action) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(forgotPwd, action.email);
    const data = response.data;

    if (data.ok) {
      yield all([
        put({
          type: ActionTypes.SUCCESS_OPERATION,
          payload: {
            message: data.result.message,
          },
        }),
      ]);
    } else {
      yield put({
        type: ActionTypes.API_CALL_FAILURE,
        payload: {
          message: data.result.message,
        },
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.API_CALL_FAILURE,
      payload: {
        message: typeof err === "string" ? err : err.message,
      },
    });
  }
}

function* reset_password_request(action) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(
      resetPwd,
      action.token,
      action.password,
      action.verifyPassword
    );
    const data = response.data;

    if (data.ok) {
      yield all([
        put({
          type: ActionTypes.SUCCESS_OPERATION,
          payload: {
            message: data.result.message,
          },
        }),
        put({
          type: ActionTypes.RESET_PASSWORD_SUCCESS,
        }),
      ]);
    } else {
      yield put({
        type: ActionTypes.API_CALL_FAILURE,
        payload: {
          message: data.result.message,
        },
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.API_CALL_FAILURE,
      payload: {
        message: typeof err === "string" ? err : err.message,
      },
    });
  }
}

export default function* watchAuthRequest() {
  yield all([
    takeLatest(ActionTypes.LOGIN_REQUEST, login_request),
    takeLatest(ActionTypes.CHECK_USER_REQUEST, check_user_request),
    takeLatest(ActionTypes.LOGOUT, logout_request),
    takeLatest(ActionTypes.FORGOT_PASSWORD_REQUEST, forgot_password_request),
    takeLatest(ActionTypes.RESET_PASSWORD_REQUEST, reset_password_request),
  ]);
}
