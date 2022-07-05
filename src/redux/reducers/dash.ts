import ActionTypes from "../../utils/actionTypes";
import { dashActions, DashState } from "../../types";

const initialState: DashState = {
  bookings: [],
  hotels: {
    total: 0,
    percentOfIncrease: 0,
  },
  rooms: {
    total: 0,
    percentOfIncrease: 0,
  },
  customers: {
    total: 0,
    percentOfIncrease: 0,
  },
  orders: {
    total: 0,
    percentOfIncrease: 0,
    lastOrders: [],
  },
  totalAmount: {
    totalAmountOfMonth: 0,
    percentOfIncrease: 0,
  },
  chartData: [],
};
export default function reducer(state = initialState, action: dashActions) {
  switch (action.type) {
    case ActionTypes.SET_STATISTICS:
      return {
        ...state,
        bookings: action.payload.bookings,
        hotels: action.payload.hotels,
        rooms: action.payload.rooms,
        customers: action.payload.customers,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
        chartData: action.payload.chartData,
      };

    default:
      return state;
  }
}
