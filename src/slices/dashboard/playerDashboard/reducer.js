import { createSlice } from '@reduxjs/toolkit';
import {
  totalSubscriptionForPlayer,
  totalTeamsForPlayer,
} from './Actions/dashboardActions';
import { seasonalGameInvoiceForPlayer } from './Actions/eventsActions';
import {
  allTeamsForPlayer,
  singleTeamsForPlayer,
} from './Actions/teamsActions';

const initialStates = {
  allTeamsForPlayer: {
    data: [],
    isLoading: false,
    error: null,
  },
  singleTeamsForPlayer: {
    data: [],
    isLoading: false,
    error: null,
  },
  totalTeamsForPlayer: {
    data: [],
    isLoading: false,
    error: null,
  },
  totalSubscriptionForPlayer: {
    data: [],
    isLoading: false,
    error: null,
  },

  seasonalGameInvoiceForPlayer: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const playerDashboardSlice = createSlice({
  name: 'PlayerDashboard',
  initialState: initialStates,
  reducers: {},

  extraReducers: (builder) => {
    // get all teams
    builder.addCase(allTeamsForPlayer.pending, (state) => {
      state.allTeamsForPlayer.isLoading = true;
    });
    builder.addCase(allTeamsForPlayer.fulfilled, (state, action) => {
      state.allTeamsForPlayer.isLoading = false;
      state.allTeamsForPlayer.data = action.payload;
      state.allTeamsForPlayer.error = null;
    });
    builder.addCase(allTeamsForPlayer.rejected, (state, action) => {
      state.allTeamsForPlayer.isLoading = false;
      state.allTeamsForPlayer.data = {};
      state.allTeamsForPlayer.error = action.payload;
    });
    // get single teams
    builder.addCase(singleTeamsForPlayer.pending, (state) => {
      state.singleTeamsForPlayer.isLoading = true;
    });
    builder.addCase(singleTeamsForPlayer.fulfilled, (state, action) => {
      state.singleTeamsForPlayer.isLoading = false;
      state.singleTeamsForPlayer.data = action.payload;
      state.singleTeamsForPlayer.error = null;
    });
    builder.addCase(singleTeamsForPlayer.rejected, (state, action) => {
      state.singleTeamsForPlayer.isLoading = false;
      state.singleTeamsForPlayer.data = {};
      state.singleTeamsForPlayer.error = action.payload;
    });
    // total Teams For Player
    builder.addCase(totalTeamsForPlayer.pending, (state) => {
      state.totalTeamsForPlayer.isLoading = true;
    });
    builder.addCase(totalTeamsForPlayer.fulfilled, (state, action) => {
      state.totalTeamsForPlayer.isLoading = false;
      state.totalTeamsForPlayer.data = action.payload;
      state.totalTeamsForPlayer.error = null;
    });
    builder.addCase(totalTeamsForPlayer.rejected, (state, action) => {
      state.totalTeamsForPlayer.isLoading = false;
      state.totalTeamsForPlayer.data = {};
      state.totalTeamsForPlayer.error = action.payload;
    });
    // total Teams For Player
    builder.addCase(totalSubscriptionForPlayer.pending, (state) => {
      state.totalSubscriptionForPlayer.isLoading = true;
    });
    builder.addCase(totalSubscriptionForPlayer.fulfilled, (state, action) => {
      state.totalSubscriptionForPlayer.isLoading = false;
      state.totalSubscriptionForPlayer.data = action.payload;
      state.totalSubscriptionForPlayer.error = null;
    });
    builder.addCase(totalSubscriptionForPlayer.rejected, (state, action) => {
      state.totalSubscriptionForPlayer.isLoading = false;
      state.totalSubscriptionForPlayer.data = {};
      state.totalSubscriptionForPlayer.error = action.payload;
    });

    // seasonal Game Invoice For Player
    builder.addCase(seasonalGameInvoiceForPlayer.pending, (state) => {
      state.seasonalGameInvoiceForPlayer.isLoading = true;
    });
    builder.addCase(seasonalGameInvoiceForPlayer.fulfilled, (state, action) => {
      state.seasonalGameInvoiceForPlayer.isLoading = false;
      state.seasonalGameInvoiceForPlayer.data = action.payload;
      state.seasonalGameInvoiceForPlayer.error = null;
    });
    builder.addCase(seasonalGameInvoiceForPlayer.rejected, (state, action) => {
      state.seasonalGameInvoiceForPlayer.isLoading = false;
      state.seasonalGameInvoiceForPlayer.data = {};
      state.seasonalGameInvoiceForPlayer.error = action.payload;
    });

    //
  },
});

// export const {} = playerDashboardSlice.actions;

export default playerDashboardSlice.reducer;
