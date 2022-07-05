import { put, call, all, takeLatest } from "redux-saga/effects";
import ActionTypes from "../../utils/actionTypes";
import {
  getHotels,
  getSelectedHotel,
  createHotel,
  updateHotel,
  deleteHotel,
  exportHotels,
} from "../../api";
import { AxiosResponse } from "axios";

function* get_hotels_request(action) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(getHotels, action.params);
    const data = response.data;

    if (data.ok) {
      yield all([
        put({
          type: ActionTypes.API_CALL_SUCCESS,
        }),
        put({
          type: ActionTypes.GET_HOTELS_SUCCESS,
          payload: {
            hotels: data.result.hotels,
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

function* get_hotel_request(action: any) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(getSelectedHotel, action.id);
    const data = response.data;

    if (data.ok) {
      yield all([
        put({
          type: ActionTypes.API_CALL_SUCCESS,
        }),
        put({
          type: ActionTypes.SELECT_HOTEL,
          payload: {
            hotel: data.result.hotel,
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

function* create_hotel_request(action: any) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(createHotel, action.hotel);
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
          type: ActionTypes.CREATE_HOTEL_SUCCESS,
          payload: {
            hotel: data.result.hotel,
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

function* update_hotel_request(action: any) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(updateHotel, action.hotel);
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
          type: ActionTypes.UPDATE_HOTEL_SUCCESS,
          payload: {
            hotel: data.result.hotel,
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

function* delete_hotel_request(action: any) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(deleteHotel, action.hotelId);
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
          type: ActionTypes.DELETE_HOTEL_SUCCESS,
          payload: {
            hotelId: action.hotelId,
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

function* export_hotels_request(action: any) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(exportHotels, action.params);
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

export default function* watchHotelsRequest() {
  yield all([
    takeLatest(ActionTypes.GET_HOTELS_REQUEST, get_hotels_request),
    takeLatest(ActionTypes.SELECT_HOTEL_REQUEST, get_hotel_request),
    takeLatest(ActionTypes.CREATE_HOTEL_REQUEST, create_hotel_request),
    takeLatest(ActionTypes.UPDATE_HOTEL_REQUEST, update_hotel_request),
    takeLatest(ActionTypes.DELETE_HOTEL_REQUEST, delete_hotel_request),
    takeLatest(ActionTypes.EXPORT_HOTELS_REQUEST, export_hotels_request),
  ]);
}
