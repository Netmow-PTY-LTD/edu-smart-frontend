import { subscriberServices } from '@/slices/services/dashboard/superAdminDashboard/subscriberService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllSubscriber = createAsyncThunk(
  'SuperAdminDashboard/getAllSubscriber',
  async (thunkApi) => {
    try {
      return await subscriberServices.getAllSubscriberService();
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
