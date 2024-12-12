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
import { universityAdministrationDescriptionService } from '../services/university-administration/api/universityAdministrationDescriptionService';
import { universityAdministrationFaqService } from '../services/university-administration/api/universityAdministrationFaqService';
import { universityAdministrationSocialLinkService } from '../services/university-administration/api/universityAdministrationSocialLinkService';
import { universityAdministrationGalleryService } from '../services/university-administration/api/universityAdministrationGalleryService';

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
    [universityAdministrationDescriptionService.reducerPath]: universityAdministrationDescriptionService.reducer,
    [universityAdministrationFaqService.reducerPath]: universityAdministrationFaqService.reducer,
    [universityAdministrationSocialLinkService.reducerPath]: universityAdministrationSocialLinkService.reducer,
    [universityAdministrationGalleryService.reducerPath]: universityAdministrationGalleryService.reducer,
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
      .concat(publicUniversityService.middleware)
      .concat(universityAdministrationDescriptionService.middleware)
      .concat(universityAdministrationFaqService.middleware)
      .concat(universityAdministrationSocialLinkService.middleware)
      .concat(universityAdministrationGalleryService.middleware)
});

setupListeners(store.dispatch);
