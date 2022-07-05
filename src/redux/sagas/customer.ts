import { put, call, all, takeLatest } from "redux-saga/effects";
import ActionTypes from "../../utils/actionTypes";
import {
  getCustomers,
  exportCustomers,
  getCustomerBookings,
  exportCustomerBookings,
} from "../../api";
import { AxiosError, AxiosResponse } from "axios";

function* get_customers_request(action) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(getCustomers, action.params);
    const data = response.data;

    if (data && data.ok) {
      yield all([
        put({
          type: ActionTypes.API_CALL_SUCCESS,
        }),
        put({
          type: ActionTypes.GET_CUSTOMERS_SUCCESS,
          payload: {
            customers: data.result.customers,
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

function* export_customers_request() {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(exportCustomers);
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

function* get_customer_bookings_request(action) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(
      getCustomerBookings,
      action.customerID,
      action.params
    );
    const data = response.data;

    if (data && data.ok) {
      yield all([
        put({
          type: ActionTypes.API_CALL_SUCCESS,
        }),
        put({
          type: ActionTypes.SET_CUSTOMER_BOOKINGS,
          payload: {
            customer: data.result.customer,
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

function* export_customer_bookings_request(action) {
  try {
    yield put({ type: ActionTypes.API_CALL_REQUEST });
    let response: AxiosResponse = yield call(
      exportCustomerBookings,
      action.customer,
      action.params
    );
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

export default function* watchCustomersRequest() {
  yield all([
    takeLatest(ActionTypes.GET_CUSTOMERS_REQUEST, get_customers_request),
    takeLatest(ActionTypes.EXPORT_CUSTOMERS_REQUEST, export_customers_request),
    takeLatest(
      ActionTypes.GET_CUSTOMER_BOOKINGS_REQUEST,
      get_customer_bookings_request
    ),
    takeLatest(
      ActionTypes.EXPORT_CUSTOMER_BOOKINGS_REQUEST,
      export_customer_bookings_request
    ),
  ]);
}
