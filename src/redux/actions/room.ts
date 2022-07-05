import { IHotel, IRoom } from "src/models";
import actionTypes from "../../utils/actionTypes";

export const getRooms = () => ({
  type: actionTypes.GET_ROOMS_REQUEST,
});

export const createRoomRequest = (idHotel, room) => ({
  type: actionTypes.ADD_ROOM_REQUEST,
  idHotel,
  room,
});

export const updateRoomRequest = (idHotel: string, room: IRoom) => ({
  type: actionTypes.UPDATE_ROOM_REQUEST,
  idHotel,
  room,
});

export const deleteRoomRequest = (idHotel: string, idRoom: string) => ({
  type: actionTypes.DELETE_ROOM_REQUEST,
  idHotel,
  idRoom,
});

export const exportHotelRoomsRquest = (hotel: IHotel) => ({
  type: actionTypes.EXPORT_HOTEL_ROOMS_REQUEST,
  hotel,
});
