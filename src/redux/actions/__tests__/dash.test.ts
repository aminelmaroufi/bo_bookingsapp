import actionTypes from "src/utils/actionTypes";
import { getStatistics } from "../dash";

describe("Test dash actions", () => {
  it("should dispatch getStatistics action", () => {
    const expectedAction = {
      type: actionTypes.GET_STATISTICS_REQUEST,
    };
    expect(getStatistics()).toEqual(expectedAction);
  });
});
