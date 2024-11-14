import { chargeManagementServices } from '@/slices/services/dashboard/superAdminDashboard/chargeManagementService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateChargeManagement = createAsyncThunk(
  'SuperAdminDashboard/updateChargeManagement',
  async (data, thunkApi) => {
    try {
      return await chargeManagementServices.updateChargeManagementService(data);
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
export const allChargeManagement = createAsyncThunk(
  'SuperAdminDashboard/allChargeManagement',
  async (thunkApi) => {
    try {
      return await chargeManagementServices.allChargeManagementService();
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
export const deleteChargeManagement = createAsyncThunk(
  'SuperAdminDashboard/deleteChargeManagement',
  async (id, thunkApi) => {
    try {
      return await chargeManagementServices.deleteChargeManagementService(id);
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
