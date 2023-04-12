import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/users/usersSlice";
import categoryReducer from "../slice/category/categorySlice";
import postReducer from "../slice/posts/postSlices";

export const store = configureStore({
  reducer: {
    users: userReducer,
    categories: categoryReducer,
    posts: postReducer,
  },
});
