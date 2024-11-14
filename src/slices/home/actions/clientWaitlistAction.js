import clientWaitlistService from '@/slices/services/home/clientWaitlistService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const clientWaitlistAction = createAsyncThunk(
  'Home/clientWaitlistAction',
  async (data, thunkApi) => {
    try {
      return await clientWaitlistService(data.formData, data.subdomain);
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
