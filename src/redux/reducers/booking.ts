import ActionTypes from "../../utils/actionTypes";
import { BookingState, bookingActions } from "../../types";

const initialState: BookingState = {
  bookings: [],
  total: 0,
  pages: 1,
  page: 1,
  limit: 10,
};
export default function reducer(state = initialState, action: bookingActions) {
  switch (action.type) {
    case ActionTypes.GET_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: action.payload.bookings,
        total: action.payload.total,
        pages: action.payload.pages,
        page: action.payload.page,
        limit: action.payload.limit,
      };
    default:
      return state;
  }
}
