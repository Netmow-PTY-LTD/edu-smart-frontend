import { registeredAndDemoClientsServices } from '@/slices/services/dashboard/superAdminDashboard/registeredAndDemoClientsService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const allRegClientsForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/allRegClientsForSuperAdmin',
  async (thunkApi) => {
    try {
      return await registeredAndDemoClientsServices.allRegClientsForSuperAdminService();
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
export const deleteRegisterClientsForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/deleteRegisterClientsForSuperAdmin',
  async (id, thunkApi) => {
    try {
      return await registeredAndDemoClientsServices.deleteRegisterClientsForSuperAdminService(
        id
      );
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
export const allDemoClientsForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/allDemoClientsForSuperAdmin',
  async (thunkApi) => {
    try {
      return await registeredAndDemoClientsServices.allDemoClientsForSuperAdminService();
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
export const deleteDemoClientsForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/deleteDemoClientsForSuperAdmin',
  async (id, thunkApi) => {
    try {
      return await registeredAndDemoClientsServices.deleteDemoClientsForSuperAdminService(
        id
      );
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
