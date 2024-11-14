import { shopServices } from '@/slices/services/dashboard/ecommerce/shopServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addShopCategory = createAsyncThunk(
  'Ecommerce/addShopCategory',
  async (data, thunkApi) => {
    try {
      return await shopServices.addShopCategoryService(data);
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
export const allShopCategory = createAsyncThunk(
  'Ecommerce/allShopCategory',
  async (data, thunkApi) => {
    try {
      return await shopServices.allShopCategoryService(data);
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
export const editShopCategory = createAsyncThunk(
  'Ecommerce/editShopCategory',
  async (data, thunkApi) => {
    try {
      return await shopServices.editShopCategoryService(data);
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
export const deleteShopCategory = createAsyncThunk(
  'Ecommerce/deleteShopCategory',
  async (data, thunkApi) => {
    try {
      return await shopServices.deleteShopCategoryService(data);
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
