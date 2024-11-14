import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllSportsService,
  getFeatureBySlugService,
  getSportBySlugService,
  mainHomeService,
  menuService,
  pricingService,
} from '@/slices/services/main_home/mainHomeService';

export const menuAction = createAsyncThunk(
  'MainHome/menuAction',
  async (thunkApi) => {
    try {
      return await menuService();
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

export const mainHomeAction = createAsyncThunk(
  'MainHome/mainHomeAction',
  async (thunkApi) => {
    try {
      return await mainHomeService();
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

export const getFeatureBySlugAction = createAsyncThunk(
  'MainHome/getFeatureBySlugAction',
  async (slug, thunkApi) => {
    try {
      return await getFeatureBySlugService(slug);
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

export const getAllSportsAction = createAsyncThunk(
  'MainHome/getAllSportsAction',
  async (thunkApi) => {
    try {
      return await getAllSportsService();
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

export const getSportBySlugAction = createAsyncThunk(
  'MainHome/getSportBySlugAction',
  async (slug, thunkApi) => {
    try {
      return await getSportBySlugService(slug);
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

export const pricingAction = createAsyncThunk(
  'MainHome/pricingAction',
  async (thunkApi) => {
    try {
      return await pricingService();
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
