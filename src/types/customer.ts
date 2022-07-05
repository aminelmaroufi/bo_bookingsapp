import actionTypes from "../utils/actionTypes";
import { IUser } from "../models";

export interface customerState {
  customers: Array<IUser>;
  customer: IUser;
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export interface getCustomersSuccess {
  customers: Array<IUser>;
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export interface getCustomerBookingsSuccess {
  customer: IUser;
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export type getCustomersSuccessPayload = {
  type: actionTypes.GET_CUSTOMERS_SUCCESS;
  payload: getCustomersSuccess;
};

export type getCustomerBookingsSuccessPayload = {
  type: actionTypes.SET_CUSTOMER_BOOKINGS;
  payload: getCustomerBookingsSuccess;
};

export type customerActions =
  | getCustomersSuccessPayload
  | getCustomerBookingsSuccessPayload;
