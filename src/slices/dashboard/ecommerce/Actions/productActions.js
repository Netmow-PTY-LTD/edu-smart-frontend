import { ecommerceProductServices } from '@/slices/services/dashboard/ecommerce/productServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addEcommerceProduct = createAsyncThunk(
  'Ecommerce/addEcommerceProduct',
  async (data, thunkApi) => {
    try {
      return await ecommerceProductServices.addEcommerceProductService(data);
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
export const allEcommerceProduct = createAsyncThunk(
  'Ecommerce/allEcommerceProduct',
  async (thunkApi) => {
    try {
      return await ecommerceProductServices.allEcommerceProductService();
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
export const editEcommerceProduct = createAsyncThunk(
  'Ecommerce/editEcommerceProduct',
  async (data, thunkApi) => {
    try {
      return await ecommerceProductServices.editEcommerceProductService(data);
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
export const deleteEcommerceProduct = createAsyncThunk(
  'Ecommerce/deleteEcommerceProduct',
  async (data, thunkApi) => {
    try {
      return await ecommerceProductServices.deleteEcommerceProductService(data);
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
export const allOrderLists = createAsyncThunk(
  'Ecommerce/allOrderLists',
  async (thunkApi) => {
    try {
      return await ecommerceProductServices.allOrderListsService();
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
export const deleteOrderLists = createAsyncThunk(
  'Ecommerce/deleteOrderLists',
  async (id, thunkApi) => {
    try {
      return await ecommerceProductServices.deleteOrderListsService(id);
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
export const getEcommerceOrder = createAsyncThunk(
  'Ecommerce/getEcommerceOrder',
  async (thunkApi) => {
    try {
      return await ecommerceProductServices.getEcommerceOrderService();
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
export const updateEcommerceOrder = createAsyncThunk(
  'Ecommerce/updateEcommerceOrder',
  async (data, thunkApi) => {
    try {
      return await ecommerceProductServices.updateEcommerceOrderService(data);
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
