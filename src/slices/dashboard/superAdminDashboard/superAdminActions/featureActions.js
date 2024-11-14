import { featureServices } from '@/slices/services/dashboard/superAdminDashboard/featureServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addFeatureForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/addFeatureForSuperAdmin',
  async (data, thunkApi) => {
    try {
      return await featureServices.addFeatureForSuperAdminService(data);
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
export const allFeatureForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/allFeatureForSuperAdmin',
  async (thunkApi) => {
    try {
      return await featureServices.allFeatureForSuperAdminService();
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
export const updateFeatureForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/updateFeatureForSuperAdmin',
  async (data, thunkApi) => {
    try {
      return await featureServices.updateFeatureForSuperAdminService(data);
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
export const deleteFeatureForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/deleteFeatureForSuperAdmin',
  async (id, thunkApi) => {
    try {
      return await featureServices.deleteFeatureForSuperAdminService(id);
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
