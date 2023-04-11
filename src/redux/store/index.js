import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/users/usersSlice";
import categoryReducer from "../slice/category/categorySlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    categories: categoryReducer,
  },
});
