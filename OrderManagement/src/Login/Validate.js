import axios from "axios";
import PrivateRoute from "../utils/PrivateRoute";
import { Navigate } from "react-router-dom";

const Validate = async (email, password, setState) => {
  console.log(email);
  const response = await axios.post(
    "http://localhost:8081/validationForLogin",
    { email, password }
  );
  if (response.status === 200) {
    console.log("User Founded");
    console.log(response.data._id);
    localStorage.setItem("Id", response.data._id);
    if (response.data.role === "cashier") {
      window.location.replace("http://localhost:3000/order");
    } else {
      window.location.replace("http://localhost:3000/kitchen");
    }
  } else {
    console.log("User Not Founded");
  }
};

export default Validate;
