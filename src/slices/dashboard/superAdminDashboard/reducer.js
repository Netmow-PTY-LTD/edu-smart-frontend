import {
  addClientsForSuperAdmin,
  allClientsForSuperAdmin,
  deleteClientsForSuperAdmin,
  updateClientsForSuperAdmin,
} from './superAdminActions/clientsActions';
import {
  addFeatureForSuperAdmin,
  allFeatureForSuperAdmin,
  deleteFeatureForSuperAdmin,
  updateFeatureForSuperAdmin,
} from './superAdminActions/featureActions';
import {
  addPackageForSuperAdmin,
  allPackageForSuperAdmin,
  deletePackageForSuperAdmin,
  singlePackageForSuperAdmin,
  updatePackageForSuperAdmin,
} from './superAdminActions/packagesActions';
import {
  allDemoClientsForSuperAdmin,
  allRegClientsForSuperAdmin,
  deleteDemoClientsForSuperAdmin,
} from './superAdminActions/registeredAndDemoClientsAction';
import {
  addCurrencyAndGstForSuperAdmin,
  allDomainPointingRequest,
  getAdminGstCurrencySdfee,
  getAllSystemSettingsForSuperAdmin,
  getCurrencyAndGstForSuperAdmin,
  getCurrencyAndGstFromAdminToSAdmin,
  getSuperAdminInfo,
  updateDomainPointingRequest,
  updateSystemSettingsForSuperAdmin,
} from './superAdminActions/settingsActions';
import {
  addGamesForSuperAdmin,
  allGamesForSuperAdmin,
  deleteGamesForSuperAdmin,
  updateGamesForSuperAdmin,
} from './superAdminActions/sportsActions';
import {
  addTestimonialForSuperAdmin,
  allTestimonialForSuperAdmin,
  deleteTestimonialForSuperAdmin,
  updateTestimonialForSuperAdmin,
} from './superAdminActions/testimonialActions';

import {
  allChargeManagement,
  deleteChargeManagement,
  updateChargeManagement,
} from './superAdminActions/chargeManagementActions';
import {
  allcontactMessageForSAdmin,
  deletecontactMessageForSAdmin,
} from './superAdminActions/contactMessageActions';
import {
  allPaidInvoiceForSuperAdmin,
  allPendingInvoiceForSuperAdmin,
} from './superAdminActions/invoicesActions';
import {
  addCategory,
  addNews,
  deleteNews,
  editCategory,
  getAllCategories,
  getAllNews,
  getSingleNews,
  updateNews,
} from './superAdminActions/newsActions';
import {
  seoMetaForSuperAdmin,
  updateSeoMetaForSuperAdmin,
} from './superAdminActions/seoMetaDataActions';
import { getAllSubscriber } from './superAdminActions/subscriberAction';

const { createSlice } = require('@reduxjs/toolkit');

const initialStates = {
  addPackageForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  allPackageForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  singlePackageForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  updatePackageForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  deletePackageForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  addClientsForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  allClientsForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  updateClientsForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  deleteClientsForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  addTestimonialForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  allTestimonialForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  updateTestimonialForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  deleteTestimonialForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  addCategory: {
    data: [],
    isLoading: false,
    error: null,
  },
  editCategory: {
    data: [],
    isLoading: false,
    error: null,
  },
  getAllCategories: {
    data: [],
    isLoading: false,
    error: null,
  },
  addNews: {
    data: [],
    isLoading: false,
    error: null,
  },
  getAllNews: {
    data: [],
    isLoading: false,
    error: null,
  },
  getSingleNews: {
    data: [],
    isLoading: false,
    error: null,
  },
  updateNews: {
    data: [],
    isLoading: false,
    error: null,
  },
  deleteNews: {
    data: [],
    isLoading: false,
    error: null,
  },
  allRegClientsForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  allDemoClientsForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  addFeatureForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  allFeatureForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  updateFeatureForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  deleteFeatureForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  addGamesForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  allGamesForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  updateGamesForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  deleteGamesForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  updateSystemSettingsForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  subscribers: {
    data: [],
    isLoading: false,
    error: null,
  },
  getSuperAdminInfo: {
    data: [],
    isLoading: false,
    error: null,
  },
  allPendingInvoiceForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  allPaidInvoiceForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  allcontactMessageForSAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  deletecontactMessageForSAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  deleteDemoClientsForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  seoMetaForSuperAdmin: {
    data: {},
    isLoading: false,
    error: null,
  },
  updateSeoMetaForSuperAdmin: {
    data: {},
    isLoading: false,
    error: null,
  },
  allDomainPointingRequest: {
    data: [],
    isLoading: false,
    error: null,
  },
  updateDomainPointingRequest: {
    data: [],
    isLoading: false,
    error: null,
  },
  getAllSystemSettingsForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  addCurrencyAndGstForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  getCurrencyAndGstForSuperAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  getCurrencyAndGstFromAdminToSAdmin: {
    data: [],
    isLoading: false,
    error: null,
  },
  // sd get all subsc
  getAllSubscriber: {
    data: [],
    isLoading: false,
    error: null,
  },
  updateChargeManagement: {
    data: [],
    isLoading: false,
    error: null,
  },
  allChargeManagement: {
    data: [],
    isLoading: false,
    error: null,
  },
  deleteChargeManagement: {
    data: [],
    isLoading: false,
    error: null,
  },
  getAdminGstCurrencySdfee: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const superAdminSlice = createSlice({
  name: 'SuperAdminDashboard',
  initialState: initialStates,
  reducers: {
    emptyAddPackageForSuperAdmin: (state) => {
      state.addPackageForSuperAdmin.data = {};
      state.addPackageForSuperAdmin.error = null;
    },
    emptyAddBlogForSuperAdmin: (state) => {
      state.addNews.data = {};
      state.addNews.error = null;
    },
    emptyAddClientsForSuperAdmin: (state) => {
      state.addClientsForSuperAdmin.data = {};
      state.addClientsForSuperAdmin.error = null;
    },
    emptyEditClientsForSuperAdmin: (state) => {
      state.updateClientsForSuperAdmin.data = {};
      state.updateClientsForSuperAdmin.error = null;
    },
    emptyAddTestimonialForSuperAdmin: (state) => {
      state.addTestimonialForSuperAdmin.data = {};
      state.addTestimonialForSuperAdmin.error = null;
    },
    emptyEditTestimonialForSuperAdmin: (state) => {
      state.updateTestimonialForSuperAdmin.data = {};
      state.updateTestimonialForSuperAdmin.error = null;
    },
    emptyAddFeatureForSuperAdmin: (state) => {
      state.addFeatureForSuperAdmin.data = {};
      state.addFeatureForSuperAdmin.error = null;
    },
    emptyAddGamesForSuperAdmin: (state) => {
      state.addGamesForSuperAdmin.data = {};
      state.addGamesForSuperAdmin.error = null;
    },
    emptyUpdateSystemSettingsForSuperAdmin: (state) => {
      state.updateSystemSettingsForSuperAdmin.data = {};
      state.updateSystemSettingsForSuperAdmin.error = null;
    },
  },

  extraReducers: (builder) => {
    // add package
    builder.addCase(addPackageForSuperAdmin.pending, (state) => {
      state.addPackageForSuperAdmin.isLoading = true;
    });
    builder.addCase(addPackageForSuperAdmin.fulfilled, (state, action) => {
      state.addPackageForSuperAdmin.isLoading = false;
      state.addPackageForSuperAdmin.data = action.payload;
      state.addPackageForSuperAdmin.error = null;
    });
    builder.addCase(addPackageForSuperAdmin.rejected, (state, action) => {
      state.addPackageForSuperAdmin.isLoading = false;
      state.addPackageForSuperAdmin.data = {};
      state.addPackageForSuperAdmin.error = action.payload;
    });
    // all package
    builder.addCase(allPackageForSuperAdmin.pending, (state) => {
      state.allPackageForSuperAdmin.isLoading = true;
    });
    builder.addCase(allPackageForSuperAdmin.fulfilled, (state, action) => {
      state.allPackageForSuperAdmin.isLoading = false;
      state.allPackageForSuperAdmin.data = action.payload;
      state.allPackageForSuperAdmin.error = null;
    });
    builder.addCase(allPackageForSuperAdmin.rejected, (state, action) => {
      state.allPackageForSuperAdmin.isLoading = false;
      state.allPackageForSuperAdmin.data = {};
      state.allPackageForSuperAdmin.error = action.payload;
    });
    // single package
    builder.addCase(singlePackageForSuperAdmin.pending, (state) => {
      state.singlePackageForSuperAdmin.isLoading = true;
    });
    builder.addCase(singlePackageForSuperAdmin.fulfilled, (state, action) => {
      state.singlePackageForSuperAdmin.isLoading = false;
      state.singlePackageForSuperAdmin.data = action.payload;
      state.singlePackageForSuperAdmin.error = null;
    });
    builder.addCase(singlePackageForSuperAdmin.rejected, (state, action) => {
      state.singlePackageForSuperAdmin.isLoading = false;
      state.singlePackageForSuperAdmin.data = {};
      state.singlePackageForSuperAdmin.error = action.payload;
    });
    // update package
    builder.addCase(updatePackageForSuperAdmin.pending, (state) => {
      state.updatePackageForSuperAdmin.isLoading = true;
    });
    builder.addCase(updatePackageForSuperAdmin.fulfilled, (state, action) => {
      state.updatePackageForSuperAdmin.isLoading = false;
      state.updatePackageForSuperAdmin.data = action.payload;
      state.updatePackageForSuperAdmin.error = null;
    });
    builder.addCase(updatePackageForSuperAdmin.rejected, (state, action) => {
      state.updatePackageForSuperAdmin.isLoading = false;
      state.updatePackageForSuperAdmin.data = {};
      state.updatePackageForSuperAdmin.error = action.payload;
    });
    // delete package
    builder.addCase(deletePackageForSuperAdmin.pending, (state) => {
      state.deletePackageForSuperAdmin.isLoading = true;
    });
    builder.addCase(deletePackageForSuperAdmin.fulfilled, (state, action) => {
      state.deletePackageForSuperAdmin.isLoading = false;
      state.deletePackageForSuperAdmin.data = action.payload;
      state.deletePackageForSuperAdmin.error = null;
    });
    builder.addCase(deletePackageForSuperAdmin.rejected, (state, action) => {
      state.deletePackageForSuperAdmin.isLoading = false;
      state.deletePackageForSuperAdmin.data = {};
      state.deletePackageForSuperAdmin.error = action.payload;
    });
    // add clients
    builder.addCase(addClientsForSuperAdmin.pending, (state) => {
      state.addClientsForSuperAdmin.isLoading = true;
    });
    builder.addCase(addClientsForSuperAdmin.fulfilled, (state, action) => {
      state.addClientsForSuperAdmin.isLoading = false;
      state.addClientsForSuperAdmin.data = action.payload;
      state.addClientsForSuperAdmin.error = null;
    });
    builder.addCase(addClientsForSuperAdmin.rejected, (state, action) => {
      state.addClientsForSuperAdmin.isLoading = false;
      state.addClientsForSuperAdmin.data = {};
      state.addClientsForSuperAdmin.error = action.payload;
    });
    // all clients
    builder.addCase(allClientsForSuperAdmin.pending, (state) => {
      state.allClientsForSuperAdmin.isLoading = true;
    });
    builder.addCase(allClientsForSuperAdmin.fulfilled, (state, action) => {
      state.allClientsForSuperAdmin.isLoading = false;
      state.allClientsForSuperAdmin.data = action.payload;
      state.allClientsForSuperAdmin.error = null;
    });
    builder.addCase(allClientsForSuperAdmin.rejected, (state, action) => {
      state.allClientsForSuperAdmin.isLoading = false;
      state.allClientsForSuperAdmin.data = {};
      state.allClientsForSuperAdmin.error = action.payload;
    });
    // update clients
    builder.addCase(updateClientsForSuperAdmin.pending, (state) => {
      state.updateClientsForSuperAdmin.isLoading = true;
    });
    builder.addCase(updateClientsForSuperAdmin.fulfilled, (state, action) => {
      state.updateClientsForSuperAdmin.isLoading = false;
      state.updateClientsForSuperAdmin.data = action.payload;
      state.updateClientsForSuperAdmin.error = null;
    });
    builder.addCase(updateClientsForSuperAdmin.rejected, (state, action) => {
      state.updateClientsForSuperAdmin.isLoading = false;
      state.updateClientsForSuperAdmin.data = {};
      state.updateClientsForSuperAdmin.error = action.payload;
    });
    // delete clients
    builder.addCase(deleteClientsForSuperAdmin.pending, (state) => {
      state.deleteClientsForSuperAdmin.isLoading = true;
    });
    builder.addCase(deleteClientsForSuperAdmin.fulfilled, (state, action) => {
      state.deleteClientsForSuperAdmin.isLoading = false;
      state.deleteClientsForSuperAdmin.data = action.payload;
      state.deleteClientsForSuperAdmin.error = null;
    });
    builder.addCase(deleteClientsForSuperAdmin.rejected, (state, action) => {
      state.deleteClientsForSuperAdmin.isLoading = false;
      state.deleteClientsForSuperAdmin.data = {};
      state.deleteClientsForSuperAdmin.error = action.payload;
    });
    // add testimonial
    builder.addCase(addTestimonialForSuperAdmin.pending, (state) => {
      state.addTestimonialForSuperAdmin.isLoading = true;
    });
    builder.addCase(addTestimonialForSuperAdmin.fulfilled, (state, action) => {
      state.addTestimonialForSuperAdmin.isLoading = false;
      state.addTestimonialForSuperAdmin.data = action.payload;
      state.addTestimonialForSuperAdmin.error = null;
    });
    builder.addCase(addTestimonialForSuperAdmin.rejected, (state, action) => {
      state.addTestimonialForSuperAdmin.isLoading = false;
      state.addTestimonialForSuperAdmin.data = {};
      state.addTestimonialForSuperAdmin.error = action.payload;
    });
    // all testimonial
    builder.addCase(allTestimonialForSuperAdmin.pending, (state) => {
      state.allTestimonialForSuperAdmin.isLoading = true;
    });
    builder.addCase(allTestimonialForSuperAdmin.fulfilled, (state, action) => {
      state.allTestimonialForSuperAdmin.isLoading = false;
      state.allTestimonialForSuperAdmin.data = action.payload;
      state.allTestimonialForSuperAdmin.error = null;
    });
    builder.addCase(allTestimonialForSuperAdmin.rejected, (state, action) => {
      state.allTestimonialForSuperAdmin.isLoading = false;
      state.allTestimonialForSuperAdmin.data = {};
      state.allTestimonialForSuperAdmin.error = action.payload;
    });
    // update testimonial
    builder.addCase(updateTestimonialForSuperAdmin.pending, (state) => {
      state.updateTestimonialForSuperAdmin.isLoading = true;
    });
    builder.addCase(
      updateTestimonialForSuperAdmin.fulfilled,
      (state, action) => {
        state.updateTestimonialForSuperAdmin.isLoading = false;
        state.updateTestimonialForSuperAdmin.data = action.payload;
        state.updateTestimonialForSuperAdmin.error = null;
      }
    );
    builder.addCase(
      updateTestimonialForSuperAdmin.rejected,
      (state, action) => {
        state.updateTestimonialForSuperAdmin.isLoading = false;
        state.updateTestimonialForSuperAdmin.data = {};
        state.updateTestimonialForSuperAdmin.error = action.payload;
      }
    );
    // delete testimonial
    builder.addCase(deleteTestimonialForSuperAdmin.pending, (state) => {
      state.deleteTestimonialForSuperAdmin.isLoading = true;
    });
    builder.addCase(
      deleteTestimonialForSuperAdmin.fulfilled,
      (state, action) => {
        state.deleteTestimonialForSuperAdmin.isLoading = false;
        state.deleteTestimonialForSuperAdmin.data = action.payload;
        state.deleteTestimonialForSuperAdmin.error = null;
      }
    );
    builder.addCase(
      deleteTestimonialForSuperAdmin.rejected,
      (state, action) => {
        state.deleteTestimonialForSuperAdmin.isLoading = false;
        state.deleteTestimonialForSuperAdmin.data = {};
        state.deleteTestimonialForSuperAdmin.error = action.payload;
      }
    );

    //Add category for Super Admin
    builder.addCase(addCategory.pending, (state) => {
      state.addCategory.isLoading = true;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.addCategory.isLoading = false;
      state.addCategory.data = action.payload;
      state.addCategory.error = null;
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.addCategory.isLoading = false;
      state.addCategory.data = {};
      state.addCategory.error = action.payload;
    });

    //Update category for Super Admin
    builder.addCase(editCategory.pending, (state) => {
      state.editCategory.isLoading = true;
    });
    builder.addCase(editCategory.fulfilled, (state, action) => {
      state.editCategory.isLoading = false;
      state.editCategory.data = action.payload;
      state.editCategory.error = null;
    });
    builder.addCase(editCategory.rejected, (state, action) => {
      state.editCategory.isLoading = false;
      state.editCategory.data = {};
      state.editCategory.error = action.payload;
    });

    //get all categories for Super Admin
    builder.addCase(getAllCategories.pending, (state) => {
      state.getAllCategories.isLoading = true;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.getAllCategories.isLoading = false;
      state.getAllCategories.data = action.payload;
      state.getAllCategories.error = null;
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.getAllCategories.isLoading = false;
      state.getAllCategories.data = {};
      state.getAllCategories.error = action.payload;
    });

    //Add News for Super Admin
    builder.addCase(addNews.pending, (state) => {
      state.addNews.isLoading = true;
    });
    builder.addCase(addNews.fulfilled, (state, action) => {
      state.addNews.isLoading = false;
      state.addNews.data = action.payload;
      state.addNews.error = null;
    });
    builder.addCase(addNews.rejected, (state, action) => {
      state.addNews.isLoading = false;
      state.addNews.data = {};
      state.addNews.error = action.payload;
    });

    //Update News for Super Admin
    builder.addCase(updateNews.pending, (state) => {
      state.updateNews.isLoading = true;
    });
    builder.addCase(updateNews.fulfilled, (state, action) => {
      state.updateNews.isLoading = false;
      state.updateNews.data = action.payload;
      state.updateNews.error = null;
    });
    builder.addCase(updateNews.rejected, (state, action) => {
      state.updateNews.isLoading = false;
      state.updateNews.data = {};
      state.updateNews.error = action.payload;
    });

    // delete News for Super Admin
    builder.addCase(deleteNews.pending, (state) => {
      state.getAllNews.isLoading = true;
    });
    builder.addCase(deleteNews.fulfilled, (state, action) => {
      state.getAllNews.isLoading = false;
      state.getAllNews.data = state.getAllNews.data.filter(
        (item) => item._id !== action.payload._id
      );
      state.getAllNews.error = null;
    });
    builder.addCase(deleteNews.rejected, (state, action) => {
      state.getAllNews.isLoading = false;
      state.getAllNews.data = {};
      state.getAllNews.error = action.payload;
    });

    //get All news for Super Admin
    builder.addCase(getAllNews.pending, (state) => {
      state.getAllNews.isLoading = true;
    });
    builder.addCase(getAllNews.fulfilled, (state, action) => {
      state.getAllNews.isLoading = false;
      state.getAllNews.data = action.payload;
      state.getAllNews.error = null;
    });
    builder.addCase(getAllNews.rejected, (state, action) => {
      state.getAllNews.isLoading = false;
      state.getAllNews.data = {};
      state.getAllNews.error = action.payload;
    });

    //get Single news for Super Admin
    builder.addCase(getSingleNews.pending, (state) => {
      state.getSingleNews.isLoading = true;
    });
    builder.addCase(getSingleNews.fulfilled, (state, action) => {
      state.getSingleNews.isLoading = false;
      state.getSingleNews.data = action.payload;
      state.getSingleNews.error = null;
    });
    builder.addCase(getSingleNews.rejected, (state, action) => {
      state.getSingleNews.isLoading = false;
      state.getSingleNews.data = {};
      state.getSingleNews.error = action.payload;
    });

    //Update SEO Meta for Super Admin
    builder.addCase(updateSeoMetaForSuperAdmin.pending, (state) => {
      state.updateSeoMetaForSuperAdmin.isLoading = true;
    });
    builder.addCase(updateSeoMetaForSuperAdmin.fulfilled, (state, action) => {
      state.updateSeoMetaForSuperAdmin.isLoading = false;
      state.updateSeoMetaForSuperAdmin.data = action.payload;
      state.updateSeoMetaForSuperAdmin.error = null;
    });
    builder.addCase(updateSeoMetaForSuperAdmin.rejected, (state, action) => {
      state.updateSeoMetaForSuperAdmin.isLoading = false;
      state.updateSeoMetaForSuperAdmin.data = {};
      state.updateSeoMetaForSuperAdmin.error = action.payload;
    });

    //GET SEO Meta for Super Admin
    builder.addCase(seoMetaForSuperAdmin.pending, (state) => {
      state.seoMetaForSuperAdmin.isLoading = true;
    });
    builder.addCase(seoMetaForSuperAdmin.fulfilled, (state, action) => {
      state.seoMetaForSuperAdmin.isLoading = false;
      state.seoMetaForSuperAdmin.data = action.payload;
      state.seoMetaForSuperAdmin.error = null;
    });
    builder.addCase(seoMetaForSuperAdmin.rejected, (state, action) => {
      state.seoMetaForSuperAdmin.isLoading = false;
      state.seoMetaForSuperAdmin.data = {};
      state.seoMetaForSuperAdmin.error = action.payload;
    });

    // all Reg Clients For Super Admin
    builder.addCase(allRegClientsForSuperAdmin.pending, (state) => {
      state.allRegClientsForSuperAdmin.isLoading = true;
    });
    builder.addCase(allRegClientsForSuperAdmin.fulfilled, (state, action) => {
      state.allRegClientsForSuperAdmin.isLoading = false;
      state.allRegClientsForSuperAdmin.data = action.payload;
      state.allRegClientsForSuperAdmin.error = null;
    });
    builder.addCase(allRegClientsForSuperAdmin.rejected, (state, action) => {
      state.allRegClientsForSuperAdmin.isLoading = false;
      state.allRegClientsForSuperAdmin.data = {};
      state.allRegClientsForSuperAdmin.error = action.payload;
    });
    // all demo Clients For Super Admin
    builder.addCase(allDemoClientsForSuperAdmin.pending, (state) => {
      state.allDemoClientsForSuperAdmin.isLoading = true;
    });
    builder.addCase(allDemoClientsForSuperAdmin.fulfilled, (state, action) => {
      state.allDemoClientsForSuperAdmin.isLoading = false;
      state.allDemoClientsForSuperAdmin.data = action.payload;
      state.allDemoClientsForSuperAdmin.error = null;
    });
    builder.addCase(allDemoClientsForSuperAdmin.rejected, (state, action) => {
      state.allDemoClientsForSuperAdmin.isLoading = false;
      state.allDemoClientsForSuperAdmin.data = {};
      state.allDemoClientsForSuperAdmin.error = action.payload;
    });
    // add feature
    builder.addCase(addFeatureForSuperAdmin.pending, (state) => {
      state.addFeatureForSuperAdmin.isLoading = true;
    });
    builder.addCase(addFeatureForSuperAdmin.fulfilled, (state, action) => {
      state.addFeatureForSuperAdmin.isLoading = false;
      state.addFeatureForSuperAdmin.data = action.payload;
      state.addFeatureForSuperAdmin.error = null;
    });
    builder.addCase(addFeatureForSuperAdmin.rejected, (state, action) => {
      state.addFeatureForSuperAdmin.isLoading = false;
      state.addFeatureForSuperAdmin.data = {};
      state.addFeatureForSuperAdmin.error = action.payload;
    });
    // all feature
    builder.addCase(allFeatureForSuperAdmin.pending, (state) => {
      state.allFeatureForSuperAdmin.isLoading = true;
    });
    builder.addCase(allFeatureForSuperAdmin.fulfilled, (state, action) => {
      state.allFeatureForSuperAdmin.isLoading = false;
      state.allFeatureForSuperAdmin.data = action.payload;
      state.allFeatureForSuperAdmin.error = null;
    });
    builder.addCase(allFeatureForSuperAdmin.rejected, (state, action) => {
      state.allFeatureForSuperAdmin.isLoading = false;
      state.allFeatureForSuperAdmin.data = {};
      state.allFeatureForSuperAdmin.error = action.payload;
    });
    // update feature
    builder.addCase(updateFeatureForSuperAdmin.pending, (state) => {
      state.updateFeatureForSuperAdmin.isLoading = true;
    });
    builder.addCase(updateFeatureForSuperAdmin.fulfilled, (state, action) => {
      state.updateFeatureForSuperAdmin.isLoading = false;
      state.updateFeatureForSuperAdmin.data = action.payload;
      state.updateFeatureForSuperAdmin.error = null;
    });
    builder.addCase(updateFeatureForSuperAdmin.rejected, (state, action) => {
      state.updateFeatureForSuperAdmin.isLoading = false;
      state.updateFeatureForSuperAdmin.data = {};
      state.updateFeatureForSuperAdmin.error = action.payload;
    });
    // delete feature
    builder.addCase(deleteFeatureForSuperAdmin.pending, (state) => {
      state.deleteFeatureForSuperAdmin.isLoading = true;
    });
    builder.addCase(deleteFeatureForSuperAdmin.fulfilled, (state, action) => {
      state.deleteFeatureForSuperAdmin.isLoading = false;
      state.deleteFeatureForSuperAdmin.data = action.payload;
      state.deleteFeatureForSuperAdmin.error = null;
    });
    builder.addCase(deleteFeatureForSuperAdmin.rejected, (state, action) => {
      state.deleteFeatureForSuperAdmin.isLoading = false;
      state.deleteFeatureForSuperAdmin.data = {};
      state.deleteFeatureForSuperAdmin.error = action.payload;
    });
    // add games
    builder.addCase(addGamesForSuperAdmin.pending, (state) => {
      state.addGamesForSuperAdmin.isLoading = true;
    });
    builder.addCase(addGamesForSuperAdmin.fulfilled, (state, action) => {
      state.addGamesForSuperAdmin.isLoading = false;
      state.addGamesForSuperAdmin.data = action.payload;
      state.addGamesForSuperAdmin.error = null;
    });
    builder.addCase(addGamesForSuperAdmin.rejected, (state, action) => {
      state.addGamesForSuperAdmin.isLoading = false;
      state.addGamesForSuperAdmin.data = {};
      state.addGamesForSuperAdmin.error = action.payload;
    });
    // all games
    builder.addCase(allGamesForSuperAdmin.pending, (state) => {
      state.allGamesForSuperAdmin.isLoading = true;
    });
    builder.addCase(allGamesForSuperAdmin.fulfilled, (state, action) => {
      state.allGamesForSuperAdmin.isLoading = false;
      state.allGamesForSuperAdmin.data = action.payload;
      state.allGamesForSuperAdmin.error = null;
    });
    builder.addCase(allGamesForSuperAdmin.rejected, (state, action) => {
      state.allGamesForSuperAdmin.isLoading = false;
      state.allGamesForSuperAdmin.data = {};
      state.allGamesForSuperAdmin.error = action.payload;
    });
    // update games
    builder.addCase(updateGamesForSuperAdmin.pending, (state) => {
      state.updateGamesForSuperAdmin.isLoading = true;
    });
    builder.addCase(updateGamesForSuperAdmin.fulfilled, (state, action) => {
      state.updateGamesForSuperAdmin.isLoading = false;
      state.updateGamesForSuperAdmin.data = action.payload;
      state.updateGamesForSuperAdmin.error = null;
    });
    builder.addCase(updateGamesForSuperAdmin.rejected, (state, action) => {
      state.updateGamesForSuperAdmin.isLoading = false;
      state.updateGamesForSuperAdmin.data = {};
      state.updateGamesForSuperAdmin.error = action.payload;
    });
    // delete games
    builder.addCase(deleteGamesForSuperAdmin.pending, (state) => {
      state.deleteGamesForSuperAdmin.isLoading = true;
    });
    builder.addCase(deleteGamesForSuperAdmin.fulfilled, (state, action) => {
      state.deleteGamesForSuperAdmin.isLoading = false;
      state.deleteGamesForSuperAdmin.data = action.payload;
      state.deleteGamesForSuperAdmin.error = null;
    });
    builder.addCase(deleteGamesForSuperAdmin.rejected, (state, action) => {
      state.deleteGamesForSuperAdmin.isLoading = false;
      state.deleteGamesForSuperAdmin.data = {};
      state.deleteGamesForSuperAdmin.error = action.payload;
    });
    // update settings
    builder.addCase(updateSystemSettingsForSuperAdmin.pending, (state) => {
      state.updateSystemSettingsForSuperAdmin.isLoading = true;
    });
    builder.addCase(
      updateSystemSettingsForSuperAdmin.fulfilled,
      (state, action) => {
        state.updateSystemSettingsForSuperAdmin.isLoading = false;
        state.updateSystemSettingsForSuperAdmin.data = action.payload;
        state.updateSystemSettingsForSuperAdmin.error = null;
      }
    );
    builder.addCase(
      updateSystemSettingsForSuperAdmin.rejected,
      (state, action) => {
        state.updateSystemSettingsForSuperAdmin.isLoading = false;
        state.updateSystemSettingsForSuperAdmin.data = {};
        state.updateSystemSettingsForSuperAdmin.error = action.payload;
      }
    );
    // getSuperAdminInfo
    builder.addCase(getSuperAdminInfo.pending, (state) => {
      state.getSuperAdminInfo.isLoading = true;
    });
    builder.addCase(getSuperAdminInfo.fulfilled, (state, action) => {
      state.getSuperAdminInfo.isLoading = false;
      state.getSuperAdminInfo.data = action.payload;
      state.getSuperAdminInfo.error = null;
    });
    builder.addCase(getSuperAdminInfo.rejected, (state, action) => {
      state.getSuperAdminInfo.isLoading = false;
      state.getSuperAdminInfo.data = {};
      state.getSuperAdminInfo.error = action.payload;
    });
    // allPendingInvoiceForSuperAdmin
    builder.addCase(allPendingInvoiceForSuperAdmin.pending, (state) => {
      state.allPendingInvoiceForSuperAdmin.isLoading = true;
    });
    builder.addCase(
      allPendingInvoiceForSuperAdmin.fulfilled,
      (state, action) => {
        state.allPendingInvoiceForSuperAdmin.isLoading = false;
        state.allPendingInvoiceForSuperAdmin.data = action.payload;
        state.allPendingInvoiceForSuperAdmin.error = null;
      }
    );
    builder.addCase(
      allPendingInvoiceForSuperAdmin.rejected,
      (state, action) => {
        state.allPendingInvoiceForSuperAdmin.isLoading = false;
        state.allPendingInvoiceForSuperAdmin.data = {};
        state.allPendingInvoiceForSuperAdmin.error = action.payload;
      }
    );
    // allPaidInvoiceForSuperAdmin
    builder.addCase(allPaidInvoiceForSuperAdmin.pending, (state) => {
      state.allPaidInvoiceForSuperAdmin.isLoading = true;
    });
    builder.addCase(allPaidInvoiceForSuperAdmin.fulfilled, (state, action) => {
      state.allPaidInvoiceForSuperAdmin.isLoading = false;
      state.allPaidInvoiceForSuperAdmin.data = action.payload;
      state.allPaidInvoiceForSuperAdmin.error = null;
    });
    builder.addCase(allPaidInvoiceForSuperAdmin.rejected, (state, action) => {
      state.allPaidInvoiceForSuperAdmin.isLoading = false;
      state.allPaidInvoiceForSuperAdmin.data = {};
      state.allPaidInvoiceForSuperAdmin.error = action.payload;
    });
    // allcontactMessageForSAdmin
    builder.addCase(allcontactMessageForSAdmin.pending, (state) => {
      state.allcontactMessageForSAdmin.isLoading = true;
    });
    builder.addCase(allcontactMessageForSAdmin.fulfilled, (state, action) => {
      state.allcontactMessageForSAdmin.isLoading = false;
      state.allcontactMessageForSAdmin.data = action.payload;
      state.allcontactMessageForSAdmin.error = null;
    });
    builder.addCase(allcontactMessageForSAdmin.rejected, (state, action) => {
      state.allcontactMessageForSAdmin.isLoading = false;
      state.allcontactMessageForSAdmin.data = {};
      state.allcontactMessageForSAdmin.error = action.payload;
    });
    // deletecontactMessageForSAdmin
    builder.addCase(deletecontactMessageForSAdmin.pending, (state) => {
      state.deletecontactMessageForSAdmin.isLoading = true;
    });
    builder.addCase(
      deletecontactMessageForSAdmin.fulfilled,
      (state, action) => {
        state.deletecontactMessageForSAdmin.isLoading = false;
        state.deletecontactMessageForSAdmin.data = action.payload;
        state.deletecontactMessageForSAdmin.error = null;
      }
    );
    builder.addCase(deletecontactMessageForSAdmin.rejected, (state, action) => {
      state.deletecontactMessageForSAdmin.isLoading = false;
      state.deletecontactMessageForSAdmin.data = {};
      state.deletecontactMessageForSAdmin.error = action.payload;
    });
    // deleteDemoClientsForSuperAdmin
    builder.addCase(deleteDemoClientsForSuperAdmin.pending, (state) => {
      state.deleteDemoClientsForSuperAdmin.isLoading = true;
    });
    builder.addCase(
      deleteDemoClientsForSuperAdmin.fulfilled,
      (state, action) => {
        state.deleteDemoClientsForSuperAdmin.isLoading = false;
        state.deleteDemoClientsForSuperAdmin.data = action.payload;
        state.deleteDemoClientsForSuperAdmin.error = null;
      }
    );
    builder.addCase(
      deleteDemoClientsForSuperAdmin.rejected,
      (state, action) => {
        state.deleteDemoClientsForSuperAdmin.isLoading = false;
        state.deleteDemoClientsForSuperAdmin.data = {};
        state.deleteDemoClientsForSuperAdmin.error = action.payload;
      }
    );

    // getAllSubscriber list
    builder.addCase(getAllSubscriber.pending, (state) => {
      state.getAllSubscriber.isLoading = true;
    });
    builder.addCase(getAllSubscriber.fulfilled, (state, action) => {
      state.getAllSubscriber.isLoading = false;
      state.getAllSubscriber.data = action.payload;
      state.getAllSubscriber.error = null;
    });
    builder.addCase(getAllSubscriber.rejected, (state, action) => {
      state.getAllSubscriber.isLoading = false;
      state.getAllSubscriber.data = {};
      state.getAllSubscriber.error = action.payload;
    });
    // allDomainPointingRequest
    builder.addCase(allDomainPointingRequest.pending, (state) => {
      state.allDomainPointingRequest.isLoading = true;
    });
    builder.addCase(allDomainPointingRequest.fulfilled, (state, action) => {
      state.allDomainPointingRequest.isLoading = false;
      state.allDomainPointingRequest.data = action.payload;
      state.allDomainPointingRequest.error = null;
    });
    builder.addCase(allDomainPointingRequest.rejected, (state, action) => {
      state.allDomainPointingRequest.isLoading = false;
      state.allDomainPointingRequest.data = {};
      state.allDomainPointingRequest.error = action.payload;
    });
    // updateDomainPointingRequest
    builder.addCase(updateDomainPointingRequest.pending, (state) => {
      state.updateDomainPointingRequest.isLoading = true;
    });
    builder.addCase(updateDomainPointingRequest.fulfilled, (state, action) => {
      state.updateDomainPointingRequest.isLoading = false;
      state.updateDomainPointingRequest.data = action.payload;
      state.updateDomainPointingRequest.error = null;
    });
    builder.addCase(updateDomainPointingRequest.rejected, (state, action) => {
      state.updateDomainPointingRequest.isLoading = false;
      state.updateDomainPointingRequest.data = {};
      state.updateDomainPointingRequest.error = action.payload;
    });
    // getAllSystemSettingsForSuperAdmin
    builder.addCase(getAllSystemSettingsForSuperAdmin.pending, (state) => {
      state.getAllSystemSettingsForSuperAdmin.isLoading = true;
    });
    builder.addCase(
      getAllSystemSettingsForSuperAdmin.fulfilled,
      (state, action) => {
        state.getAllSystemSettingsForSuperAdmin.isLoading = false;
        state.getAllSystemSettingsForSuperAdmin.data = action.payload;
        state.getAllSystemSettingsForSuperAdmin.error = null;
      }
    );
    builder.addCase(
      getAllSystemSettingsForSuperAdmin.rejected,
      (state, action) => {
        state.getAllSystemSettingsForSuperAdmin.isLoading = false;
        state.getAllSystemSettingsForSuperAdmin.data = {};
        state.getAllSystemSettingsForSuperAdmin.error = action.payload;
      }
    );
    // addCurrencyAndGstForSuperAdmin
    builder.addCase(addCurrencyAndGstForSuperAdmin.pending, (state) => {
      state.addCurrencyAndGstForSuperAdmin.isLoading = true;
    });
    builder.addCase(
      addCurrencyAndGstForSuperAdmin.fulfilled,
      (state, action) => {
        state.addCurrencyAndGstForSuperAdmin.isLoading = false;
        state.addCurrencyAndGstForSuperAdmin.data = action.payload;
        state.addCurrencyAndGstForSuperAdmin.error = null;
      }
    );
    builder.addCase(
      addCurrencyAndGstForSuperAdmin.rejected,
      (state, action) => {
        state.addCurrencyAndGstForSuperAdmin.isLoading = false;
        state.addCurrencyAndGstForSuperAdmin.data = {};
        state.addCurrencyAndGstForSuperAdmin.error = action.payload;
      }
    );
    // getCurrencyAndGstForSuperAdmin
    builder.addCase(getCurrencyAndGstForSuperAdmin.pending, (state) => {
      state.getCurrencyAndGstForSuperAdmin.isLoading = true;
    });
    builder.addCase(
      getCurrencyAndGstForSuperAdmin.fulfilled,
      (state, action) => {
        state.getCurrencyAndGstForSuperAdmin.isLoading = false;
        state.getCurrencyAndGstForSuperAdmin.data = action.payload;
        state.getCurrencyAndGstForSuperAdmin.error = null;
      }
    );
    builder.addCase(
      getCurrencyAndGstForSuperAdmin.rejected,
      (state, action) => {
        state.getCurrencyAndGstForSuperAdmin.isLoading = false;
        state.getCurrencyAndGstForSuperAdmin.data = {};
        state.getCurrencyAndGstForSuperAdmin.error = action.payload;
      }
    );

    //
    // getCurrencyAndGstFromAdminToSAdmin
    builder.addCase(getCurrencyAndGstFromAdminToSAdmin.pending, (state) => {
      state.getCurrencyAndGstFromAdminToSAdmin.isLoading = true;
    });
    builder.addCase(
      getCurrencyAndGstFromAdminToSAdmin.fulfilled,
      (state, action) => {
        state.getCurrencyAndGstFromAdminToSAdmin.isLoading = false;
        state.getCurrencyAndGstFromAdminToSAdmin.data = action.payload;
        state.getCurrencyAndGstFromAdminToSAdmin.error = null;
      }
    );
    builder.addCase(
      getCurrencyAndGstFromAdminToSAdmin.rejected,
      (state, action) => {
        state.getCurrencyAndGstFromAdminToSAdmin.isLoading = false;
        state.getCurrencyAndGstFromAdminToSAdmin.data = {};
        state.getCurrencyAndGstFromAdminToSAdmin.error = action.payload;
      }
    );
    // updateChargeManagement
    builder.addCase(updateChargeManagement.pending, (state) => {
      state.updateChargeManagement.isLoading = true;
    });
    builder.addCase(updateChargeManagement.fulfilled, (state, action) => {
      state.updateChargeManagement.isLoading = false;
      state.updateChargeManagement.data = action.payload;
      state.updateChargeManagement.error = null;
    });
    builder.addCase(updateChargeManagement.rejected, (state, action) => {
      state.updateChargeManagement.isLoading = false;
      state.updateChargeManagement.data = {};
      state.updateChargeManagement.error = action.payload;
    });
    // allChargeManagement
    builder.addCase(allChargeManagement.pending, (state) => {
      state.allChargeManagement.isLoading = true;
    });
    builder.addCase(allChargeManagement.fulfilled, (state, action) => {
      state.allChargeManagement.isLoading = false;
      state.allChargeManagement.data = action.payload;
      state.allChargeManagement.error = null;
    });
    builder.addCase(allChargeManagement.rejected, (state, action) => {
      state.allChargeManagement.isLoading = false;
      state.allChargeManagement.data = {};
      state.allChargeManagement.error = action.payload;
    });
    // deleteChargeManagement
    builder.addCase(deleteChargeManagement.pending, (state) => {
      state.deleteChargeManagement.isLoading = true;
    });
    builder.addCase(deleteChargeManagement.fulfilled, (state, action) => {
      state.deleteChargeManagement.isLoading = false;
      state.deleteChargeManagement.data = action.payload;
      state.deleteChargeManagement.error = null;
    });
    builder.addCase(deleteChargeManagement.rejected, (state, action) => {
      state.deleteChargeManagement.isLoading = false;
      state.deleteChargeManagement.data = {};
      state.deleteChargeManagement.error = action.payload;
    });
    // getAdminGstCurrencySdfee
    builder.addCase(getAdminGstCurrencySdfee.pending, (state) => {
      state.getAdminGstCurrencySdfee.isLoading = true;
    });
    builder.addCase(getAdminGstCurrencySdfee.fulfilled, (state, action) => {
      state.getAdminGstCurrencySdfee.isLoading = false;
      state.getAdminGstCurrencySdfee.data = action.payload;
      state.getAdminGstCurrencySdfee.error = null;
    });
    builder.addCase(getAdminGstCurrencySdfee.rejected, (state, action) => {
      state.getAdminGstCurrencySdfee.isLoading = false;
      state.getAdminGstCurrencySdfee.data = {};
      state.getAdminGstCurrencySdfee.error = action.payload;
    });

    //
  },
});

export const {
  emptyAddPackageForSuperAdmin,
  emptyAddClientsForSuperAdmin,
  emptyAddTestimonialForSuperAdmin,
  emptyAddFeatureForSuperAdmin,
  emptyAddGamesForSuperAdmin,
  emptyUpdateSystemSettingsForSuperAdmin,
  emptyEditClientsForSuperAdmin,
  emptyEditTestimonialForSuperAdmin,
  emptyAddBlogForSuperAdmin,
} = superAdminSlice.actions;

export default superAdminSlice.reducer;
