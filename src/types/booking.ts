import actionTypes from "../utils/actionTypes";
import { IBooking } from "../models";

export interface BookingState {
  bookings: Array<IBooking>;
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export interface getBookingsSuccess {
  bookings: Array<IBooking>;
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export type getBookingsSuccessPayload = {
  type: actionTypes.GET_BOOKINGS_SUCCESS;
  payload: getBookingsSuccess;
};

export type bookingActions = getBookingsSuccessPayload;
