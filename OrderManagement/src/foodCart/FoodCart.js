import { useEffect, useState } from "react";
import "./FoodCart.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { fetchData } from "../app/foodslice";
import { Enums } from "../app/foodslice";
import { addInsideCart, removeInsideCart } from "../app/foodslice";

const FoodCart = ({ icon }) => {
  const dispatch = useDispatch();

  const [storeQuantity, setStoreQuantity] = useState(1);
  const {
    data: foodItem,
    status,
    cart_data,
  } = useSelector((state) => state.food);

  const { info } = useSelector((state) => state.footer);

  const Checked = (e) => {
    const { name, value } = e.target;
    setStoreQuantity(value);
  };
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const handleAdd = ({ item }) => {
    const result = { ...item, quantity: storeQuantity };
    console.log(result);
    dispatch(addInsideCart(result));
  };

  const handleRemove = (item) => {
    dispatch(removeInsideCart(item.id));
  };

  if (status === Enums.LOADING) return <h1>Loading.....</h1>;

  if (status === Enums.ERROR) return <h1>Error</h1>;
  return (
    <div className="res-foodcontainer">
      {icon === 1 ? (
        foodItem?.map((item) => {
          if (item.category === info) {
            return (
              <div key={item.id} className="res-foodcart">
                <div className="res-div-url">Image: {item.url}</div>
                <div className="res-div-name">Name: {item.name}</div>
                <div className="res-div-price">Price: {item.price}</div>
                <div className="res-div-category">
                  Category: {item.category}
                </div>
                <div>
                  Quantity:
                  <input
                    className="res-food-input-quantity"
                    placeholder="Quantity"
                    type="number"
                    onChange={(e) => {
                      Checked(e);
                    }}
                  />
                </div>
                <div>
                  <button
                    onClick={() => {
                      handleAdd({ item });
                    }}
                    className="res-food-button-addToCart"
                  >
                    AddToCart
                  </button>
                </div>
              </div>
            );
          }
        })
      ) : (
        <p>
          {cart_data?.map((item) => {
            // if (item.id === 1) {
            return (
              <div key={item.id} className="res-foodcart">
                <div className="res-div-name">Name:{item.name}</div>
                <div className="res-div-price">Price:{item.price}</div>
                <div className="res-div-category">
                  Category: {item.category}
                </div>
                <div className="res-div-quantity">Quantity:{item.quantity}</div>
                <div>
                  <button
                    className="res-food-button-addToCart"
                    onClick={() => {
                      handleRemove(item);
                    }}
                  >
                    RemoveCart
                  </button>
                </div>
              </div>
            );
          })}
        </p>
      )}
    </div>
  );
};

export default FoodCart;
