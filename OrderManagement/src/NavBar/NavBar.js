import "./NavBar.css";
import { Navigate } from "react-router-dom";

const NavBar = ({ icon, setIcon }) => {
  const logout = () => {
    localStorage.removeItem("Id");
    window.location.replace("http://localhost:3000");
  };
  return (
    <div className="res-nav">
      <h1 style={{ display: "inline" }} className="res-nav-heading">
        OrderManagementSystem
      </h1>
      {/* checks if icon==1 then it change to 0;
          checks if icon==0 then it change to 1;
      */}
      <button
        style={{ height: "20px", zIndex: "-999" }}
        onClick={() => {
          icon === 1 ? setIcon(0) : setIcon(1);
        }}
      >
        Icon
      </button>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
