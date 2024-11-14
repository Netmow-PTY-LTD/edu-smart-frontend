import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  clientTeamService,
  getSingleTeam,
} from '@/slices/services/home/clientTeamService';

export const clientTeamAction = createAsyncThunk(
  'clientTeamAction',
  async (subdomain, thunkApi) => {
    try {
      return await clientTeamService(subdomain);
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

export const getSingleTeamAction = createAsyncThunk(
  'getSingleTeamAction',
  async (data, thunkApi) => {
    try {
      return await getSingleTeam(data);
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
