import { allInvoiceForSuperAdminService } from '@/slices/services/dashboard/superAdminDashboard/invoicesServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const allPendingInvoiceForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/allPendingInvoiceForSuperAdmin',
  async (thunkApi) => {
    try {
      return await allInvoiceForSuperAdminService.allPendingInvoiceForSuperAdminService();
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
export const allPaidInvoiceForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/allPaidInvoiceForSuperAdmin',
  async (thunkApi) => {
    try {
      return await allInvoiceForSuperAdminService.allPaidInvoiceForSuperAdminService();
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
