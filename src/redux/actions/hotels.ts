import { IHotel, INewHotel } from "src/models";
import actionTypes from "../../utils/actionTypes";

export const getHotels = (params) => ({
  type: actionTypes.GET_HOTELS_REQUEST,
  params,
});

export const selectHotel = (hotel: IHotel) => ({
  type: actionTypes.SELECT_HOTEL,
  payload: {
    hotel,
  },
});

export const getHotelRequest = (id: string) => ({
  type: actionTypes.SELECT_HOTEL_REQUEST,
  id,
});

export const createHotelRequest = (hotel: INewHotel) => ({
  type: actionTypes.CREATE_HOTEL_REQUEST,
  hotel,
});

export const updateHotelRequest = (hotel: INewHotel) => ({
  type: actionTypes.UPDATE_HOTEL_REQUEST,
  hotel,
});

export const deleteHotelRequest = (hotelId: string) => ({
  type: actionTypes.DELETE_HOTEL_REQUEST,
  hotelId,
});

export const exportHotels = (params) => ({
  type: actionTypes.EXPORT_HOTELS_REQUEST,
  params,
});
