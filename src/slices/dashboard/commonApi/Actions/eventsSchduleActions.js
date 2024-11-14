import { eventsScheduleServices } from '@/slices/services/dashboard/commonApi/eventsScheduleServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addEventSchedule = createAsyncThunk(
  'CommonApi/addEventSchedule',
  async (data, thunkApi) => {
    try {
      return await eventsScheduleServices.addEventScheduleService(data);
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
export const updateEventSchedule = createAsyncThunk(
  'CommonApi/updateEventSchedule',
  async (data, thunkApi) => {
    try {
      return await eventsScheduleServices.updateEventScheduleService(data);
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
export const deleteEventSchedule = createAsyncThunk(
  'CommonApi/deleteEventSchedule',
  async (id, thunkApi) => {
    try {
      return await eventsScheduleServices.deleteEventScheduleService(id);
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
