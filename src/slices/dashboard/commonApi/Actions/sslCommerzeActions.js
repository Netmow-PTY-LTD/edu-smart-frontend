import { sslCommerzeServices } from '@/slices/services/dashboard/commonApi/sslcommerzeServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const sslCommerzeInit = createAsyncThunk(
  'GuardianDashboard/sslCommerzeInit',
  async (data, thunkApi) => {
    try {
      return await sslCommerzeServices.sslCommerzeInitService(data);
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
export const sslCommerzeForCommonInit = createAsyncThunk(
  'GuardianDashboard/sslCommerzeForCommonInit',
  async (data, thunkApi) => {
    try {
      return await sslCommerzeServices.sslCommerzeForCommonInitService(data);
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
