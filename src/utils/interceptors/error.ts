import { AxiosError } from "axios";
import { browserHistory } from "src/redux/reducers/history";
import { useLocation } from "react-router-dom";

const DEBUG = process.env.REACT_APP_NODE_ENV !== "production";
const errorInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
      //Response Successful
    },
    (error) => {
      error = JSON.stringify(error);
      error = JSON.parse(error);

      if (error && error.status === 401) {
        const currPath = browserHistory.location.pathname;

        if (
          [
            "/session/forgot-password",
            "/session/reset-password",
            "/session/reset-password/invalid",
          ].includes(currPath)
        )
          return;
        else return browserHistory.push("/login");
        //   //Unauthorized
        //   //redirect to Login
      } else if (error && error.response.status === 500) {
        return browserHistory.push("/500");
        //Unauthorized
        //redirect to 500 page
      } else {
        //dispatch your error in a more user friendly manner
        if (DEBUG) {
          //easier debugging
          console.group("Error");
          console.log(error);
          console.groupEnd();
        }
        return error.response;
      }
    }
  );
};
export default errorInterceptor;
