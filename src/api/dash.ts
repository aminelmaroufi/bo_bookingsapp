import adapter from "../utils/adapter";

export const getStatistics = async () => {
  try {
    const response = await adapter.get("/administrators/statistics");
    return response;
  } catch (err) {
    return err;
  }
};
