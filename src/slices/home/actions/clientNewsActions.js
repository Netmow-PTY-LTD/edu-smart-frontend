import {
  clientNewsService,
  clientSingleNewsService,
} from '@/slices/services/home/clientNewsServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const clientNewsAction = createAsyncThunk(
  'Home/clientNewsAction',
  async (data, thunkApi) => {
    try {
      return await clientNewsService(data);
    } catch (error) {
      let msg = '';
      if (error.response.data.message) {
        msg = error.response.data.message;
      } else {
        msg = error.message;
      }
      return thunkApi.rejectWithValue(msg);
    }
  }
);
export const clientSingleNewsAction = createAsyncThunk(
  'Home/clientSingleNewsAction',
  async (data, thunkApi) => {
    try {
      return await clientSingleNewsService(data);
    } catch (error) {
      let msg = '';
      if (error.response.data.message) {
        msg = error.response.data.message;
      } else {
        msg = error.message;
      }
      return thunkApi.rejectWithValue(msg);
    }
  }
);
