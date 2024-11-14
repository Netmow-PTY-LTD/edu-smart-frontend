import { createAsyncThunk } from '@reduxjs/toolkit';
import { setMetaServices } from '@/slices/services/dashboard/superAdminDashboard/seoMetaService';

export const seoMetaForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/seoMetaForSuperAdmin',
  async (thunkApi) => {
    try {
      return await setMetaServices.seoMetaForSuperAdminService();
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
export const updateSeoMetaForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/updateSeoMetaForSuperAdmin',
  async (data, thunkApi) => {
    try {
      return await setMetaServices.updateSeoMetaForSuperAdminService(data);
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
