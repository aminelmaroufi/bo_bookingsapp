import { INewAdmin } from "src/models";
import adapter from "../utils/adapter";

export const getModerators = async () => {
  try {
    const response = await adapter.get("/administrators/moderators");
    return response;
  } catch (err) {
    return err;
  }
};

export const createModerator = async (moderator: INewAdmin) => {
  try {
    const response = await adapter.post(
      "/administrators/moderators",
      moderator
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteModerator = async (moderatorId: string) => {
  try {
    const response = await adapter.delete(
      `/administrators/moderators/${moderatorId}`
    );
    return response;
  } catch (err) {
    return err;
  }
};
