import ActionTypes from "../../utils/actionTypes";
import { HotelState, hotelActions } from "../../types";
import { IHotel, INewHotel } from "src/models";

export const emptyHotel: IHotel = {
  _id: "",
  name: "",
  short_address: "",
  address: "",
  rating: 0,
  location: "",
  type: "",
  city: "",
  country: "",
  main_picture: "",
  second_picture: "",
  rooms: [],
  created_at: "",
  updated_at: "",
  is_archived: false,
};

export const emptyNewHotel: INewHotel = {
  name: "",
  short_address: "",
  address: "",
  city: "",
  country: "",
  rating: 0,
  location: "",
  type: "",
  main_picture: "",
  second_picture: "",
};

const initialState: HotelState = {
  hotels: [],
  hotel: emptyHotel,
  total: 0,
  pages: 1,
  page: 1,
  limit: 10,
};
export default function reducer(state = initialState, action: hotelActions) {
  let hotel;
  switch (action.type) {
    case ActionTypes.GET_HOTELS_SUCCESS:
      return {
        ...state,
        hotels: action.payload.hotels,
        total: action.payload.total,
        pages: action.payload.pages,
        page: action.payload.page,
        limit: action.payload.limit,
      };
    case ActionTypes.SELECT_HOTEL:
      return {
        ...state,
        hotel: action.payload.hotel,
      };
    case ActionTypes.CREATE_HOTEL_SUCCESS:
      let hotels = state.hotels;
      hotels.unshift(action.payload.hotel);
      return {
        ...state,
        hotels: hotels,
      };
    case ActionTypes.DELETE_HOTEL_SUCCESS:
      return {
        ...state,
        hotels: state.hotels.filter(
          (hotel) => hotel._id !== action.payload.hotelId
        ),
      };
    case ActionTypes.UPDATE_HOTEL_SUCCESS:
      return {
        ...state,
        hotels: state.hotels.map((hotel) => {
          if (hotel._id === action.payload.hotel._id)
            hotel = action.payload.hotel;
          return hotel;
        }),
      };
    case ActionTypes.ADD_ROOM_SUCCESS:
      let selectedHotel = state.hotel;
      selectedHotel.rooms.unshift(action.payload.room);
      return {
        ...state,
        hotel: selectedHotel,
      };
    case ActionTypes.UPDATE_ROOM_SUCCESS:
      hotel = state.hotel;
      hotel.rooms = hotel.rooms.map((room) => {
        if (room._id === action.payload.room._id) room = action.payload.room;
        return room;
      });
      return {
        ...state,
        hotel,
      };
    case ActionTypes.DELETE_ROOM_SUCCESS:
      hotel = state.hotel;
      hotel.rooms = hotel.rooms.filter(
        (room) => room._id !== action.payload.idRoom
      );
      return {
        ...state,
        hotel,
      };
    default:
      return state;
  }
}
