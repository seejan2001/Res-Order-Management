import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  console.log(localStorage.getItem("Id"));
  let auth = { valid: localStorage.getItem("Id") };
  return auth.valid ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
