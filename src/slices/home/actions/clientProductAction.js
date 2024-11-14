import { ecommerceProductsServices } from '@/slices/services/home/clientProductsServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const allEcommerceProducts = createAsyncThunk(
  'Home/allEcommerceProducts',
  async (subdomain, thunkApi) => {
    try {
      return await ecommerceProductsServices.allEcommerceProductsService(
        subdomain
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

export const allEcommerceProductCategories = createAsyncThunk(
  'Home/allEcommerceProductCategories',
  async (subdomain, thunkApi) => {
    try {
      return await ecommerceProductsServices.allEcommerceProductCategoriesService(
        subdomain
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

export const getProductBySlugAction = createAsyncThunk(
  'Home/singleProduct',
  async ({ slug, subdomain }, thunkApi) => {
    try {
      return await ecommerceProductsServices.getProductBySlugService({
        slug,
        subdomain,
      });
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

export const addToCartAction = createAsyncThunk(
  'Home/addToCartAction',
  async (data, thunkApi) => {
    try {
      return await ecommerceProductsServices.addToCartService(data);
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

export const getAllCartItemsAction = createAsyncThunk(
  'Home/getAllCartItems',
  async (thunkApi) => {
    try {
      return await ecommerceProductsServices.getAllCartItemsService();
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

export const updateCartItemAction = createAsyncThunk(
  'Home/updateCartItem',
  async (data, thunkApi) => {
    try {
      return await ecommerceProductsServices.updateCartItemService(data);
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

export const deleteCartItemAction = createAsyncThunk(
  'Home/deleteCartItem',
  async (id, thunkApi) => {
    try {
      return await ecommerceProductsServices.deleteCartItemService(id);
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

export const createOrderAction = createAsyncThunk(
  'Home/createOrder',
  async (data, thunkApi) => {
    try {
      return await ecommerceProductsServices.createOrderService(data);
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

export const shoppingStripePaymentAction = createAsyncThunk(
  'Home/shoppingStripePayment',
  async (data, thunkApi) => {
    try {
      return await ecommerceProductsServices.shoppingStripePaymentService(data);
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
