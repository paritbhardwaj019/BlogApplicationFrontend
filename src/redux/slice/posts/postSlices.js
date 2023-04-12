import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils";

export const createPostAction = createAsyncThunk(
  "post/create",
  async (post, { rejectWithValue, dispatch, getState }) => {
    const userToken = getState()?.users?.user?.data?.user?.token;
    try {
      const config = {
        headers: {
          "Conten-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = axios.post(`${BASE_URL}/api/v1/post`, post, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const postSlice = createSlice({
  name: "postSlice",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postCreated = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default postSlice.reducer;
