import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../utils';

const resetPost = createAction('reset/Post');

export const createPostAction = createAsyncThunk(
  'api/post/created',
  async (posts, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.user?.data?.user?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      console.log('Posts', posts);

      const formPostData = new FormData();
      formPostData.append('title', posts?.title);
      formPostData.append('description', posts?.description);
      formPostData.append('category', posts?.category);
      formPostData.append('image', posts?.image);

      const { data } = await axios.post(
        `${BASE_URL}/api/v1/post`,
        formPostData,
        config
      );

      dispatch(resetPost());

      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      //Customise the default error handler
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAllPosts = createAsyncThunk(
  'api/post/fetch',
  async (category, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/post?category=${category}`,
        config
      );
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      //Customise the default error handler
      return rejectWithValue(err.response.data);
    }
  }
);

const postSlice = createSlice({
  name: 'postSlice',
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(resetPost, (state, action) => {
      state.isCreated = true;
    });
    // Create Post
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.postCreated = action?.payload;
      state.isCreated = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
    // Fetch All Posts
    builder.addCase(fetchAllPosts.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllPosts.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default postSlice.reducer;
