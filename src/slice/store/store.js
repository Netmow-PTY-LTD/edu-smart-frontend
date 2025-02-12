import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { agentApplicationService } from '../services/agent/agentApplicationService';
import { agentEarningsService } from '../services/agent/agentEarningsService';
import { agentSettingsService } from '../services/agent/agentSettingsService';
import { studentDocRelatedServiceForAgent } from '../services/agent/studentDocRelatedServiceForAgent';
import { applicationService } from '../services/common/applicationService';
import { paymentService } from '../services/common/paymentService';
import { settingsService } from '../services/common/settingsService';
import { userInfoService } from '../services/common/userInfoService';

import { applicationServiceNew } from '../services/public/application/applicationServiceNew';
import { authService } from '../services/public/auth/authService';
import { publicPackageService } from '../services/public/package/publicPackageService';
import { publicStudentService } from '../services/public/student/publicStudentService';
import { publicUniversityService } from '../services/public/university/publicUniveristyService';
import { studentSubmitDocumentService } from '../services/student/studentSubmitDocumentService';
import { superAdminAgentService } from '../services/super admin/agentService';
import { couponService } from '../services/super admin/couponService';
import { courseCategoriesService } from '../services/super admin/courseCategoriesService';
import { courseService } from '../services/super admin/courseService';
import LayoutReducer from '../services/super admin/dashboardSidebarService';
import { departmentService } from '../services/super admin/departmentService';
import { hotOfferService } from '../services/super admin/hotOfferService';
import { packageService } from '../services/super admin/packageService';
import { paymentServices } from '../services/super admin/paymentServices';
import { requiredService } from '../services/super admin/requiredService';
import { superAdminSettingsService } from '../services/super admin/superAdminSettingsService';
import { universityService } from '../services/super admin/universityService';
import { universityAdministrationDescriptionService } from '../services/university-administration/api/universityAdministrationDescriptionService';
import { universityAdministrationFaqService } from '../services/university-administration/api/universityAdministrationFaqService';
import { universityAdministrationGalleryService } from '../services/university-administration/api/universityAdministrationGalleryService';
import { universityAdministrationSliderService } from '../services/university-administration/api/universityAdministrationSliderService';
import { universityAdministrationSocialLinkService } from '../services/university-administration/api/universityAdministrationSocialLinkService';
import { documentService } from '../services/super admin/documentService';
import { newsLetterSubscriptionPublic } from '../services/public/newsLetter/newsLetterSubscriptionPublic';
import { newsLetterSubscriptionSuperAdmin } from '../services/super admin/newsLetterSubscription';
import { contactUsService } from '../services/public/contact-us/contactUsService';
import { publicAgentService } from '../services/public/agent/publicAgentService';
import { paymentReportService } from '../services/common/paymentReportServices';
import { superAdminContactService } from '../services/super admin/contactUsService';
import { superAdminBlogServices } from '../services/super admin/superAdminBlogServices';
import { publicBlogServices } from '../services/public/blogs/publicBlogsServices';

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
    [publicStudentService.reducerPath]: publicStudentService.reducer,
    [publicUniversityService.reducerPath]: publicUniversityService.reducer,
    [studentDocRelatedServiceForAgent.reducerPath]:
      studentDocRelatedServiceForAgent.reducer,
    [studentSubmitDocumentService.reducerPath]:
      studentSubmitDocumentService.reducer,
    [universityAdministrationDescriptionService.reducerPath]:
      universityAdministrationDescriptionService.reducer,
    [universityAdministrationFaqService.reducerPath]:
      universityAdministrationFaqService.reducer,
    [universityAdministrationSocialLinkService.reducerPath]:
      universityAdministrationSocialLinkService.reducer,
    [universityAdministrationGalleryService.reducerPath]:
      universityAdministrationGalleryService.reducer,
    [universityAdministrationSliderService.reducerPath]:
      universityAdministrationSliderService.reducer,
    [agentSettingsService.reducerPath]: agentSettingsService.reducer,
    [settingsService.reducerPath]: settingsService.reducer,
    [superAdminSettingsService.reducerPath]: superAdminSettingsService.reducer,
    [superAdminAgentService.reducerPath]: superAdminAgentService.reducer,
    [agentEarningsService.reducerPath]: agentEarningsService.reducer,
    [paymentService.reducerPath]: paymentService.reducer,
    [paymentServices.reducerPath]: paymentServices.reducer,
    [packageService.reducerPath]: packageService.reducer,
    [publicPackageService.reducerPath]: publicPackageService.reducer,
    [hotOfferService.reducerPath]: hotOfferService.reducer,
    [applicationService.reducerPath]: applicationService.reducer,
    [agentApplicationService.reducerPath]: agentApplicationService.reducer,
    [couponService.reducerPath]: couponService.reducer,
    [documentService.reducerPath]: documentService.reducer,
    [contactUsService.reducerPath]: contactUsService.reducer,
    [requiredService.reducerPath]: requiredService.reducer,
    [applicationServiceNew.reducerPath]: applicationServiceNew.reducer,
    [paymentReportService.reducerPath]: paymentReportService.reducer,
    [superAdminContactService.reducerPath]: superAdminContactService.reducer,
    [superAdminBlogServices.reducerPath]: superAdminBlogServices.reducer,
    [publicBlogServices.reducerPath]: publicBlogServices.reducer,
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
      .concat(publicStudentService.middleware)
      .concat(publicUniversityService.middleware)
      .concat(universityAdministrationDescriptionService.middleware)
      .concat(universityAdministrationFaqService.middleware)
      .concat(universityAdministrationSocialLinkService.middleware)
      .concat(universityAdministrationGalleryService.middleware)
      .concat(studentSubmitDocumentService.middleware)
      .concat(studentDocRelatedServiceForAgent.middleware)
      .concat(universityAdministrationSliderService.middleware)
      .concat(agentSettingsService.middleware)
      .concat(settingsService.middleware)
      .concat(paymentServices.middleware)
      .concat(packageService.middleware)
      .concat(publicPackageService.middleware)
      .concat(hotOfferService.middleware)
      .concat(superAdminSettingsService.middleware)
      .concat(superAdminAgentService.middleware)
      .concat(agentEarningsService.middleware)
      .concat(paymentService.middleware)
      .concat(applicationService.middleware)
      .concat(couponService.middleware)
      .concat(agentApplicationService.middleware)
      .concat(documentService.middleware)
      .concat(newsLetterSubscriptionPublic.middleware)
      .concat(newsLetterSubscriptionSuperAdmin.middleware)
      .concat(contactUsService.middleware)
      .concat(requiredService.middleware)
      .concat(applicationServiceNew.middleware)
      .concat(agentApplicationService.middleware)
      .concat(paymentReportService.middleware)
      .concat(superAdminContactService.middleware)
      .concat(superAdminBlogServices.middleware)
      .concat(publicBlogServices.middleware),
});

setupListeners(store.dispatch);
