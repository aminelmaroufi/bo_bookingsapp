import { put, call, all, takeLatest } from "redux-saga/effects";
import ActionTypes from "src/utils/actionTypes";
import { getModerators, createModerator, deleteModerator } from "../../api";
import { AxiosResponse } from "axios";
import { fdatasync } from "fs";

function* get_moderators_request() {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(getModerators);
    const data = response.data;

    if (data.ok) {
      yield all([
        put({
          type: ActionTypes.API_CALL_SUCCESS,
        }),
        put({
          type: ActionTypes.SET_MODERATORS,
          payload: {
            moderators: data.result.administrators,
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

function* createt_moderator_request(action) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(createModerator, action.moderator);
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
          type: ActionTypes.CREATE_MODERATOR_SUCCESS,
          payload: {
            moderator: data.result.admin,
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

function* delete_moderator_request(action) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(
      deleteModerator,
      action.moderatorId
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
          type: ActionTypes.DELETE_MODERATOR_SUCCESS,
          payload: {
            moderatorId: action.moderatorId,
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

export default function* watchAdminRequest() {
  yield all([
    takeLatest(ActionTypes.GET_MODERATORS_REQUEST, get_moderators_request),
    takeLatest(ActionTypes.DELETE_MODERATOR_REQUEST, delete_moderator_request),
    takeLatest(ActionTypes.CREATE_MODERATOR_REQUEST, createt_moderator_request),
  ]);
}
