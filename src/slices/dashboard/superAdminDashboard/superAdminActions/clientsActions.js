import { clientsServices } from '@/slices/services/dashboard/superAdminDashboard/clientsServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addClientsForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/addClientsForSuperAdmin',
  async (data, thunkApi) => {
    try {
      return await clientsServices.addClientsForSuperAdminService(data);
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
export const allClientsForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/allClientsForSuperAdmin',
  async (thunkApi) => {
    try {
      return await clientsServices.allClientsForSuperAdminService();
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
export const updateClientsForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/updateClientsForSuperAdmin',
  async (data, thunkApi) => {
    try {
      return await clientsServices.updateClientsForSuperAdminService(data);
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
export const deleteClientsForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/deleteClientsForSuperAdmin',
  async (id, thunkApi) => {
    try {
      return await clientsServices.deleteClientsForSuperAdminService(id);
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
