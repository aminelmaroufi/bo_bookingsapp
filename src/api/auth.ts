import adapter from "../utils/adapter";

// export interface IData {
//   ok: boolean;
//   result: object;
// }

export let checkUser = () => {
  return adapter.get("/me").catch((err) => {
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

export const login = (email: string, password: string) => {
  const payload = {
    username: email,
    password: password,
  };
  return adapter.post("/auth/signin?scope=admin", payload).catch((err) => {
    return Promise.reject(err);
  });
};

export const logout = () => {
  return adapter.post("/auth/signout").catch((err) => {
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

export const forgotPwd = (email: string) => {
  const payload = {
    email,
  };

  return adapter.post("auth/forgot", payload).catch((err) => {
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

export const resetPwd = (
  token: string,
  newPassword: string,
  verifyPassword: string
) => {
  const payload = {
    newPassword,
    verifyPassword,
  };

  return adapter.post(`auth/reset/${token}`, payload).catch((err) => {
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
