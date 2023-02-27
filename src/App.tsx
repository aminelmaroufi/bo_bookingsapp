import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { CssBaseline } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import ThemeProvider from "./theme/ThemeProvider";
import routes from "./routes";
import { RootState } from "src/redux/reducers";
import { checkUser } from "src/redux/actions";
import SuspenseLoader from "src/components/SuspenseLoader";

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, fetching, error, success, message } = useSelector(
    (state: RootState) => state.auth
  );

  let content = useRoutes(routes(isLoggedIn));

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  useEffect(() => {
    if (error && message.length) {
      toast(message, {
        type: toast.TYPE.ERROR,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (success && message.length) {
      toast(message, {
        type: toast.TYPE.SUCCESS,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [error, success]);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ToastContainer data-testid="toastify" />
        <CssBaseline />
        {fetching && <SuspenseLoader />}
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
};
export default App;
