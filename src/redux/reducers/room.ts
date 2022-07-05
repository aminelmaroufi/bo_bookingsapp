import ActionTypes from "../../utils/actionTypes";
import { RoomState, roomActions } from "../../types";
import { INewRoom, IRoom } from "src/models";

export const emptyNewRoom: INewRoom = {
  title: "",
  advantage: "",
  price: 0,
  room_picture: "",
};

export const emptyRoom: IRoom = {
  _id: "",
  title: "",
  advantage: "",
  price: 0,
  room_picture: "",
  created_at: "",
  updated_at: "",
  is_archived: false,
};

const initialState: RoomState = {
  rooms: [],
};
export default function reducer(state = initialState, action: roomActions) {
  switch (action.type) {
    case ActionTypes.GET_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.payload.rooms,
      };

    default:
      return state;
  }
}
