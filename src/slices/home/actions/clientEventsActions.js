import {
  clientEventsService,
  clientSingleEventsService,
} from '@/slices/services/home/clientEventsServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const clientEventsAction = createAsyncThunk(
  'Home/clientEventsAction',
  async (subdomain, thunkApi) => {
    try {
      return await clientEventsService(subdomain);
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
export const clientSingleEventsAction = createAsyncThunk(
  'Home/clientSingleEventsAction',
  async (data, thunkApi) => {
    try {
      return await clientSingleEventsService(data);
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
