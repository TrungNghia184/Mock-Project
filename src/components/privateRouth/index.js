import { BrowserRouter as Router, Navigate } from "react-router-dom";
import HomePage from "../../pages/homePage";
import React from "react";

const PrivateRoute = (props) => {
//   const dispatch = useDispatch();
  if (localStorage.getItem("token") === "false") {
    // dispatch(setGlobalLoading(false));
    return <HomePage restricted={true}/>;
  }
  return props.children;
};
export default PrivateRoute;
