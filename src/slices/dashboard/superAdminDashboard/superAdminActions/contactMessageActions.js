import { contactMessageForSAdminServices } from '@/slices/services/dashboard/superAdminDashboard/contactMessageServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const allcontactMessageForSAdmin = createAsyncThunk(
  'SuperAdminDashboard/allcontactMessageForSAdmin',
  async (thunkApi) => {
    try {
      return await contactMessageForSAdminServices.allcontactMessageForSAdminService();
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

export const singleContactMessageForSAdmin = createAsyncThunk(
  'SuperAdminDashboard/singleContactMessageForSAdmin',
  async (id, thunkApi) => {
    try {
      return await contactMessageForSAdminServices.singleContactMessageForSAdminService(
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

export const deletecontactMessageForSAdmin = createAsyncThunk(
  'SuperAdminDashboard/deletecontactMessageForSAdmin',
  async (id, thunkApi) => {
    try {
      return await contactMessageForSAdminServices.deletecontactMessageForSAdminService(
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
