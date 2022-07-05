import { put, call, all, takeLatest } from "redux-saga/effects";
import ActionTypes from "../../utils/actionTypes";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  exportHotelRooms,
} from "../../api";
import { AxiosResponse } from "axios";

function* get_rooms_request() {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(getRooms);
    const data = response.data;

    if (data && data.ok) {
      yield all([
        put({
          type: ActionTypes.API_CALL_SUCCESS,
        }),
        put({
          type: ActionTypes.GET_ROOMS_SUCCESS,
          payload: {
            rooms: data.result.rooms,
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

function* create_room_request(action: any) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response = yield call(createRoom, action.idHotel, action.room);
    const data = response.data;

    if (data && data.ok) {
      yield all([
        put({
          type: ActionTypes.SUCCESS_OPERATION,
          payload: {
            message: data.result.message,
          },
        }),
        put({
          type: ActionTypes.ADD_ROOM_SUCCESS,
          payload: {
            room: data.result.room,
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

function* update_room_request(action: any) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response = yield call(updateRoom, action.idHotel, action.room);
    const data = response.data;

    if (data && data.ok) {
      yield all([
        put({
          type: ActionTypes.SUCCESS_OPERATION,
          payload: {
            message: data.result.message,
          },
        }),
        put({
          type: ActionTypes.UPDATE_ROOM_SUCCESS,
          payload: {
            room: data.result.room,
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

function* delete_room_request(action: any) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response = yield call(deleteRoom, action.idHotel, action.idRoom);
    const data = response.data;

    if (data && data.ok) {
      yield all([
        put({
          type: ActionTypes.SUCCESS_OPERATION,
          payload: {
            message: data.result.message,
          },
        }),
        put({
          type: ActionTypes.DELETE_ROOM_SUCCESS,
          payload: {
            idRoom: action.idRoom,
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

function* export_hotel_rooms_request(action: any) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(exportHotelRooms, action.hotel);
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

export default function* watchRoomsRequest() {
  yield all([
    takeLatest(ActionTypes.GET_ROOMS_REQUEST, get_rooms_request),
    takeLatest(ActionTypes.ADD_ROOM_REQUEST, create_room_request),
    takeLatest(ActionTypes.UPDATE_ROOM_REQUEST, update_room_request),
    takeLatest(ActionTypes.DELETE_ROOM_REQUEST, delete_room_request),
    takeLatest(
      ActionTypes.EXPORT_HOTEL_ROOMS_REQUEST,
      export_hotel_rooms_request
    ),
  ]);
}
