import { eventsVisibleToTeamNameService } from "@/slices/services/dashboard/commonApi/teamServices";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const eventsVisibleToTeamName = createAsyncThunk(
    'GuardianDashboard/eventsVisibleToTeamName',
    async (data, thunkApi) => {
      try {
        return await eventsVisibleToTeamNameService(
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