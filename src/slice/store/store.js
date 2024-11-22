import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authService } from '../services/authService';
import LayoutReducer from '../services/dashboardSidebarService';
import { departmentService } from '../services/departmentService';
import { universityService } from '../services/universityService';

export const store = configureStore({
  reducer: {
    // function reducers here
    Layout: LayoutReducer,

    // api reducers here
    [authService.reducerPath]: authService.reducer,
    [universityService.reducerPath]: universityService.reducer,
    [departmentService.reducerPath]: departmentService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authService.middleware)
      .concat(universityService.middleware)
      .concat(departmentService.middleware),
});

setupListeners(store.dispatch);
