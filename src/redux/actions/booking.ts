import actionTypes from "../../utils/actionTypes";

export const getBookings = (params: object) => ({
  type: actionTypes.GET_BOOKINGS_REQUEST,
  params,
});

export const exportBookings = (params: object) => ({
  type: actionTypes.EXPORT_BOOKINGS_REQUEST,
  params,
});
