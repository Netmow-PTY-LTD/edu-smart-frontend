import { createSlice } from '@reduxjs/toolkit';
import {
  allCustomTrainingScheduleForCommon,
  allCustomTrainingScheduleForTeamCommon,
  allEventsActivity,
  allEventsForCommon,
  allEventsForTeamCommon,
  allGameScheduleForCommon,
  allGameScheduleForTeamCommon,
  allGameScheduleForUserInAdmin,
  allSeasonalGameForCommon,
  allSeasonalGameForTeamCommon,
  allWeeklyTrainingScheduleForCommon,
  allWeeklyTrainingScheduleForTeamCommon,
  getAllRSVPForSeasonalGame,
  getAllRSVPForSeasonalGameForUser,
  getAllRSVPForSpecialEvents,
  getAllRSVPForSpecialEventsForUser,
  playerListForSeasonalGameInGuardian,
  singleEventsActivity,
  singleEventsForCommon,
  singleGameSchedule,
  singleTeamProfileCommon,
  singleTrainingSchedule,
} from './Actions/eventsActions';
import {
  addEventSchedule,
  deleteEventSchedule,
  updateEventSchedule,
} from './Actions/eventsSchduleActions';
import {
  adminInfo,
  allPaymentSettings,
  allPlayerRegistrationInvoice,
  allSeasonalGameInvoices,
  getAdminStripeSandboxMode,
  singleSeasonalGameInvoiceById,
  singleSeasonalGameInvoices,
} from './Actions/invoiceActions';
import {
  changeEmailForCommon,
  changePasswordForCommon,
  postProfileSettingsForCommon,
} from './Actions/settingsActions';
import {
  sslCommerzeForCommonInit,
  sslCommerzeInit,
} from './Actions/sslCommerzeActions';
import { eventsVisibleToTeamName } from './Actions/teamActions';
import { allEarningManagementCommon } from './Actions/earningManagementActions';

const initialStates = {
  allSeasonalGameForCommon: {
    data: [],
    isLoading: false,
    error: null,
  },

  allWeeklyTrainingScheduleForCommon: {
    data: [],
    isLoading: false,
    error: null,
  },
  allCustomTrainingScheduleForCommon: {
    data: [],
    isLoading: false,
    error: null,
  },
  allGameScheduleForCommon: {
    data: [],
    isLoading: false,
    error: null,
  },
  postProfileSettingsForCommon: {
    data: [],
    isLoading: false,
    error: null,
  },
  changeEmailForCommon: {
    data: [],
    isLoading: false,
    error: null,
  },
  changePasswordForCommon: {
    data: [],
    isLoading: false,
    error: null,
  },
  allWeeklyTrainingScheduleForTeamCommon: {
    data: [],
    isLoading: false,
    error: null,
  },
  allCustomTrainingScheduleForTeamCommon: {
    data: [],
    isLoading: false,
    error: null,
  },
  allGameScheduleForTeamCommon: {
    data: [],
    isLoading: false,
    error: null,
  },
  allSeasonalGameForTeamCommon: {
    data: [],
    isLoading: false,
    error: null,
  },
  allEventsForTeamCommon: {
    data: [],
    isLoading: false,
    error: null,
  },
  allEventsForCommon: {
    data: [],
    isLoading: false,
    error: null,
  },
  singleEventsForCommon: {
    data: [],
    isLoading: false,
    error: null,
  },
  allEventsActivity: {
    data: [],
    isLoading: false,
    error: null,
  },
  singleEventsActivity: {
    data: [],
    isLoading: false,
    error: null,
  },
  eventsVisibleToTeamName: {
    data: [],
    isLoading: false,
    error: null,
  },
  singleGameSchedule: {
    data: [],
    isLoading: false,
    error: null,
  },
  singleTrainingSchedule: {
    data: [],
    isLoading: false,
    error: null,
  },
  getAllRSVPForSeasonalGame: {
    data: [],
    isLoading: false,
    error: null,
  },
  getAllRSVPForSeasonalGameForUser: {
    data: [],
    isLoading: false,
    error: null,
  },
  getAllRSVPForSpecialEvents: {
    data: [],
    isLoading: false,
    error: null,
  },
  getAllRSVPForSpecialEventsForUser: {
    data: [],
    isLoading: false,
    error: null,
  },
  playerListForSeasonalGameInGuardian: {
    data: [],
    isLoading: false,
    error: null,
  },
  allGameScheduleForUserInAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  allSeasonalGameInvoices: {
    data: [],
    isLoading: false,
    error: null,
  },
  singleSeasonalGameInvoices: {
    data: [],
    isLoading: false,
    error: null,
  },
  allPaymentSettings: {
    data: [],
    isLoading: false,
    error: null,
  },
  adminInfo: {
    data: [],
    isLoading: false,
    error: null,
  },
  allPlayerRegistrationInvoice: {
    data: [],
    isLoading: false,
    error: null,
  },
  singleSeasonalGameInvoiceById: {
    data: [],
    isLoading: false,
    error: null,
  },
  singleTeamProfileCommon: {
    data: [],
    isLoading: false,
    error: null,
  },
  selectPlayers: {
    data: [],
  },
  seasonalGameId: {
    data: [],
  },
  addEventSchedule: {
    data: [],
    isLoading: false,
    error: null,
  },
  updateEventSchedule: {
    data: [],
    isLoading: false,
    error: null,
  },
  deleteEventSchedule: {
    data: [],
    isLoading: false,
    error: null,
  },
  getAdminStripeSandboxMode: {
    data: [],
    isLoading: false,
    error: null,
  },
  sslCommerzeInit: {
    data: [],
    isLoading: false,
    error: null,
  },
  sslCommerzeForCommonInit: {
    data: [],
    isLoading: false,
    error: null,
  },
  allEarningManagementCommon: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const commonApiSlice = createSlice({
  name: 'CommonApi',
  initialState: initialStates,
  reducers: {
    emptyProfileSettingsForCommon: (state) => {
      state.postProfileSettingsForCommon.data = {};
    },
    emptyChangeEmailForCommon: (state) => {
      state.changeEmailForCommon.data = {};
    },
    emptyChangePasswordForCommon: (state) => {
      state.changePasswordForCommon.data = {};
    },
    addSelectPlayers(state, action) {
      state.selectPlayers.data = [
        ...state.selectPlayers.data,
        ...action.payload,
      ];
    },
    addSeasonalGameId(state, action) {
      state.seasonalGameId.data = [
        ...state.seasonalGameId.data,
        ...action.payload,
      ];
    },
    emptyAddSelectPlayers(state, action) {
      state.selectPlayers.data = [];
    },
  },

  extraReducers: (builder) => {
    // all Seasonal Game For Player
    builder.addCase(allSeasonalGameForCommon.pending, (state) => {
      state.allSeasonalGameForCommon.isLoading = true;
    });
    builder.addCase(allSeasonalGameForCommon.fulfilled, (state, action) => {
      state.allSeasonalGameForCommon.isLoading = false;
      state.allSeasonalGameForCommon.data = action.payload;
      state.allSeasonalGameForCommon.error = null;
    });
    builder.addCase(allSeasonalGameForCommon.rejected, (state, action) => {
      state.allSeasonalGameForCommon.isLoading = false;
      state.allSeasonalGameForCommon.data = {};
      state.allSeasonalGameForCommon.error = action.payload;
    });

    // all Weekly Training Schedule For Player
    builder.addCase(allWeeklyTrainingScheduleForCommon.pending, (state) => {
      state.allWeeklyTrainingScheduleForCommon.isLoading = true;
    });
    builder.addCase(
      allWeeklyTrainingScheduleForCommon.fulfilled,
      (state, action) => {
        state.allWeeklyTrainingScheduleForCommon.isLoading = false;
        state.allWeeklyTrainingScheduleForCommon.data = action.payload;
        state.allWeeklyTrainingScheduleForCommon.error = null;
      }
    );
    builder.addCase(
      allWeeklyTrainingScheduleForCommon.rejected,
      (state, action) => {
        state.allWeeklyTrainingScheduleForCommon.isLoading = false;
        state.allWeeklyTrainingScheduleForCommon.data = {};
        state.allWeeklyTrainingScheduleForCommon.error = action.payload;
      }
    );
    // all custom Training Schedule For Player
    builder.addCase(allCustomTrainingScheduleForCommon.pending, (state) => {
      state.allCustomTrainingScheduleForCommon.isLoading = true;
    });
    builder.addCase(
      allCustomTrainingScheduleForCommon.fulfilled,
      (state, action) => {
        state.allCustomTrainingScheduleForCommon.isLoading = false;
        state.allCustomTrainingScheduleForCommon.data = action.payload;
        state.allCustomTrainingScheduleForCommon.error = null;
      }
    );
    builder.addCase(
      allCustomTrainingScheduleForCommon.rejected,
      (state, action) => {
        state.allCustomTrainingScheduleForCommon.isLoading = false;
        state.allCustomTrainingScheduleForCommon.data = {};
        state.allCustomTrainingScheduleForCommon.error = action.payload;
      }
    );
    // all Game Schedule For Player
    builder.addCase(allGameScheduleForCommon.pending, (state) => {
      state.allGameScheduleForCommon.isLoading = true;
    });
    builder.addCase(allGameScheduleForCommon.fulfilled, (state, action) => {
      state.allGameScheduleForCommon.isLoading = false;
      state.allGameScheduleForCommon.data = action.payload;
      state.allGameScheduleForCommon.error = null;
    });
    builder.addCase(allGameScheduleForCommon.rejected, (state, action) => {
      state.allGameScheduleForCommon.isLoading = false;
      state.allGameScheduleForCommon.data = {};
      state.allGameScheduleForCommon.error = action.payload;
    });
    // post Profile Settings For Player
    builder.addCase(postProfileSettingsForCommon.pending, (state) => {
      state.postProfileSettingsForCommon.isLoading = true;
    });
    builder.addCase(postProfileSettingsForCommon.fulfilled, (state, action) => {
      state.postProfileSettingsForCommon.isLoading = false;
      state.postProfileSettingsForCommon.data = action.payload;
      state.postProfileSettingsForCommon.error = null;
    });
    builder.addCase(postProfileSettingsForCommon.rejected, (state, action) => {
      state.postProfileSettingsForCommon.isLoading = false;
      state.postProfileSettingsForCommon.data = {};
      state.postProfileSettingsForCommon.error = action.payload;
    });
    //change Email For Player
    builder.addCase(changeEmailForCommon.pending, (state) => {
      state.changeEmailForCommon.isLoading = true;
    });
    builder.addCase(changeEmailForCommon.fulfilled, (state, action) => {
      state.changeEmailForCommon.isLoading = false;
      state.changeEmailForCommon.data = action.payload;
      state.changeEmailForCommon.error = null;
    });
    builder.addCase(changeEmailForCommon.rejected, (state, action) => {
      state.changeEmailForCommon.isLoading = false;
      state.changeEmailForCommon.data = {};
      state.changeEmailForCommon.error = action.payload;
    });
    //change Password For Player
    builder.addCase(changePasswordForCommon.pending, (state) => {
      state.changePasswordForCommon.isLoading = true;
    });
    builder.addCase(changePasswordForCommon.fulfilled, (state, action) => {
      state.changePasswordForCommon.isLoading = false;
      state.changePasswordForCommon.data = action.payload;
      state.changePasswordForCommon.error = null;
    });
    builder.addCase(changePasswordForCommon.rejected, (state, action) => {
      state.changePasswordForCommon.isLoading = false;
      state.changePasswordForCommon.data = {};
      state.changePasswordForCommon.error = action.payload;
    });
    // allCustomTrainingScheduleForTeamCommon
    builder.addCase(allCustomTrainingScheduleForTeamCommon.pending, (state) => {
      state.allCustomTrainingScheduleForTeamCommon.isLoading = true;
    });
    builder.addCase(
      allCustomTrainingScheduleForTeamCommon.fulfilled,
      (state, action) => {
        state.allCustomTrainingScheduleForTeamCommon.isLoading = false;
        state.allCustomTrainingScheduleForTeamCommon.data = action.payload;
        state.allCustomTrainingScheduleForTeamCommon.error = null;
      }
    );
    builder.addCase(
      allCustomTrainingScheduleForTeamCommon.rejected,
      (state, action) => {
        state.allCustomTrainingScheduleForTeamCommon.isLoading = false;
        state.allCustomTrainingScheduleForTeamCommon.data = {};
        state.allCustomTrainingScheduleForTeamCommon.error = action.payload;
      }
    );
    // allWeeklyTrainingScheduleForTeamCommon
    builder.addCase(allWeeklyTrainingScheduleForTeamCommon.pending, (state) => {
      state.allWeeklyTrainingScheduleForTeamCommon.isLoading = true;
    });
    builder.addCase(
      allWeeklyTrainingScheduleForTeamCommon.fulfilled,
      (state, action) => {
        state.allWeeklyTrainingScheduleForTeamCommon.isLoading = false;
        state.allWeeklyTrainingScheduleForTeamCommon.data = action.payload;
        state.allWeeklyTrainingScheduleForTeamCommon.error = null;
      }
    );
    builder.addCase(
      allWeeklyTrainingScheduleForTeamCommon.rejected,
      (state, action) => {
        state.allWeeklyTrainingScheduleForTeamCommon.isLoading = false;
        state.allWeeklyTrainingScheduleForTeamCommon.data = {};
        state.allWeeklyTrainingScheduleForTeamCommon.error = action.payload;
      }
    );
    // allGameScheduleForTeamCommon
    builder.addCase(allGameScheduleForTeamCommon.pending, (state) => {
      state.allGameScheduleForTeamCommon.isLoading = true;
    });
    builder.addCase(allGameScheduleForTeamCommon.fulfilled, (state, action) => {
      state.allGameScheduleForTeamCommon.isLoading = false;
      state.allGameScheduleForTeamCommon.data = action.payload;
      state.allGameScheduleForTeamCommon.error = null;
    });
    builder.addCase(allGameScheduleForTeamCommon.rejected, (state, action) => {
      state.allGameScheduleForTeamCommon.isLoading = false;
      state.allGameScheduleForTeamCommon.data = {};
      state.allGameScheduleForTeamCommon.error = action.payload;
    });
    // allSeasonalGameForTeamCommon
    builder.addCase(allSeasonalGameForTeamCommon.pending, (state) => {
      state.allSeasonalGameForTeamCommon.isLoading = true;
    });
    builder.addCase(allSeasonalGameForTeamCommon.fulfilled, (state, action) => {
      state.allSeasonalGameForTeamCommon.isLoading = false;
      state.allSeasonalGameForTeamCommon.data = action.payload;
      state.allSeasonalGameForTeamCommon.error = null;
    });
    builder.addCase(allSeasonalGameForTeamCommon.rejected, (state, action) => {
      state.allSeasonalGameForTeamCommon.isLoading = false;
      state.allSeasonalGameForTeamCommon.data = {};
      state.allSeasonalGameForTeamCommon.error = action.payload;
    });
    // allEventsForTeamCommon
    builder.addCase(allEventsForTeamCommon.pending, (state) => {
      state.allEventsForTeamCommon.isLoading = true;
    });
    builder.addCase(allEventsForTeamCommon.fulfilled, (state, action) => {
      state.allEventsForTeamCommon.isLoading = false;
      state.allEventsForTeamCommon.data = action.payload;
      state.allEventsForTeamCommon.error = null;
    });
    builder.addCase(allEventsForTeamCommon.rejected, (state, action) => {
      state.allEventsForTeamCommon.isLoading = false;
      state.allEventsForTeamCommon.data = {};
      state.allEventsForTeamCommon.error = action.payload;
    });
    // allEventsForCommon
    builder.addCase(allEventsForCommon.pending, (state) => {
      state.allEventsForCommon.isLoading = true;
    });
    builder.addCase(allEventsForCommon.fulfilled, (state, action) => {
      state.allEventsForCommon.isLoading = false;
      state.allEventsForCommon.data = action.payload;
      state.allEventsForCommon.error = null;
    });
    builder.addCase(allEventsForCommon.rejected, (state, action) => {
      state.allEventsForCommon.isLoading = false;
      state.allEventsForCommon.data = {};
      state.allEventsForCommon.error = action.payload;
    });
    // singleEventsForCommon
    builder.addCase(singleEventsForCommon.pending, (state) => {
      state.singleEventsForCommon.isLoading = true;
    });
    builder.addCase(singleEventsForCommon.fulfilled, (state, action) => {
      state.singleEventsForCommon.isLoading = false;
      state.singleEventsForCommon.data = action.payload;
      state.singleEventsForCommon.error = null;
    });
    builder.addCase(singleEventsForCommon.rejected, (state, action) => {
      state.singleEventsForCommon.isLoading = false;
      state.singleEventsForCommon.data = {};
      state.singleEventsForCommon.error = action.payload;
    });
    // allEventsActivity
    builder.addCase(allEventsActivity.pending, (state) => {
      state.allEventsActivity.isLoading = true;
    });
    builder.addCase(allEventsActivity.fulfilled, (state, action) => {
      state.allEventsActivity.isLoading = false;
      state.allEventsActivity.data = action.payload;
      state.allEventsActivity.error = null;
    });
    builder.addCase(allEventsActivity.rejected, (state, action) => {
      state.allEventsActivity.isLoading = false;
      state.allEventsActivity.data = {};
      state.allEventsActivity.error = action.payload;
    });
    // singleEventsActivity
    builder.addCase(singleEventsActivity.pending, (state) => {
      state.singleEventsActivity.isLoading = true;
    });
    builder.addCase(singleEventsActivity.fulfilled, (state, action) => {
      state.singleEventsActivity.isLoading = false;
      state.singleEventsActivity.data = action.payload;
      state.singleEventsActivity.error = null;
    });
    builder.addCase(singleEventsActivity.rejected, (state, action) => {
      state.singleEventsActivity.isLoading = false;
      state.singleEventsActivity.data = {};
      state.singleEventsActivity.error = action.payload;
    });
    // eventsVisibleToTeamName
    builder.addCase(eventsVisibleToTeamName.pending, (state) => {
      state.eventsVisibleToTeamName.isLoading = true;
    });
    builder.addCase(eventsVisibleToTeamName.fulfilled, (state, action) => {
      state.eventsVisibleToTeamName.isLoading = false;
      state.eventsVisibleToTeamName.data = action.payload;
      state.eventsVisibleToTeamName.error = null;
    });
    builder.addCase(eventsVisibleToTeamName.rejected, (state, action) => {
      state.eventsVisibleToTeamName.isLoading = false;
      state.eventsVisibleToTeamName.data = {};
      state.eventsVisibleToTeamName.error = action.payload;
    });
    // singleGameSchedule
    builder.addCase(singleGameSchedule.pending, (state) => {
      state.singleGameSchedule.isLoading = true;
    });
    builder.addCase(singleGameSchedule.fulfilled, (state, action) => {
      state.singleGameSchedule.isLoading = false;
      state.singleGameSchedule.data = action.payload;
      state.singleGameSchedule.error = null;
    });
    builder.addCase(singleGameSchedule.rejected, (state, action) => {
      state.singleGameSchedule.isLoading = false;
      state.singleGameSchedule.data = {};
      state.singleGameSchedule.error = action.payload;
    });
    // singleTrainingSchedule
    builder.addCase(singleTrainingSchedule.pending, (state) => {
      state.singleTrainingSchedule.isLoading = true;
    });
    builder.addCase(singleTrainingSchedule.fulfilled, (state, action) => {
      state.singleTrainingSchedule.isLoading = false;
      state.singleTrainingSchedule.data = action.payload;
      state.singleTrainingSchedule.error = null;
    });
    builder.addCase(singleTrainingSchedule.rejected, (state, action) => {
      state.singleTrainingSchedule.isLoading = false;
      state.singleTrainingSchedule.data = {};
      state.singleTrainingSchedule.error = action.payload;
    });
    // getAllRSVPForSeasonalGame
    builder.addCase(getAllRSVPForSeasonalGame.pending, (state) => {
      state.getAllRSVPForSeasonalGame.isLoading = true;
    });
    builder.addCase(getAllRSVPForSeasonalGame.fulfilled, (state, action) => {
      state.getAllRSVPForSeasonalGame.isLoading = false;
      state.getAllRSVPForSeasonalGame.data = action.payload;
      state.getAllRSVPForSeasonalGame.error = null;
    });
    builder.addCase(getAllRSVPForSeasonalGame.rejected, (state, action) => {
      state.getAllRSVPForSeasonalGame.isLoading = false;
      state.getAllRSVPForSeasonalGame.data = {};
      state.getAllRSVPForSeasonalGame.error = action.payload;
    });
    // getAllRSVPForSeasonalGameForUser
    builder.addCase(getAllRSVPForSeasonalGameForUser.pending, (state) => {
      state.getAllRSVPForSeasonalGameForUser.isLoading = true;
    });
    builder.addCase(
      getAllRSVPForSeasonalGameForUser.fulfilled,
      (state, action) => {
        state.getAllRSVPForSeasonalGameForUser.isLoading = false;
        state.getAllRSVPForSeasonalGameForUser.data = action.payload;
        state.getAllRSVPForSeasonalGameForUser.error = null;
      }
    );
    builder.addCase(
      getAllRSVPForSeasonalGameForUser.rejected,
      (state, action) => {
        state.getAllRSVPForSeasonalGameForUser.isLoading = false;
        state.getAllRSVPForSeasonalGameForUser.data = {};
        state.getAllRSVPForSeasonalGameForUser.error = action.payload;
      }
    );
    // getAllRSVPForSpecialEvents
    builder.addCase(getAllRSVPForSpecialEvents.pending, (state) => {
      state.getAllRSVPForSpecialEvents.isLoading = true;
    });
    builder.addCase(getAllRSVPForSpecialEvents.fulfilled, (state, action) => {
      state.getAllRSVPForSpecialEvents.isLoading = false;
      state.getAllRSVPForSpecialEvents.data = action.payload;
      state.getAllRSVPForSpecialEvents.error = null;
    });
    builder.addCase(getAllRSVPForSpecialEvents.rejected, (state, action) => {
      state.getAllRSVPForSpecialEvents.isLoading = false;
      state.getAllRSVPForSpecialEvents.data = {};
      state.getAllRSVPForSpecialEvents.error = action.payload;
    });
    // getAllRSVPForSpecialEventsForUser
    builder.addCase(getAllRSVPForSpecialEventsForUser.pending, (state) => {
      state.getAllRSVPForSpecialEventsForUser.isLoading = true;
    });
    builder.addCase(
      getAllRSVPForSpecialEventsForUser.fulfilled,
      (state, action) => {
        state.getAllRSVPForSpecialEventsForUser.isLoading = false;
        state.getAllRSVPForSpecialEventsForUser.data = action.payload;
        state.getAllRSVPForSpecialEventsForUser.error = null;
      }
    );
    builder.addCase(
      getAllRSVPForSpecialEventsForUser.rejected,
      (state, action) => {
        state.getAllRSVPForSpecialEventsForUser.isLoading = false;
        state.getAllRSVPForSpecialEventsForUser.data = {};
        state.getAllRSVPForSpecialEventsForUser.error = action.payload;
      }
    );
    // playerListForSeasonalGameInGuardian
    builder.addCase(playerListForSeasonalGameInGuardian.pending, (state) => {
      state.playerListForSeasonalGameInGuardian.isLoading = true;
    });
    builder.addCase(
      playerListForSeasonalGameInGuardian.fulfilled,
      (state, action) => {
        state.playerListForSeasonalGameInGuardian.isLoading = false;
        state.playerListForSeasonalGameInGuardian.data = action.payload;
        state.playerListForSeasonalGameInGuardian.error = null;
      }
    );
    builder.addCase(
      playerListForSeasonalGameInGuardian.rejected,
      (state, action) => {
        state.playerListForSeasonalGameInGuardian.isLoading = false;
        state.playerListForSeasonalGameInGuardian.data = {};
        state.playerListForSeasonalGameInGuardian.error = action.payload;
      }
    );
    // allGameScheduleForUserInAdmin
    builder.addCase(allGameScheduleForUserInAdmin.pending, (state) => {
      state.allGameScheduleForUserInAdmin.isLoading = true;
    });
    builder.addCase(
      allGameScheduleForUserInAdmin.fulfilled,
      (state, action) => {
        state.allGameScheduleForUserInAdmin.isLoading = false;
        state.allGameScheduleForUserInAdmin.data = action.payload;
        state.allGameScheduleForUserInAdmin.error = null;
      }
    );
    builder.addCase(allGameScheduleForUserInAdmin.rejected, (state, action) => {
      state.allGameScheduleForUserInAdmin.isLoading = false;
      state.allGameScheduleForUserInAdmin.data = {};
      state.allGameScheduleForUserInAdmin.error = action.payload;
    });
    // allSeasonalGameInvoices
    builder.addCase(allSeasonalGameInvoices.pending, (state) => {
      state.allSeasonalGameInvoices.isLoading = true;
    });
    builder.addCase(allSeasonalGameInvoices.fulfilled, (state, action) => {
      state.allSeasonalGameInvoices.isLoading = false;
      state.allSeasonalGameInvoices.data = action.payload;
      state.allSeasonalGameInvoices.error = null;
    });
    builder.addCase(allSeasonalGameInvoices.rejected, (state, action) => {
      state.allSeasonalGameInvoices.isLoading = false;
      state.allSeasonalGameInvoices.data = {};
      state.allSeasonalGameInvoices.error = action.payload;
    });
    // singleSeasonalGameInvoices
    builder.addCase(singleSeasonalGameInvoices.pending, (state) => {
      state.singleSeasonalGameInvoices.isLoading = true;
    });
    builder.addCase(singleSeasonalGameInvoices.fulfilled, (state, action) => {
      state.singleSeasonalGameInvoices.isLoading = false;
      state.singleSeasonalGameInvoices.data = action.payload;
      state.singleSeasonalGameInvoices.error = null;
    });
    builder.addCase(singleSeasonalGameInvoices.rejected, (state, action) => {
      state.singleSeasonalGameInvoices.isLoading = false;
      state.singleSeasonalGameInvoices.data = {};
      state.singleSeasonalGameInvoices.error = action.payload;
    });
    // allPaymentSettings
    builder.addCase(allPaymentSettings.pending, (state) => {
      state.allPaymentSettings.isLoading = true;
    });
    builder.addCase(allPaymentSettings.fulfilled, (state, action) => {
      state.allPaymentSettings.isLoading = false;
      state.allPaymentSettings.data = action.payload;
      state.allPaymentSettings.error = null;
    });
    builder.addCase(allPaymentSettings.rejected, (state, action) => {
      state.allPaymentSettings.isLoading = false;
      state.allPaymentSettings.data = {};
      state.allPaymentSettings.error = action.payload;
    });
    // adminInfo
    builder.addCase(adminInfo.pending, (state) => {
      state.adminInfo.isLoading = true;
    });
    builder.addCase(adminInfo.fulfilled, (state, action) => {
      state.adminInfo.isLoading = false;
      state.adminInfo.data = action.payload;
      state.adminInfo.error = null;
    });
    builder.addCase(adminInfo.rejected, (state, action) => {
      state.adminInfo.isLoading = false;
      state.adminInfo.data = {};
      state.adminInfo.error = action.payload;
    });
    // allPlayerRegistrationInvoice
    builder.addCase(allPlayerRegistrationInvoice.pending, (state) => {
      state.allPlayerRegistrationInvoice.isLoading = true;
    });
    builder.addCase(allPlayerRegistrationInvoice.fulfilled, (state, action) => {
      state.allPlayerRegistrationInvoice.isLoading = false;
      state.allPlayerRegistrationInvoice.data = action.payload;
      state.allPlayerRegistrationInvoice.error = null;
    });
    builder.addCase(allPlayerRegistrationInvoice.rejected, (state, action) => {
      state.allPlayerRegistrationInvoice.isLoading = false;
      state.allPlayerRegistrationInvoice.data = {};
      state.allPlayerRegistrationInvoice.error = action.payload;
    });
    // singleSeasonalGameInvoiceById
    builder.addCase(singleSeasonalGameInvoiceById.pending, (state) => {
      state.singleSeasonalGameInvoiceById.isLoading = true;
    });
    builder.addCase(
      singleSeasonalGameInvoiceById.fulfilled,
      (state, action) => {
        state.singleSeasonalGameInvoiceById.isLoading = false;
        state.singleSeasonalGameInvoiceById.data = action.payload;
        state.singleSeasonalGameInvoiceById.error = null;
      }
    );
    builder.addCase(singleSeasonalGameInvoiceById.rejected, (state, action) => {
      state.singleSeasonalGameInvoiceById.isLoading = false;
      state.singleSeasonalGameInvoiceById.data = {};
      state.singleSeasonalGameInvoiceById.error = action.payload;
    });
    // singleTeamProfileCommon
    builder.addCase(singleTeamProfileCommon.pending, (state) => {
      state.singleTeamProfileCommon.isLoading = true;
    });
    builder.addCase(singleTeamProfileCommon.fulfilled, (state, action) => {
      state.singleTeamProfileCommon.isLoading = false;
      state.singleTeamProfileCommon.data = action.payload;
      state.singleTeamProfileCommon.error = null;
    });
    builder.addCase(singleTeamProfileCommon.rejected, (state, action) => {
      state.singleTeamProfileCommon.isLoading = false;
      state.singleTeamProfileCommon.data = {};
      state.singleTeamProfileCommon.error = action.payload;
    });
    //
    // addEventSchedule
    builder.addCase(addEventSchedule.pending, (state) => {
      state.addEventSchedule.isLoading = true;
    });
    builder.addCase(addEventSchedule.fulfilled, (state, action) => {
      state.addEventSchedule.isLoading = false;
      state.addEventSchedule.data = action.payload;
      state.addEventSchedule.error = null;
    });
    builder.addCase(addEventSchedule.rejected, (state, action) => {
      state.addEventSchedule.isLoading = false;
      state.addEventSchedule.data = {};
      state.addEventSchedule.error = action.payload;
    });
    //
    // updateEventSchedule
    builder.addCase(updateEventSchedule.pending, (state) => {
      state.updateEventSchedule.isLoading = true;
    });
    builder.addCase(updateEventSchedule.fulfilled, (state, action) => {
      state.updateEventSchedule.isLoading = false;
      state.updateEventSchedule.data = action.payload;
      state.updateEventSchedule.error = null;
    });
    builder.addCase(updateEventSchedule.rejected, (state, action) => {
      state.updateEventSchedule.isLoading = false;
      state.updateEventSchedule.data = {};
      state.updateEventSchedule.error = action.payload;
    });
    //
    // deleteEventSchedule
    builder.addCase(deleteEventSchedule.pending, (state) => {
      state.deleteEventSchedule.isLoading = true;
    });
    builder.addCase(deleteEventSchedule.fulfilled, (state, action) => {
      state.deleteEventSchedule.isLoading = false;
      state.deleteEventSchedule.data = action.payload;
      state.deleteEventSchedule.error = null;
    });
    builder.addCase(deleteEventSchedule.rejected, (state, action) => {
      state.deleteEventSchedule.isLoading = false;
      state.deleteEventSchedule.data = {};
      state.deleteEventSchedule.error = action.payload;
    });
    //
    // getAdminStripeSandboxMode
    builder.addCase(getAdminStripeSandboxMode.pending, (state) => {
      state.getAdminStripeSandboxMode.isLoading = true;
    });
    builder.addCase(getAdminStripeSandboxMode.fulfilled, (state, action) => {
      state.getAdminStripeSandboxMode.isLoading = false;
      state.getAdminStripeSandboxMode.data = action.payload;
      state.getAdminStripeSandboxMode.error = null;
    });
    builder.addCase(getAdminStripeSandboxMode.rejected, (state, action) => {
      state.getAdminStripeSandboxMode.isLoading = false;
      state.getAdminStripeSandboxMode.data = {};
      state.getAdminStripeSandboxMode.error = action.payload;
    });
    // sslCommerzeInit
    builder.addCase(sslCommerzeInit.pending, (state) => {
      state.sslCommerzeInit.isLoading = true;
    });
    builder.addCase(sslCommerzeInit.fulfilled, (state, action) => {
      state.sslCommerzeInit.isLoading = false;
      state.sslCommerzeInit.data = action.payload;
      state.sslCommerzeInit.error = null;
    });
    builder.addCase(sslCommerzeInit.rejected, (state, action) => {
      state.sslCommerzeInit.isLoading = false;
      state.sslCommerzeInit.data = {};
      state.sslCommerzeInit.error = action.payload;
    });
    // sslCommerzeForCommonInit
    builder.addCase(sslCommerzeForCommonInit.pending, (state) => {
      state.sslCommerzeForCommonInit.isLoading = true;
    });
    builder.addCase(sslCommerzeForCommonInit.fulfilled, (state, action) => {
      state.sslCommerzeForCommonInit.isLoading = false;
      state.sslCommerzeForCommonInit.data = action.payload;
      state.sslCommerzeForCommonInit.error = null;
    });
    builder.addCase(sslCommerzeForCommonInit.rejected, (state, action) => {
      state.sslCommerzeForCommonInit.isLoading = false;
      state.sslCommerzeForCommonInit.data = {};
      state.sslCommerzeForCommonInit.error = action.payload;
    });
    // allEarningManagementCommon
    builder.addCase(allEarningManagementCommon.pending, (state) => {
      state.allEarningManagementCommon.isLoading = true;
    });
    builder.addCase(allEarningManagementCommon.fulfilled, (state, action) => {
      state.allEarningManagementCommon.isLoading = false;
      state.allEarningManagementCommon.data = action.payload;
      state.allEarningManagementCommon.error = null;
    });
    builder.addCase(allEarningManagementCommon.rejected, (state, action) => {
      state.allEarningManagementCommon.isLoading = false;
      state.allEarningManagementCommon.data = {};
      state.allEarningManagementCommon.error = action.payload;
    });
    //
  },
});

export const {
  emptyProfileSettingsForCommon,
  emptyChangeEmailForCommon,
  emptyChangePasswordForCommon,
  addSelectPlayers,
  emptyAddSelectPlayers,
  addSeasonalGameId,
} = commonApiSlice.actions;

export default commonApiSlice.reducer;
