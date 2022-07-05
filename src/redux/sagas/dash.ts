import { put, call, all, takeLatest } from "redux-saga/effects";
import { push } from "@lagunovsky/redux-react-router";
import ActionTypes from "../../utils/actionTypes";
import { getStatistics } from "../../api";
import { AxiosResponse } from "axios";

function* get_statistics_request() {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(getStatistics);

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
          type: ActionTypes.SET_STATISTICS,
          payload: {
            bookings: data.result.orders.lastOrders,
            orders: data.result.orders,
            hotels: data.result.hotels,
            rooms: data.result.rooms,
            customers: data.result.customers,
            totalAmount: data.result.totalAmount,
            chartData: data.result.chartData,
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

export default function* watchDashRequest() {
  yield all([
    takeLatest(ActionTypes.GET_STATISTICS_REQUEST, get_statistics_request),
  ]);
}
