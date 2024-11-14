import { profileSettingsForCommonServices } from '@/slices/services/dashboard/commonApi/settingsServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postProfileSettingsForCommon = createAsyncThunk(
  'GuardianDashboard/postProfileSettingsForCommon',
  async (data, thunkApi) => {
    try {
      return await profileSettingsForCommonServices.postProfileSettingsForCommonService(
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
export const changeEmailForCommon = createAsyncThunk(
  'GuardianDashboard/changeEmailForCommon',
  async (data, thunkApi) => {
    try {
      return await profileSettingsForCommonServices.changeEmailForCommonService(
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
export const changePasswordForCommon = createAsyncThunk(
  'GuardianDashboard/changePasswordForCommon',
  async (data, thunkApi) => {
    try {
      return await profileSettingsForCommonServices.changePasswordForCommonService(
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
