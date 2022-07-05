import downloadJS from "downloadjs";
import adapter from "../utils/adapter";

export const getBookings = async (params) => {
  const query = `q=${params.q}&page=${params.page}`;
  try {
    const response = await adapter.get(`/administrators/bookings?${query}`);
    return response;
  } catch (err) {
    return err;
  }
};

export const exportBookings = async (params) => {
  const query = `&q=${params.q}`;
  try {
    const response = await adapter.get(
      `/administrators/bookings/exports?${query}`,
      {
        responseType: "blob",
      }
    );
    downloadJS(response.data, "bookings.xlsx");
    return response;
  } catch (err) {
    return err;
  }
};
