import axios from "axios";
import { useEffect, useState } from "react";
import "./KitchenService.css";

const KitchenService = () => {
  const [display, setDisplay] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/fetchFromDataBase")
      .then((display) => setDisplay(display.data))
      .catch((err) => console.log(err));
  });
  const logout = () => {
    localStorage.removeItem("Id");
    window.location.replace("http://localhost:3000");
  };
  const deleteFromDataBase = async (i) => {
    console.log(i);
    const res = await axios.post("http://localhost:8081/deleteFromDB", i);
    console.log(res);
  };

  return (
    <div className="res-kitchen-container">
      <div className="res-kitchen-mid-container">
        {
          <tr>
            <th>
              <span className="res-kitchen-head-section">Kitchen</span>
            </th>
            <th>
              <span className="res-kitchen-head-order">ORDER</span>
            </th>
            <th>
              <span className="res-kitchen-head-quantity">QUANTITY</span>
            </th>
          </tr>
        }
        {display.map((item) => {
          return (
            <>
              <table>
                <tr>
                  <td>
                    <span style={{ padding: "50px" }}>{item.name}</span>
                  </td>
                  <td>
                    <span style={{ padding: "20px" }}>{item.quantity}</span>
                  </td>
                  <td>
                    <button
                      className="res-kitchen-button-submit"
                      type="submit"
                      onClick={() => {
                        deleteFromDataBase(item);
                      }}
                    >
                      Deliver
                    </button>
                  </td>
                </tr>
              </table>
            </>
          );
        })}
      </div>
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

export default KitchenService;
