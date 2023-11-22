import { configureStore } from "@reduxjs/toolkit";
import footerReducer from "./footerslice";
import foodReducer from "./foodslice";

export const store = configureStore({
  reducer: {
    food: foodReducer,
    footer: footerReducer,
  },
});
