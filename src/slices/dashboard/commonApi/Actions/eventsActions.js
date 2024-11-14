import { eventsForCommonServices } from '@/slices/services/dashboard/commonApi/eventsServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const allSeasonalGameForCommon = createAsyncThunk(
  'CommonApi/allSeasonalGameForCommon',
  async (thunkApi) => {
    try {
      return await eventsForCommonServices.allSeasonalGameForCommonService();
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

export const allWeeklyTrainingScheduleForCommon = createAsyncThunk(
  'CommonApi/allWeeklyTrainingScheduleForCommon',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.allWeeklyTrainingScheduleForCommonService(
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

export const allCustomTrainingScheduleForCommon = createAsyncThunk(
  'CommonApi/allCustomTrainingScheduleForCommon',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.allCustomTrainingScheduleForCommonService(
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

export const allGameScheduleForCommon = createAsyncThunk(
  'CommonApi/allGameScheduleForCommon',
  async (thunkApi) => {
    try {
      return await eventsForCommonServices.allGameScheduleForCommonService();
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
export const allGameScheduleForUserInAdmin = createAsyncThunk(
  'CommonApi/allGameScheduleForUserInAdmin',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.allGameScheduleForUserInAdminService(
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
export const allGameScheduleForTeamCommon = createAsyncThunk(
  'CommonApi/allGameScheduleForTeamCommon',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.allGameScheduleForTeamCommonService(
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
export const allCustomTrainingScheduleForTeamCommon = createAsyncThunk(
  'CommonApi/allCustomTrainingScheduleForTeamCommon',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.allCustomTrainingScheduleForTeamCommonService(
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
export const allWeeklyTrainingScheduleForTeamCommon = createAsyncThunk(
  'CommonApi/allWeeklyTrainingScheduleForTeamCommon',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.allWeeklyTrainingScheduleForTeamCommonService(
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
export const allSeasonalGameForTeamCommon = createAsyncThunk(
  'CommonApi/allSeasonalGameForTeamCommon',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.allSeasonalGameForTeamCommonService(
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
export const allEventsForTeamCommon = createAsyncThunk(
  'CommonApi/allEventsForTeamCommon',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.allEventsForTeamCommonService(id);
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
export const allEventsForCommon = createAsyncThunk(
  'CommonApi/allEventsForCommon',
  async (thunkApi) => {
    try {
      return await eventsForCommonServices.allEventsForCommonService();
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
export const singleEventsForCommon = createAsyncThunk(
  'CommonApi/singleEventsForCommon',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.singleEventsForCommonService(id);
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
export const allEventsActivity = createAsyncThunk(
  'CommonApi/allEventsActivity',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.allEventsActivityService(id);
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
export const singleEventsActivity = createAsyncThunk(
  'CommonApi/singleEventsActivity',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.singleEventsActivityService(id);
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
export const singleGameSchedule = createAsyncThunk(
  'CommonApi/singleGameSchedule',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.singleGameScheduleService(id);
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
export const singleTrainingSchedule = createAsyncThunk(
  'CommonApi/singleTrainingSchedule',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.singleTrainingScheduleService(id);
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
export const getAllRSVPForSeasonalGame = createAsyncThunk(
  'CommonApi/getAllRSVPForSeasonalGame',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.getAllRSVPForSeasonalGameService(id);
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
export const getAllRSVPForSeasonalGameForUser = createAsyncThunk(
  'CommonApi/getAllRSVPForSeasonalGameForUser',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.getAllRSVPForSeasonalGameForUserService(
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
export const getAllRSVPForSpecialEvents = createAsyncThunk(
  'CommonApi/getAllRSVPForSpecialEvents',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.getAllRSVPForSpecialEventsService(
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
export const getAllRSVPForSpecialEventsForUser = createAsyncThunk(
  'CommonApi/getAllRSVPForSpecialEventsForUser',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.getAllRSVPForSpecialEventsForUserService(
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
export const playerListForSeasonalGameInGuardian = createAsyncThunk(
  'CommonApi/playerListForSeasonalGameInGuardian',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.playerListForSeasonalGameInGuardianServices(
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
export const singleTeamProfileCommon = createAsyncThunk(
  'CommonApi/singleTeamProfileCommon',
  async (id, thunkApi) => {
    try {
      return await eventsForCommonServices.singleTeamProfileCommonServices(id);
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
