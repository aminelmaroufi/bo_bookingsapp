import actionTypes from "../utils/actionTypes";
import { IRoom } from "../models";

export interface RoomState {
  rooms: Array<IRoom>;
}

export interface getRoomsSuccess {
  rooms: Array<IRoom>;
}

export type getRoomsSuccessPayload = {
  type: actionTypes.GET_ROOMS_SUCCESS;
  payload: getRoomsSuccess;
};

export type roomActions = getRoomsSuccessPayload;
