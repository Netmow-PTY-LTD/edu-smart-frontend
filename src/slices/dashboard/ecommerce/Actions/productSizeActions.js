import { productSizeServices } from '@/slices/services/dashboard/ecommerce/productSizeServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addProductSize = createAsyncThunk(
  'Ecommerce/addProductSize',
  async (data, thunkApi) => {
    try {
      return await productSizeServices.addProductSizeService(data);
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
export const allProductSize = createAsyncThunk(
  'Ecommerce/allProductSize',
  async (data, thunkApi) => {
    try {
      return await productSizeServices.allProductSizeService(data);
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
export const editProductSize = createAsyncThunk(
  'Ecommerce/editProductSize',
  async (data, thunkApi) => {
    try {
      return await productSizeServices.editProductSizeService(data);
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
export const deleteProductSize = createAsyncThunk(
  'Ecommerce/deleteProductSize',
  async (data, thunkApi) => {
    try {
      return await productSizeServices.deleteProductSizeService(data);
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
