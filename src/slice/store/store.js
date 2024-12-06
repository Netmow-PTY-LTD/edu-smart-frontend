import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authService } from '../services/public/auth/authService';
import { userInfoService } from '../services/common/userInfoService';
import { publicAgentService } from '../services/public/agent/publicAgentService';
import { courseCategoriesService } from '../services/super admin/courseCategoriesService';
import { courseService } from '../services/super admin/courseService';
import LayoutReducer from '../services/super admin/dashboardSidebarService';
import { departmentService } from '../services/super admin/departmentService';
import { universityService } from '../services/super admin/universityService';
import { publicUniversityService } from '../services/public/university/publicUniveristyService';

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
    [publicAgentService.reducerPath]: publicAgentService.reducer,
    [publicUniversityService.reducerPath]: publicUniversityService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authService.middleware)
      .concat(universityService.middleware)
      .concat(departmentService.middleware)
      .concat(courseCategoriesService.middleware)
      .concat(courseService.middleware)
      .concat(userInfoService.middleware)
      .concat(publicAgentService.middleware)
      .concat(publicUniversityService.middleware),
});

setupListeners(store.dispatch);
