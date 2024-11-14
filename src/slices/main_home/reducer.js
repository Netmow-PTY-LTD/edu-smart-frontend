import { createSlice } from '@reduxjs/toolkit';
import {
  getAllSportsAction,
  getFeatureBySlugAction,
  getSportBySlugAction,
  mainHomeAction,
  menuAction,
  pricingAction,
} from '@/slices/main_home/action/mainHomeAction';

const initialState = {
  menuSperAdmin: {
    data: {},
    isLoading: false,
    error: null,
  },
  homedata: {
    data: {},
    isLoading: false,
    error: null,
  },
  feature: {
    data: {},
    isLoading: false,
    error: null,
  },
  sports: {
    data: [],
    isLoading: false,
    error: null,
  },
  sport: {
    data: {},
    isLoading: false,
    error: null,
  },
  pricing: {
    data: {},
    isLoading: false,
    error: null,
  },
};
export const mainHomeSlice = createSlice({
  name: 'mainHome',
  initialState,
  reducers: {
    emptyMainHome: () => initialState,
  },
  extraReducers: (builder) => {
    // menu
    builder.addCase(menuAction.pending, (state) => {
      state.menuSperAdmin.isLoading = true;
      state.menuSperAdmin.error = null;
    });
    builder.addCase(menuAction.fulfilled, (state, action) => {
      state.menuSperAdmin.data = action.payload;
      state.menuSperAdmin.isLoading = false;
      state.menuSperAdmin.error = null;
    });
    builder.addCase(menuAction.rejected, (state, action) => {
      state.menuSperAdmin.isLoading = false;
      state.menuSperAdmin.error = action.payload;
    });

    // home page
    builder.addCase(mainHomeAction.pending, (state) => {
      state.homedata.isLoading = true;
      state.homedata.error = null;
    });
    builder.addCase(mainHomeAction.fulfilled, (state, action) => {
      state.homedata.data = action.payload;
      state.homedata.isLoading = false;
      state.homedata.error = null;
    });
    builder.addCase(mainHomeAction.rejected, (state, action) => {
      state.homedata.isLoading = false;
      state.homedata.error = action.payload;
    });

    // single feature
    builder.addCase(getFeatureBySlugAction.pending, (state) => {
      state.feature.isLoading = true;
      state.feature.error = null;
    });
    builder.addCase(getFeatureBySlugAction.fulfilled, (state, action) => {
      state.feature.data = action.payload;
      state.feature.isLoading = false;
      state.feature.error = null;
    });
    builder.addCase(getFeatureBySlugAction.rejected, (state, action) => {
      state.feature.isLoading = false;
      state.feature.error = action.payload;
    });

    // all sports
    builder.addCase(getAllSportsAction.pending, (state) => {
      state.sports.isLoading = true;
      state.sports.error = null;
    });
    builder.addCase(getAllSportsAction.fulfilled, (state, action) => {
      state.sports.data = action.payload;
      state.sports.isLoading = false;
      state.sports.error = null;
    });
    builder.addCase(getAllSportsAction.rejected, (state, action) => {
      state.sports.isLoading = false;
      state.sports.error = action.payload;
    });

    // single sport
    builder.addCase(getSportBySlugAction.pending, (state) => {
      state.sport.isLoading = true;
      state.sport.error = null;
    });
    builder.addCase(getSportBySlugAction.fulfilled, (state, action) => {
      state.sport.data = action.payload;
      state.sport.isLoading = false;
      state.sport.error = null;
    });
    builder.addCase(getSportBySlugAction.rejected, (state, action) => {
      state.sport.isLoading = false;
      state.sport.error = action.payload;
    });

    // pricing
    builder.addCase(pricingAction.pending, (state) => {
      state.pricing.isLoading = true;
      state.pricing.error = null;
    });
    builder.addCase(pricingAction.fulfilled, (state, action) => {
      state.pricing.data = action.payload;
      state.pricing.isLoading = false;
      state.pricing.error = null;
    });
    builder.addCase(pricingAction.rejected, (state, action) => {
      state.pricing.isLoading = false;
      state.pricing.error = action.payload;
    });
  },
});

export const { emptyMainHome } = mainHomeSlice.actions;
export default mainHomeSlice.reducer;
