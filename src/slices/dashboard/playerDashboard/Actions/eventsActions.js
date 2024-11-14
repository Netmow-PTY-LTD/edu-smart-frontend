import { eventsForPlayerServices } from '@/slices/services/dashboard/playerDashboard/eventsServices';
import { createAsyncThunk } from '@reduxjs/toolkit';



export const seasonalGameInvoiceForPlayer = createAsyncThunk(
  'GuardianDashboard/seasonalGameInvoiceForPlayer',
  async (id, thunkApi) => {
    try {
      return await eventsForPlayerServices.seasonalGameInvoiceForPlayerService(
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

