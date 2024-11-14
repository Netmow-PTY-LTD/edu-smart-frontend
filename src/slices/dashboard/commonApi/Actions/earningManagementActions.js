import { earningManagementServices } from '@/slices/services/dashboard/commonApi/earningManagementServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const allEarningManagementCommon = createAsyncThunk(
  'CommonApi/allEarningManagementCommon',
  async (thunkApi) => {
    try {
      return await earningManagementServices.allEarningManagementCommonService();
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
