import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { ReduxRouter } from "@lagunovsky/redux-react-router";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import errorInterceptor from "./utils/interceptors/error";
import reportWebVitals from "./reportWebVitals";
import configureStore from "./redux/store";
import { browserHistory } from "./redux/reducers/history";
import { SidebarProvider } from "./contexts/SidebarContext";

export const store = configureStore();
errorInterceptor(store);

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <Provider store={store}>
        <CssBaseline />
        <ReduxRouter
          history={browserHistory}
          store={store}
          children={<App />}
        />
      </Provider>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById("root")
);

// expose store when run in Cypress
if (window.Cypress) {
  window.store = store;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Add Cypress and store to global window for testing
declare global {
  interface Window {
    Cypress: object;
    store: any;
  }
}
