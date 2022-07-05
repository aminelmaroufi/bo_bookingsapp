import actionTypes from "../utils/actionTypes";
import { IAdmin } from "../models";

export interface AdminState {
  moderators: Array<IAdmin>;
}

export interface getModeratorsSuccess {
  moderators: Array<IAdmin>;
}

export interface createModeratorSuccess {
  moderator: IAdmin;
}

export interface deleteModeratorSuccess {
  moderatorId: string;
}

export type getModeratorsSuccessPayload = {
  type: actionTypes.SET_MODERATORS;
  payload: getModeratorsSuccess;
};

export type createModeratorSuccessPayload = {
  type: actionTypes.CREATE_MODERATOR_SUCCESS;
  payload: createModeratorSuccess;
};

export type deleteModeratorSuccessPayload = {
  type: actionTypes.DELETE_MODERATOR_SUCCESS;
  payload: deleteModeratorSuccess;
};

export type adminActions =
  | getModeratorsSuccessPayload
  | createModeratorSuccessPayload
  | deleteModeratorSuccessPayload;
