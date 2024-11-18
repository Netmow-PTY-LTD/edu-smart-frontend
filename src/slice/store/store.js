import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authService } from '../services/authService';
import LayoutReducer from '../services/dashboardSidebarService';

export const store = configureStore({
  reducer: {
    // function reducers here
    Layout: LayoutReducer,

    // api reducers here
    [authService.reducerPath]: authService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authService.middleware]),
  // devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
});

setupListeners(store.dispatch);
