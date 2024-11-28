import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authService } from '../services/authService';

import { userInfoService } from '../services/common/userInfoService';
import { courseCategoriesService } from '../services/courseCategoriesService';
import { courseService } from '../services/courseService';
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
    [courseCategoriesService.reducerPath]: courseCategoriesService.reducer,
    [courseService.reducerPath]: courseService.reducer,
    [userInfoService.reducerPath]: userInfoService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authService.middleware)
      .concat(universityService.middleware)
      .concat(departmentService.middleware)
      .concat(courseCategoriesService.middleware)
      .concat(courseService.middleware)
      .concat(userInfoService.middleware),
});

setupListeners(store.dispatch);
