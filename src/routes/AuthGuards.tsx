import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
// import { sessionRoutes } from "./index";

const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  console.log("children:", children);
  // return <>{isLoggedIn ? children : <Navigate to="/login" />}</>;
  return <>{children}</>;
};

export default AuthGuard;
