import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const Enums = Object.freeze({
  IDLE: "idle",
  LOADING: "Loading",
  ERROR: "error",
});

const foodslice = createSlice({
  name: "food",
  initialState: {
    data: [],
    status: Enums.IDLE,
    cart_data: [],
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    fetchProduct(state, action) {
      state.data = action.payload;
    },
    addInsideCart(state, action) {
      console.log(action.payload.quantity);

      if (state.cart_data.length === 0) {
        state.cart_data.push(action.payload);
      } else {
        const findIndex = state.cart_data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (findIndex === -1) {
          state.cart_data.push(action.payload);
        } else
          state.cart_data[findIndex].quantity =
            parseInt(state.cart_data[findIndex].quantity) +
            parseInt(action.payload.quantity);
      }
    },
    removeInsideCart(state, action) {
      console.log(action);
      state.cart_data.map(
        (item) => {
          if (item.id === action.payload) {
            if (item.quantity == 1) {
              state.cart_data = state.cart_data.filter(
                (res) => res.id !== action.payload
              );
            } else item.quantity -= 1;
          }
        }
        // (res) => res.id !== action.payload
      );
    },
    getDataFromCart(state, action) {
      if (state.cart_data.length == 0) {
        console.log("Empty inside cart");
      } else {
        const response = axios.post(
          "http://localhost:8081/foodList1",
          current(state.cart_data)
        );
        console.log(current(state.cart_data));
        state.cart_data = [];
      }
    },
  },
});

export const {
  setStatus,
  fetchProduct,
  addInsideCart,
  removeInsideCart,
  getDataFromCart,
} = foodslice.actions;
export default foodslice.reducer;

//Thunk middleWare
export function fetchData() {
  return async function fetchDataFromApi(dispatch, getState) {
    dispatch(setStatus(Enums.LOADING));
    try {
      const response = await axios.get("http://localhost:8081/foodList");
      dispatch(fetchProduct(response.data));
      dispatch(setStatus(Enums.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(Enums.ERROR));
    }
  };
}
