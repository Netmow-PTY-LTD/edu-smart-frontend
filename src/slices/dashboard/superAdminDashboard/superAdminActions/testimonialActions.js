import { testimonialServices } from '@/slices/services/dashboard/superAdminDashboard/testimonialServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addTestimonialForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/addTestimonialForSuperAdmin',
  async (data, thunkApi) => {
    try {
      return await testimonialServices.addTestimonialForSuperAdminService(data);
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
export const allTestimonialForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/allTestimonialForSuperAdmin',
  async (thunkApi) => {
    try {
      return await testimonialServices.allTestimonialForSuperAdminService();
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
export const updateTestimonialForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/updateTestimonialForSuperAdmin',
  async (data, thunkApi) => {
    try {
      return await testimonialServices.updateTestimonialForSuperAdminService(
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
export const deleteTestimonialForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/deleteTestimonialForSuperAdmin',
  async (id, thunkApi) => {
    try {
      return await testimonialServices.deleteTestimonialForSuperAdminService(
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
