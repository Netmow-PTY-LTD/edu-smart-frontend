import { packagesServices } from '@/slices/services/dashboard/superAdminDashboard/packagesServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addPackageForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/addPackageForSuperAdmin',
  async (data, thunkApi) => {
    try {
      return await packagesServices.addPackageForSuperAdminService(data);
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
export const allPackageForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/allPackageForSuperAdmin',
  async (thunkApi) => {
    try {
      return await packagesServices.allPackageForSuperAdminService();
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
export const singlePackageForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/singlePackageForSuperAdmin',
  async (id, thunkApi) => {
    try {
      return await packagesServices.singlePackageForSuperAdminService(id);
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
export const updatePackageForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/updatePackageForSuperAdmin',
  async (data, thunkApi) => {
    try {
      return await packagesServices.updatePackageForSuperAdminService(data);
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
export const deletePackageForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/deletePackageForSuperAdmin',
  async (id, thunkApi) => {
    try {
      return await packagesServices.deletePackageForSuperAdminService(id);
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
