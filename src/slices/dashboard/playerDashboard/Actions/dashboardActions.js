import { dashboardForPlayerServices } from '@/slices/services/dashboard/playerDashboard/dashboardServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const totalTeamsForPlayer = createAsyncThunk(
  'GuardianDashboard/totalTeamsForPlayer',
  async (thunkApi) => {
    try {
      return await dashboardForPlayerServices.totalTeamsForPlayerService();
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
export const totalSubscriptionForPlayer = createAsyncThunk(
  'GuardianDashboard/totalSubscriptionForPlayer',
  async (thunkApi) => {
    try {
      return await dashboardForPlayerServices.totalSubscriptionForPlayerService();
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
