import { takeLatest, all } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import recordSaga from "../recordSaga";
import ActionTypes from "src/utils/actionTypes";
import watchDashRequest, { get_statistics_request } from "../dash";
import * as api from "src/api/dash";

const error_message = "Error from API";

describe("Test watchDashRequest sagas", () => {
  it("should call 'all' with the correct functions", async () => {
    const genObject = watchDashRequest();
    const effects = genObject.next().value;
    expect(effects).toEqual(
      all([
        takeLatest(ActionTypes.GET_STATISTICS_REQUEST, get_statistics_request),
      ])
    );
  });

  //Test check_user_request saga
  describe("Test get_statistics_request saga", () => {
    it("should call api and dispatch success action", async () => {
      const result = {
        bookings: [],
        orders: {
          total: 0,
          lastOrders: [],
          percentOfIncrease: 0,
        },
        hotels: [],
        rooms: [],
        customers: [],
        totalAmount: 0,
        chartData: {},
      };
      const res = {
        data: {
          ok: true,
          result,
        },
      };

      const getStatsRequest = jest
        .spyOn(api, "getStatistics")
        .mockImplementation(() => Promise.resolve(res));
      const dispatched = await recordSaga(get_statistics_request, null);
      expect(getStatsRequest).toHaveBeenCalledTimes(1);
      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_SUCCESS,
        },
        { type: ActionTypes.SET_STATISTICS, payload: result },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      getStatsRequest.mockClear();
    });

    it("should get_statistics_request saga disptach failure from the server", async () => {
      const res = {
        data: {
          ok: false,
          result: {
            message: error_message,
          },
        },
      };

      const getStatsRequest = jest
        .spyOn(api, "getStatistics")
        .mockImplementation(() => Promise.resolve(res));
      const dispatched = await recordSaga(get_statistics_request, null);

      expect(getStatsRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: { message: error_message },
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      getStatsRequest.mockClear();
    });

    //Failure test: 500 status ...
    it("should get_statistics_request saga disptach failure", async () => {
      const getStatsRequest = jest
        .spyOn(api, "getStatistics")
        .mockImplementation(() => Promise.reject(new Error(error_message)));
      const dispatched = await recordSaga(get_statistics_request, null);

      expect(getStatsRequest).toHaveBeenCalledTimes(1);

      const expectedDispatched = [
        {
          type: ActionTypes.API_CALL_REQUEST,
        },
        {
          type: ActionTypes.API_CALL_FAILURE,
          payload: { message: error_message },
        },
      ];
      expect(dispatched).toEqual(expectedDispatched);
      getStatsRequest.mockClear();
    });
  });
});
