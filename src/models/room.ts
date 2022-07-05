export interface IRoom {
  _id: string;
  title: string;
  advantage: string;
  price: number;
  room_picture: string;
  created_at: string;
  updated_at: string;
  is_archived: boolean;
}

export interface INewRoom {
  title: string;
  advantage: string;
  price: number;
  room_picture: any;
}
