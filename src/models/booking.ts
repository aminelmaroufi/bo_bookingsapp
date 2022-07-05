import { IHotel, IRoom, IUser } from ".";

export interface IBooking {
  _id: string;
  user: IUser;
  hotel: IHotel;
  room: IRoom;
  price: number;
  check_in_date: Date | null;
  check_out_date: Date | null;
  night_numbers: number;
  created_at: string;
  updated_at: string;
}
