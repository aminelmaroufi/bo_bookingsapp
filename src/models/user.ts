import { IBooking } from "./index";

export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  fullname: string;
  phone: string;
  email: string;
  bookings: Array<IBooking>;
  created_at: string;
  updated_at: "";
}

export const emptyUser: IUser = {
  _id: "",
  firstname: "",
  lastname: "",
  fullname: "",
  phone: "",
  email: "",
  bookings: [],
  created_at: "",
  updated_at: "",
};
