import { newsServices } from '@/slices/services/dashboard/superAdminDashboard/newsServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Add guardian thunk action
export const addCategory = createAsyncThunk(
  'SuperAdminDashboard/addCategory',
  async (data, thunkApi) => {
    try {
      return await newsServices.AddCategoryService(data)
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
export const editCategory = createAsyncThunk(
  'SuperAdminDashboard/editCategory',
  async (data, thunkApi) => {
    try {
      return await newsServices.editCategoryService(data)
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

export const getAllCategories = createAsyncThunk(
  'SuperAdminDashboard/getAllCategories',
  async (data, thunkApi) => {
    try {
      return await newsServices.getAllCategoriesService();
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

export const addNews = createAsyncThunk(
  'SuperAdminDashboard/addNews',
  async (data, thunkApi) => {
    try {
      return await newsServices.AddNewsService(data)
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

export const getAllNews = createAsyncThunk(
  'SuperAdminDashboard/getAllNews',
  async (data, thunkApi) => {
    try {
      return await newsServices.getAllNewsService()
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

export const getSingleNews = createAsyncThunk(
  'SuperAdminDashboard/getSingleNews',
  async (id, thunkApi) => {
    try {
      return await newsServices.getSingleNews(id);
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

export const updateNews = createAsyncThunk(
  'SuperAdminDashboard/updateNews',
  async (data, thunkApi) => {
    try {
      return await newsServices.updateNewsService(data);
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

export const deleteNews = createAsyncThunk(
  'SuperAdminDashboard/deleteNews',
  async (id, thunkApi) => {
    try {
      return await newsServices.deleteNewsService(id);
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