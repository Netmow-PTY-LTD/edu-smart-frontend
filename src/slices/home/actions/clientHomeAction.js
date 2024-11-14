import { clientHomeService } from '@/slices/services/home/clientHomeService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const clientHomeAction = createAsyncThunk(
  'Home/clientHomeAction',
  async (subDomain, thunkApi) => {
    try {
      return await clientHomeService(subDomain);
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
