import ActionTypes from "src/utils/actionTypes";
import { dashActions, DashState } from "src/types";
import dash from "../dash";

const defaultState: DashState = {
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

const noAction: dashActions = {
  type: "",
  payload: null,
};

describe("Test Dashboard reducer", () => {
  it("should return the initial state when state is undefined", () => {
    expect(dash(undefined, noAction)).toEqual(defaultState);
  });

  it("should handle the 'SET_STATISTICS' action", () => {
    const expectedState = defaultState;
    const getStatisticsSuccessPayload: dashActions = {
      type: ActionTypes.SET_STATISTICS,
      payload: defaultState,
    };

    expect(dash(undefined, getStatisticsSuccessPayload)).toEqual(expectedState);
  });

  it("should handle the 'LOGOUT_SUCCESS' action", () => {
    const logoutSuccessPayload: dashActions = {
      type: ActionTypes.LOGOUT_SUCCESS,
    };

    expect(dash(undefined, logoutSuccessPayload)).toEqual(defaultState);
  });
});
