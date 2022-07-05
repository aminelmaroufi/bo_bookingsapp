import adapter from "../utils/adapter";

export const getRooms = async () => {
  try {
    const response = await adapter.get("/administrators/rooms");
    return response;
  } catch (err) {
    return err;
  }
};
