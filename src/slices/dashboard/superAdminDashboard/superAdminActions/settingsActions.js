import { settingsServices } from '@/slices/services/dashboard/superAdminDashboard/settingsServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateSystemSettingsForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/updateSystemSettingsForSuperAdmin',
  async (data, thunkApi) => {
    try {
      return await settingsServices.updateSystemSettingsForSuperAdminService(
        data
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

export const getAllSystemSettingsForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/getAllSystemSettingsForSuperAdmin',
  async (data, thunkApi) => {
    try {
      return await settingsServices.getAllSystemSettingsForSuperAdminService();
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

export const getSuperAdminInfo = createAsyncThunk(
  'SuperAdminDashboard/getSuperAdminInfo',
  async (thunkApi) => {
    try {
      return await settingsServices.getSuperAdminInfoService();
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
export const allDomainPointingRequest = createAsyncThunk(
  'SuperAdminDashboard/allDomainPointingRequest',
  async (thunkApi) => {
    try {
      return await settingsServices.allDomainPointingRequestService();
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
export const updateDomainPointingRequest = createAsyncThunk(
  'SuperAdminDashboard/updateDomainPointingRequest',
  async (data, thunkApi) => {
    try {
      return await settingsServices.updateDomainPointingRequestService(data);
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

export const addCurrencyAndGstForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/addCurrencyAndGstForSuperAdmin',
  async (data, thunkApi) => {
    try {
      return await settingsServices.addCurrencyAndGstForSuperAdminService(data);
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
export const getCurrencyAndGstForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/getCurrencyAndGstForSuperAdmin',
  async (thunkApi) => {
    try {
      return await settingsServices.getCurrencyAndGstForSuperAdminService();
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
export const getCurrencyAndGstFromAdminToSAdmin = createAsyncThunk(
  'SuperAdminDashboard/getCurrencyAndGstFromAdminToSAdmin',
  async (thunkApi) => {
    try {
      return await settingsServices.getCurrencyAndGstFromAdminToSAdminService();
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
export const getAdminGstCurrencySdfee = createAsyncThunk(
  'SuperAdminDashboard/getAdminGstCurrencySdfee',
  async (subdomain, thunkApi) => {
    try {
      return await settingsServices.getAdminGstCurrencySdfeeService(subdomain);
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
