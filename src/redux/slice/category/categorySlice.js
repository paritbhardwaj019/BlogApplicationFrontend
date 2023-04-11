import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../utils";
import axios from "axios";

export const createCategoryAction = createAsyncThunk(
  "/category/create",
  async (category, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.user?.data?.user?.token;
    try {
      const config = {
        headers: {
          "Conten-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/category`,
        { title: category?.category },
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

export const fetchAllCategoryAction = createAsyncThunk(
  "/category/all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.user?.data?.user?.token;
    try {
      const config = {
        headers: {
          "Conten-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(`${BASE_URL}/api/v1/category`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateCategoryAction = createAsyncThunk(
  "category/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.user?.data?.user?.token;

    try {
      const config = {
        headers: {
          "Conten-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/api/v1/category/${payload?.id}`,
        { title: payload?.title },
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

export const deleteCategoryAction = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.user?.data?.user?.token;
    try {
      const config = {
        headers: {
          "Conten-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.delete(
        `${BASE_URL}/api/v1/category/${id}`,
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

export const getSingleCategoryAction = createAsyncThunk(
  "category/single",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.user?.data?.user?.token;
    try {
      const config = {
        headers: {
          "Conten-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/category/${id}`,
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

// Slices
const categorySlice = createSlice({
  name: "category",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Get All Category
    builder.addCase(fetchAllCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Update Category
    builder.addCase(updateCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.updateCategory = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Get Single Category
    builder.addCase(getSingleCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(getSingleCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(getSingleCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    // Delete Category
    builder.addCase(deleteCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedCategory = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default categorySlice.reducer;
