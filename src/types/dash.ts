import actionTypes from "src/utils/actionTypes";
import { IBooking } from "src/models";

export type hotels = {
  total: number;
  percentOfIncrease: number;
};

export type rooms = {
  total: number;
  percentOfIncrease: number;
};
export type customers = {
  total: number;
  percentOfIncrease: number;
};
export type orders = {
  total: number;
  lastOrders: Array<IBooking>;
  percentOfIncrease: number;
};

export type totalAmount = {
  totalAmountOfMonth: number;
  percentOfIncrease: number;
};

export interface DashState {
  bookings: Array<IBooking>;
  hotels: hotels;
  rooms: rooms;
  customers: customers;
  orders: orders;
  totalAmount: totalAmount;
  chartData: Array<Object>;
}

export interface getStatisticsSuccess {
  bookings: Array<IBooking>;
  hotels: hotels;
  rooms: rooms;
  customers: customers;
  orders: orders;
  totalAmount: totalAmount;
  chartData: Array<Object>;
}

export type getStatisticsSuccessPayload = {
  type: actionTypes.SET_STATISTICS;
  payload: getStatisticsSuccess;
};

export type logoutSuccessPayload = {
  type: actionTypes.LOGOUT_SUCCESS;
};

export type notActionPayload = {
  type: "";
  payload: null;
};

export type dashActions =
  | notActionPayload
  | logoutSuccessPayload
  | getStatisticsSuccessPayload;
