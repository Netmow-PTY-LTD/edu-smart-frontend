import { teamsForPlayerServices } from '@/slices/services/dashboard/playerDashboard/teamsServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const allTeamsForPlayer = createAsyncThunk(
  'GuardianDashboard/allTeamsForPlayer',
  async (thunkApi) => {
    try {
      return await teamsForPlayerServices.allTeamsForPlayerService();
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
export const singleTeamsForPlayer = createAsyncThunk(
  'GuardianDashboard/singleTeamsForPlayer',
  async (id, thunkApi) => {
    try {
      return await teamsForPlayerServices.singleTeamsForPlayerService(id);
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
