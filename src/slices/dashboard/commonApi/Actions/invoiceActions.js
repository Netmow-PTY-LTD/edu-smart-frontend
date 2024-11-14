import { seasonalGameInvoices } from '@/slices/services/dashboard/commonApi/invoiceServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const allSeasonalGameInvoices = createAsyncThunk(
  'CommonApi/allSeasonalGameInvoices',
  async (id, thunkApi) => {
    try {
      return await seasonalGameInvoices.allSeasonalGameInvoicesService(id);
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
export const allPaymentSettings = createAsyncThunk(
  'CommonApi/allPaymentSettings',
  async (id, thunkApi) => {
    try {
      return await seasonalGameInvoices.allPaymentSettingsService(id);
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
export const getAdminStripeSandboxMode = createAsyncThunk(
  'CommonApi/getAdminStripeSandboxMode',
  async (id, thunkApi) => {
    try {
      return await seasonalGameInvoices.getAdminStripeSandboxModeService();
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
export const singleSeasonalGameInvoiceById = createAsyncThunk(
  'CommonApi/singleSeasonalGameInvoiceById',
  async (id, thunkApi) => {
    try {
      return await seasonalGameInvoices.singleSeasonalGameInvoiceByIdService(
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

export const singleSeasonalGameInvoices = createAsyncThunk(
  'CommonApi/singleSeasonalGameInvoices',
  async (id, thunkApi) => {
    try {
      return await seasonalGameInvoices.singleSeasonalGameInvoicesService(id);
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
export const adminInfo = createAsyncThunk(
  'CommonApi/adminInfo',
  async (thunkApi) => {
    try {
      return await seasonalGameInvoices.adminInfoService();
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
export const allPlayerRegistrationInvoice = createAsyncThunk(
  'CommonApi/allPlayerRegistrationInvoice',
  async (thunkApi) => {
    try {
      return await seasonalGameInvoices.allPlayerRegistrationInvoiceService();
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
