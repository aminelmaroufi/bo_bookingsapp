import ActionTypes from "../../utils/actionTypes";
import { adminActions, AdminState } from "../../types";

const initialState: AdminState = {
  moderators: [],
};
export default function reducer(state = initialState, action: adminActions) {
  switch (action.type) {
    case ActionTypes.SET_MODERATORS:
      return {
        ...state,
        moderators: action.payload.moderators,
      };
    case ActionTypes.CREATE_MODERATOR_SUCCESS:
      let moderators = state.moderators;
      moderators.unshift(action.payload.moderator);
      return {
        ...state,
        moderators,
      };
    case ActionTypes.DELETE_MODERATOR_SUCCESS:
      return {
        ...state,
        moderators: state.moderators.filter(
          (moderator) => moderator._id !== action.payload.moderatorId
        ),
      };
    default:
      return state;
  }
}
