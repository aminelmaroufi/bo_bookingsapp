import ActionTypes from "../../utils/actionTypes";
import { customerState, customerActions } from "../../types";
import { emptyUser } from "src/models/user";

const initialState: customerState = {
  customers: [],
  customer: emptyUser,
  total: 0,
  pages: 1,
  page: 1,
  limit: 10,
};
export default function reducer(state = initialState, action: customerActions) {
  switch (action.type) {
    case ActionTypes.GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload.customers,
        total: action.payload.total,
        pages: action.payload.pages,
        page: action.payload.page,
        limit: action.payload.limit,
      };
    case ActionTypes.SET_CUSTOMER_BOOKINGS:
      return {
        ...state,
        customer: action.payload.customer,
        total: action.payload.total,
        pages: action.payload.pages,
        page: action.payload.page,
        limit: action.payload.limit,
      };
    default:
      return state;
  }
}
