import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAboutService } from '@/slices/services/home/clientAboutService';

export const clientAboutAction = createAsyncThunk(
  'Home/clientAboutAction',
  async (subdomain, thunkApi) => {
    try {
      return await clientAboutService(subdomain);
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
