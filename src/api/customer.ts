import downloadJS from "downloadjs";
import adapter from "../utils/adapter";

export const getCustomers = async (params) => {
  const query = `q=${params.q}&page=${params.page}`;
  try {
    const response = await adapter.get(`/administrators/customers?${query}`);

    return response;
  } catch (err) {
    return err;
  }
};

export const exportCustomers = async () => {
  try {
    const response = await adapter.get(`/administrators/customers/exports`, {
      responseType: "blob",
    });
    downloadJS(response.data, `customers.xlsx`);
    return response;
  } catch (err) {
    return err;
  }
};

export const getCustomerBookings = async (customerID, params) => {
  const query = `q=${params.q}&page=${params.page}`;
  try {
    const response = await adapter.get(
      `/administrators/customers/${customerID}/bookings?${query}`
    );

    return response;
  } catch (err) {
    return err;
  }
};

export const exportCustomerBookings = async (customer, params) => {
  const query = `q=${params.q}`;
  try {
    const response = await adapter.get(
      `/administrators/customers/${customer._id}/bookings/exports?${query}`,
      {
        responseType: "blob",
      }
    );
    downloadJS(response.data, `${customer.fullname}_bookings.xlsx`);
    return response;
  } catch (err) {
    return err;
  }
};
