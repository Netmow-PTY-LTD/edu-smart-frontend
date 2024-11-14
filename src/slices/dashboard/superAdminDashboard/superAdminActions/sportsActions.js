import { gamesServices } from '@/slices/services/dashboard/superAdminDashboard/sportsServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addGamesForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/addGamesForSuperAdmin',
  async (data, thunkApi) => {
    try {
      return await gamesServices.addGamesForSuperAdminService(data);
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
export const allGamesForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/allGamesForSuperAdmin',
  async (thunkApi) => {
    try {
      return await gamesServices.allGamesForSuperAdminService();
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
export const updateGamesForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/updateGamesForSuperAdmin',
  async (data, thunkApi) => {
    try {
      return await gamesServices.updateGamesForSuperAdminService(data);
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
export const deleteGamesForSuperAdmin = createAsyncThunk(
  'SuperAdminDashboard/deleteGamesForSuperAdmin',
  async (id, thunkApi) => {
    try {
      return await gamesServices.deleteGamesForSuperAdminService(id);
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
