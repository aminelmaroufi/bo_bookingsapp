import downloadJS from "downloadjs";
import { IHotel, INewHotel, INewRoom, IRoom } from "src/models";
import adapter from "../utils/adapter";

export const getHotels = (params) => {
  const query = `q=${params.q}&page=${params.page}`;
  return adapter.get(`/administrators/hotels?${query}`).catch((err) => {
    let error: any;
    if (typeof err === "string") {
      error.message = err;
    } else {
      error = err.response.data.message
        ? err.response.data
        : err.response.data.result;
    }
    return Promise.reject(error);
  });
};

export const getSelectedHotel = (id: string) => {
  return adapter.get(`/administrators/hotels/${id}`).catch((err) => {
    let error: any;
    if (typeof err === "string") {
      error.message = err;
    } else {
      error = err.response.data.message
        ? err.response.data
        : err.response.data.result;
    }
    return Promise.reject(error);
  });
};

export const createHotel = (hotel: INewHotel) => {
  let formData = new FormData();
  formData.append("main_picture", hotel.main_picture);
  formData.append("second_picture", hotel.second_picture);
  formData.append("name", hotel.name);
  formData.append("type", hotel.type);
  formData.append("country", hotel.country);
  formData.append("city", hotel.city);
  formData.append("rating", hotel.rating.toString());
  formData.append("short_address", hotel.short_address);
  formData.append("address", hotel.address);
  formData.append("location", hotel.location);

  const headers = Object.assign(
    { "Content-Type": "multipart/form-data" },
    { Accept: "application/json" }
  );

  return adapter
    .post(`/administrators/hotels`, formData, {
      headers,
    })
    .catch((err) => {
      let error: any;
      if (typeof err === "string") {
        error.message = err;
      } else {
        error = err.response.data.message
          ? err.response.data
          : err.response.data.result;
      }
      return Promise.reject(error);
    });
};

export const updateHotel = (hotel: IHotel) => {
  let formData = new FormData();
  formData.append("main_picture", hotel.main_picture);
  formData.append("second_picture", hotel.second_picture);
  formData.append("name", hotel.name);
  formData.append("type", hotel.type);
  formData.append("country", hotel.country);
  formData.append("city", hotel.city);
  formData.append("rating", hotel.rating.toString());
  formData.append("short_address", hotel.short_address);
  formData.append("address", hotel.address);
  formData.append("location", hotel.location);

  const headers = Object.assign(
    { "Content-Type": "multipart/form-data" },
    { Accept: "application/json" }
  );

  return adapter
    .put(`/administrators/hotels/${hotel._id}`, formData, {
      headers,
    })
    .catch((err) => {
      let error: any;
      if (typeof err === "string") {
        error.message = err;
      } else {
        error = err.response.data.message
          ? err.response.data
          : err.response.data.result;
      }
      return Promise.reject(error);
    });
};

export const deleteHotel = async (id) => {
  try {
    const response = await adapter.delete(`/administrators/hotels/${id}`);
    return response;
  } catch (err) {
    return err;
  }
};

export const exportHotels = async (params) => {
  const query = `&q=${params.q}`;
  try {
    const response = await adapter.get(
      `/administrators/hotels/exports?${query}`,
      {
        responseType: "blob",
      }
    );
    downloadJS(response.data, "hotels.xlsx");
    return response;
  } catch (err) {
    return err;
  }
};

export const createRoom = async (idHotel: string, room: INewRoom) => {
  let formData = new FormData();
  formData.append("room_picture", room.room_picture);
  formData.append("title", room.title);
  formData.append("advantage", room.advantage);
  formData.append("price", room.price.toString());

  const headers = Object.assign(
    { "Content-Type": "multipart/form-data" },
    { Accept: "application/json" }
  );

  try {
    const response = await adapter.post(
      `/administrators/hotels/${idHotel}/rooms`,
      formData,
      {
        headers,
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const updateRoom = async (idHotel: string, room: IRoom) => {
  let formData = new FormData();
  formData.append("room_picture", room.room_picture);
  formData.append("title", room.title);
  formData.append("advantage", room.advantage);
  formData.append("price", room.price.toString());

  const headers = Object.assign(
    { "Content-Type": "multipart/form-data" },
    { Accept: "application/json" }
  );

  try {
    const response = await adapter.put(
      `/administrators/hotels/${idHotel}/rooms/${room._id}`,
      formData,
      {
        headers,
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteRoom = async (idHotel: string, idRoom: string) => {
  try {
    const response = await adapter.delete(
      `/administrators/hotels/${idHotel}/rooms/${idRoom}`
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const exportHotelRooms = async (hotel) => {
  try {
    const response = await adapter.get(
      `/administrators/hotels/${hotel._id}/rooms/exports`,
      {
        responseType: "blob",
      }
    );
    downloadJS(response.data, `${hotel.name}_rooms.xlsx`);
    return response;
  } catch (err) {
    return err;
  }
};
