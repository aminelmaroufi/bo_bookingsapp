import { put, call, all, takeLatest } from "redux-saga/effects";
import ActionTypes from "../../utils/actionTypes";
import { getBookings, exportBookings } from "../../api";
import { AxiosResponse } from "axios";

function* get_bookings_request(action) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(getBookings, action.params);
    const data = response.data;

    if (data && data.ok) {
      yield all([
        put({
          type: ActionTypes.API_CALL_SUCCESS,
        }),
        put({
          type: ActionTypes.GET_BOOKINGS_SUCCESS,
          payload: {
            bookings: data.result.bookings,
            total: data.result.total,
            pages: data.result.pages,
            page: data.result.page,
            limit: data.result.limit,
          },
        }),
      ]);
    } else {
      yield put({
        type: ActionTypes.API_CALL_FAILURE,
        payload: {
          message: response.data.result.message,
        },
      });
    }
  } catch (err: any) {
    yield put({
      type: ActionTypes.API_CALL_FAILURE,
      payload: {
        message: typeof err === "string" ? err : err.result?.message,
      },
    });
  }
}

function* export_bookings_request(action: any) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(exportBookings, action.params);
    const data = response.data;

    if (data) {
      yield all([
        put({
          type: ActionTypes.API_CALL_SUCCESS,
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

export default function* watchBookingsRequest() {
  yield all([
    takeLatest(ActionTypes.GET_BOOKINGS_REQUEST, get_bookings_request),
    takeLatest(ActionTypes.EXPORT_BOOKINGS_REQUEST, export_bookings_request),
  ]);
}
