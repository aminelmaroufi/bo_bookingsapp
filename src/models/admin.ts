import { IBooking } from "./index";

export interface IAdmin {
  _id: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  roles: Array<string>;
  created_at: string;
  updated_at: "";
}

export const emptyAdmin: IAdmin = {
  _id: "",
  firstname: "",
  lastname: "",
  fullname: "",
  email: "",
  roles: [],
  created_at: "",
  updated_at: "",
};

export interface INewAdmin {
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
}

export const emptyNewAdmin: INewAdmin = {
  firstname: "",
  lastname: "",
  fullname: "",
  email: "",
};
