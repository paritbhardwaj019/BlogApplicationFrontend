import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils";

// Register Action
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/user/register`,
        user,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Login User Action
export const loginUserAction = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/user/login`,
        user,
        config
      );
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Get User from Local Storage
const userLoginFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: userLoginFromStorage,
};

// Logour User Action
export const logoutUserAuthentication = createAsyncThunk(
  "/user/logout",
  async (payload, rejectWithValue, getState, dispatch) => {
    try {
      localStorage.removeItem("user");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Slices
const userSlices = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // Register Slice
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
      state.registered = action.payload;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Login Slice
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.loginAppError = undefined;
      state.loginServerError = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.loginAppError = undefined;
      state.loginServerError = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.loginAppError = action?.payload?.message;
      state.loginServerError = action?.error?.message;
    });

    // Logout Slice
    builder.addCase(logoutUserAuthentication.pending, (state, action) => {
      state.loading = true;
      state.logoutAppError = undefined;
      state.logoutServerError = undefined;
    });
    builder.addCase(logoutUserAuthentication.fulfilled, (state, action) => {
      state.loading = false;
      state.user = undefined;
      state.logoutAppError = undefined;
      state.logoutServerError = undefined;
    });
    builder.addCase(logoutUserAuthentication.rejected, (state, action) => {
      state.loading = false;
      state.user = undefined;
      state.logoutAppError = action?.payload?.message;
      state.logoutServerError = action?.error?.message;
    });
  },
});

export default userSlices.reducer;
