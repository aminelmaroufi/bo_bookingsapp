import axios from "axios";
import { baseURL } from "../config";
import errorInterceptor from "./interceptors/error";

const adapter = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

// errorInterceptor(adapter);

export default adapter;
