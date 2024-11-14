import { organizationServices } from '@/slices/services/home/organization';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getTheme = createAsyncThunk(
  'Home/getTheme',
  async (subdomain, thunkApi) => {
    try {
      return await organizationServices.getThemeService(subdomain);
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
