import actionTypes from "../utils/actionTypes";
import { IHotel, IRoom } from "../models";

export interface HotelState {
  hotels: Array<IHotel>;
  hotel: IHotel;
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export interface getHotelsSuccess {
  hotels: Array<IHotel>;
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export interface selectHotel {
  hotel: IHotel;
}

export interface createHotelSuccess {
  hotel: IHotel;
}

export interface updateHotelSuccess {
  hotel: IHotel;
}

export interface deleteHotelSuccess {
  hotelId: string;
}

export interface addRoomSuccess {
  room: IRoom;
}

export interface updateRoomSuccess {
  room: IRoom;
}

export interface deleteRoomSuccess {
  idRoom: string;
}

export type getHotelsSuccessPayload = {
  type: actionTypes.GET_HOTELS_SUCCESS;
  payload: getHotelsSuccess;
};

export type selectHotelPayload = {
  type: actionTypes.SELECT_HOTEL;
  payload: selectHotel;
};

export type createHotelSuccessPayload = {
  type: actionTypes.CREATE_HOTEL_SUCCESS;
  payload: createHotelSuccess;
};

export type updateHotelSuccessPayload = {
  type: actionTypes.UPDATE_HOTEL_SUCCESS;
  payload: updateHotelSuccess;
};

export type deleteHotelSuccessPayload = {
  type: actionTypes.DELETE_HOTEL_SUCCESS;
  payload: deleteHotelSuccess;
};

export type addRoomSuccessPayload = {
  type: actionTypes.ADD_ROOM_SUCCESS;
  payload: addRoomSuccess;
};

export type updateRoomSuccessPayload = {
  type: actionTypes.UPDATE_ROOM_SUCCESS;
  payload: updateRoomSuccess;
};

export type deleteRoomSuccessPayload = {
  type: actionTypes.DELETE_ROOM_SUCCESS;
  payload: deleteRoomSuccess;
};

export type hotelActions =
  | getHotelsSuccessPayload
  | selectHotelPayload
  | createHotelSuccessPayload
  | updateHotelSuccessPayload
  | deleteHotelSuccessPayload
  | addRoomSuccessPayload
  | updateRoomSuccessPayload
  | deleteRoomSuccessPayload;
