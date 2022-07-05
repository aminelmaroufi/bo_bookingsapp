import { IUser } from "src/models";
import actionTypes from "../../utils/actionTypes";

export const getCustomers = (params: object) => ({
  type: actionTypes.GET_CUSTOMERS_REQUEST,
  params,
});

export const exportCustomer = () => ({
  type: actionTypes.EXPORT_CUSTOMERS_REQUEST,
});

export const getCustomerBookingsRequest = (
  customerID: string,
  params: object
) => ({
  type: actionTypes.GET_CUSTOMER_BOOKINGS_REQUEST,
  customerID,
  params,
});

export const exportCustomerBookingsRequest = (
  customer: IUser,
  params: object
) => ({
  type: actionTypes.EXPORT_CUSTOMER_BOOKINGS_REQUEST,
  customer,
  params,
});
