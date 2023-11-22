import "./App.css";
import FoodCart from "./foodCart/FoodCart";
import NavBar from "./NavBar/NavBar";
import { createContext, useState } from "react";
import Footer from "./footer/Footer";
import KitchenService from "./kitchenService/KitchenService";
import Login from "./Login/Login";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

export const UserContext = createContext();
function App() {
  const [icon, setIcon] = useState(1);
  {
    return (
      <>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route element={<PrivateRoute />}>
            <Route
              path="/order"
              element={
                <>
                  <NavBar setIcon={setIcon} icon={icon} />
                  <FoodCart icon={icon} />
                  <Footer icon={icon} />
                </>
              }
            />
            <Route path="/kitchen" element={<KitchenService />} />
          </Route>
        </Routes>
      </>
    );

    //<KitchenService></KitchenService>;
  }
}

export default App;
