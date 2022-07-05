import { INewAdmin } from "src/models";
import actionTypes from "../../utils/actionTypes";

export const getModerators = () => ({
  type: actionTypes.GET_MODERATORS_REQUEST,
});

export const createModeratorRequest = (moderator: INewAdmin) => ({
  type: actionTypes.CREATE_MODERATOR_REQUEST,
  moderator,
});

export const deleteModeratorRequest = (moderatorId: string) => ({
  type: actionTypes.DELETE_MODERATOR_REQUEST,
  moderatorId,
});
