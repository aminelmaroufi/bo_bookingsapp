import { IRoom } from ".";

export interface IHotel {
  _id: string;
  name: string;
  short_address: string;
  address: string;
  rating: number;
  location: string;
  type: string;
  city: string;
  country: string;
  main_picture: string;
  second_picture: string;
  rooms: Array<IRoom>;
  created_at: string;
  updated_at: string;
  is_archived: boolean;
}

export interface INewHotel {
  name: string;
  city: string;
  country: string;
  short_address: string;
  address: string;
  rating: number;
  location: string;
  type: string;
  main_picture: any;
  second_picture: any;
}
