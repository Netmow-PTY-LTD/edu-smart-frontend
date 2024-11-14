import { clientAboutAction } from '@/slices/home/actions/clientAboutAction';
import { clientHomeAction } from '@/slices/home/actions/clientHomeAction';
import { createSlice } from '@reduxjs/toolkit';
import {
  clientEventsAction,
  clientSingleEventsAction,
} from './actions/clientEventsActions';
import {
  clientNewsAction,
  clientSingleNewsAction,
} from './actions/clientNewsActions';
import { getTheme } from './actions/organizationAction';
import { clientWaitlistAction } from '@/slices/home/actions/clientWaitlistAction';
import {
  clientTeamAction,
  getSingleTeamAction,
} from '@/slices/home/actions/clientTeamAction';
import {
  addToCartAction,
  allEcommerceProductCategories,
  allEcommerceProducts,
  createOrderAction,
  deleteCartItemAction,
  getAllCartItemsAction,
  getProductBySlugAction,
  shoppingStripePaymentAction,
  updateCartItemAction,
} from './actions/clientProductAction';

const initialStates = {
  theme: {
    data: {},
    isLoading: false,
    error: null,
  },
  clientAbout: {
    data: {},
    isLoading: false,
    error: null,
  },
  clientHome: {
    data: {},
    isLoading: false,
    error: null,
  },
  clientNews: {
    data: {},
    isLoading: false,
    error: null,
  },
  clientSingleNews: {
    data: {},
    isLoading: false,
    error: null,
  },
  clientEvents: {
    data: {},
    isLoading: false,
    error: null,
  },
  clientSingleEvents: { data: {}, isLoading: false, error: null },
  clientWaitlist: {
    data: {},
    isLoading: false,
    error: null,
  },
  clientTeams: {
    data: [],
    isLoading: false,
    error: null,
  },
  clientSingleTeam: {
    data: {},
    isLoading: false,
    error: null,
  },
  allEcommerceProducts: {
    data: [],
    isLoading: false,
    error: null,
  },
  allEcommerceProductCategories: {
    data: [],
    isLoading: false,
    error: null,
  },
  singleProduct: {
    data: {},
    isLoading: false,
    error: null,
  },

  addToCart: {
    data: [],
    isLoading: false,
    error: null,
  },

  getAllCartItems: {
    data: [],
    isLoading: false,
    error: null,
  },

  updateCartItem: {
    data: {},
    isLoading: false,
    error: null,
  },
  deleteCartItem: {
    data: {},
    isLoading: false,
    error: null,
  },

  createOrder: {
    data: [],
    isLoading: false,
    error: null,
  },
  shoppingStripePayment: {
    data: {},
    isLoading: false,
    error: null,
  },
};

export const homeSlice = createSlice({
  name: 'home',
  initialState: initialStates,
  reducers: {
    emptyTheme: (state) => {
      state.theme.data = {};
    },
    emptyClientWaitlist: (state) => {
      state.clientWaitlist.data = {};
    },
  },

  /*
     ? details: Login reducer
  */
  extraReducers: (builder) => {
    // user Info
    builder.addCase(getTheme.pending, (state) => {
      state.theme.isLoading = true;
    });
    builder.addCase(getTheme.fulfilled, (state, action) => {
      state.theme.isLoading = false;
      state.theme.data = action.payload;
      state.theme.error = null;
    });
    builder.addCase(getTheme.rejected, (state, action) => {
      state.theme.isLoading = false;
      state.theme.data = {};
      state.theme.error = action.payload;
    });

    // client about
    builder.addCase(clientAboutAction.pending, (state) => {
      state.clientAbout.isLoading = true;
    });
    builder.addCase(clientAboutAction.fulfilled, (state, action) => {
      state.clientAbout.isLoading = false;
      state.clientAbout.data = action.payload;
      state.clientAbout.error = null;
    });
    builder.addCase(clientAboutAction.rejected, (state, action) => {
      state.clientAbout.isLoading = false;
      state.clientAbout.data = {};
      state.clientAbout.error = action.payload;
    });

    // client home
    builder.addCase(clientHomeAction.pending, (state) => {
      state.clientHome.isLoading = true;
    });
    builder.addCase(clientHomeAction.fulfilled, (state, action) => {
      state.clientHome.isLoading = false;
      state.clientHome.data = action.payload;
      state.clientHome.error = null;
    });
    builder.addCase(clientHomeAction.rejected, (state, action) => {
      state.clientHome.isLoading = false;
      state.clientHome.data = {};
      state.clientHome.error = action.payload;
    });
    // client news
    builder.addCase(clientNewsAction.pending, (state) => {
      state.clientNews.isLoading = true;
    });
    builder.addCase(clientNewsAction.fulfilled, (state, action) => {
      state.clientNews.isLoading = false;
      state.clientNews.data = action.payload;
      state.clientNews.error = null;
    });
    builder.addCase(clientNewsAction.rejected, (state, action) => {
      state.clientNews.isLoading = false;
      state.clientNews.data = {};
      state.clientNews.error = action.payload;
    });

    // client single news
    builder.addCase(clientSingleNewsAction.pending, (state) => {
      state.clientSingleNews.isLoading = true;
    });
    builder.addCase(clientSingleNewsAction.fulfilled, (state, action) => {
      state.clientSingleNews.isLoading = false;
      state.clientSingleNews.data = action.payload;
      state.clientSingleNews.error = null;
    });
    builder.addCase(clientSingleNewsAction.rejected, (state, action) => {
      state.clientSingleNews.isLoading = false;
      state.clientSingleNews.data = {};
      state.clientSingleNews.error = action.payload;
    });
    // client Events
    builder.addCase(clientEventsAction.pending, (state) => {
      state.clientEvents.isLoading = true;
    });
    builder.addCase(clientEventsAction.fulfilled, (state, action) => {
      state.clientEvents.isLoading = false;
      state.clientEvents.data = action.payload;
      state.clientEvents.error = null;
    });
    builder.addCase(clientEventsAction.rejected, (state, action) => {
      state.clientEvents.isLoading = false;
      state.clientEvents.data = {};
      state.clientEvents.error = action.payload;
    });
    // client single Events
    builder.addCase(clientSingleEventsAction.pending, (state) => {
      state.clientSingleEvents.isLoading = true;
    });
    builder.addCase(clientSingleEventsAction.fulfilled, (state, action) => {
      state.clientSingleEvents.isLoading = false;
      state.clientSingleEvents.data = action.payload;
      state.clientSingleEvents.error = null;
    });
    builder.addCase(clientSingleEventsAction.rejected, (state, action) => {
      state.clientSingleEvents.isLoading = false;
      state.clientSingleEvents.data = {};
      state.clientSingleEvents.error = action.payload;
    });
    // client Join Waitlist
    builder.addCase(clientWaitlistAction.pending, (state) => {
      state.clientWaitlist.isLoading = true;
    });
    builder.addCase(clientWaitlistAction.fulfilled, (state, action) => {
      state.clientWaitlist.isLoading = false;
      state.clientWaitlist.data = action.payload;
      state.clientWaitlist.error = null;
    });
    builder.addCase(clientWaitlistAction.rejected, (state, action) => {
      state.clientWaitlist.isLoading = false;
      state.clientWaitlist.data = {};
      state.clientWaitlist.error = action.payload;
    });

    // team page
    builder.addCase(clientTeamAction.pending, (state) => {
      state.clientTeams.isLoading = true;
    });
    builder.addCase(clientTeamAction.fulfilled, (state, action) => {
      state.clientTeams.isLoading = false;
      state.clientTeams.data = action.payload;
      state.clientTeams.error = null;
    });
    builder.addCase(clientTeamAction.rejected, (state, action) => {
      state.clientTeams.isLoading = false;
      state.clientTeams.data = [];
      state.clientTeams.error = action.payload;
    });

    // single team page
    // let clientSingleTeamAction;
    builder.addCase(getSingleTeamAction.pending, (state) => {
      state.clientSingleTeam.isLoading = true;
    });
    builder.addCase(getSingleTeamAction.fulfilled, (state, action) => {
      state.clientSingleTeam.isLoading = false;
      state.clientSingleTeam.data = action.payload;
      state.clientSingleTeam.error = null;
    });
    builder.addCase(getSingleTeamAction.rejected, (state, action) => {
      state.clientSingleTeam.isLoading = false;
      state.clientSingleTeam.data = {};
      state.clientSingleTeam.error = action.payload;
    });

    // client Products
    builder.addCase(allEcommerceProducts.pending, (state) => {
      state.allEcommerceProducts.isLoading = true;
    });
    builder.addCase(allEcommerceProducts.fulfilled, (state, action) => {
      state.allEcommerceProducts.isLoading = false;
      state.allEcommerceProducts.data = action.payload;
      state.allEcommerceProducts.error = null;
    });
    builder.addCase(allEcommerceProducts.rejected, (state, action) => {
      state.allEcommerceProducts.isLoading = false;
      state.allEcommerceProducts.data = {};
      state.allEcommerceProducts.error = action.payload;
    });

    // client Product Categories
    builder.addCase(allEcommerceProductCategories.pending, (state) => {
      state.allEcommerceProductCategories.isLoading = true;
    });
    builder.addCase(
      allEcommerceProductCategories.fulfilled,
      (state, action) => {
        state.allEcommerceProductCategories.isLoading = false;
        state.allEcommerceProductCategories.data = action.payload;
        state.allEcommerceProductCategories.error = null;
      }
    );
    builder.addCase(allEcommerceProductCategories.rejected, (state, action) => {
      state.allEcommerceProductCategories.isLoading = false;
      state.allEcommerceProductCategories.data = {};
      state.allEcommerceProductCategories.error = action.payload;
    });

    // Single Product
    builder.addCase(getProductBySlugAction.pending, (state) => {
      state.singleProduct.isLoading = true;
    });
    builder.addCase(getProductBySlugAction.fulfilled, (state, action) => {
      state.singleProduct.isLoading = false;
      state.singleProduct.data = action.payload;
      state.singleProduct.error = null;
    });
    builder.addCase(getProductBySlugAction.rejected, (state, action) => {
      state.singleProduct.isLoading = false;
      state.singleProduct.data = {};
      state.singleProduct.error = action.payload;
    });

    // Add to cart
    builder.addCase(addToCartAction.pending, (state) => {
      state.addToCart.isLoading = true;
    });
    builder.addCase(addToCartAction.fulfilled, (state, action) => {
      state.addToCart.isLoading = false;
      state.addToCart.data = action.payload;
      state.addToCart.error = null;
    });
    builder.addCase(addToCartAction.rejected, (state, action) => {
      state.addToCart.isLoading = false;
      state.addToCart.data = {};
      state.addToCart.error = action.payload;
    });
    // get all cart items
    builder.addCase(getAllCartItemsAction.pending, (state) => {
      state.getAllCartItems.isLoading = true;
    });
    builder.addCase(getAllCartItemsAction.fulfilled, (state, action) => {
      state.getAllCartItems.isLoading = false;
      state.getAllCartItems.data = action.payload;
      state.getAllCartItems.error = null;
    });
    builder.addCase(getAllCartItemsAction.rejected, (state, action) => {
      state.getAllCartItems.isLoading = false;
      state.getAllCartItems.data = {};
      state.getAllCartItems.error = action.payload;
    });
    // update cart item
    builder.addCase(updateCartItemAction.pending, (state) => {
      state.updateCartItem.isLoading = true;
    });
    builder.addCase(updateCartItemAction.fulfilled, (state, action) => {
      state.updateCartItem.isLoading = false;
      state.updateCartItem.data = action.payload;
      state.updateCartItem.error = null;
    });
    builder.addCase(updateCartItemAction.rejected, (state, action) => {
      state.updateCartItem.isLoading = false;
      state.updateCartItem.data = {};
      state.updateCartItem.error = action.payload;
    });

    // delete cart item
    builder.addCase(deleteCartItemAction.pending, (state) => {
      state.deleteCartItem.isLoading = true;
    });
    builder.addCase(deleteCartItemAction.fulfilled, (state, action) => {
      state.deleteCartItem.isLoading = false;
      state.deleteCartItem.data = action.payload;
      state.deleteCartItem.error = null;
    });
    builder.addCase(deleteCartItemAction.rejected, (state, action) => {
      state.deleteCartItem.isLoading = false;
      state.deleteCartItem.data = {};
      state.deleteCartItem.error = action.payload;
    });

    // Create Order
    builder.addCase(createOrderAction.pending, (state) => {
      state.createOrder.isLoading = true;
    });
    builder.addCase(createOrderAction.fulfilled, (state, action) => {
      state.createOrder.isLoading = false;
      state.createOrder.data = action.payload;
      state.createOrder.error = null;
    });
    builder.addCase(createOrderAction.rejected, (state, action) => {
      state.createOrder.isLoading = false;
      state.createOrder.data = {};
      state.createOrder.error = action.payload;
    });

    // Stripe Shopping Payment
    builder.addCase(shoppingStripePaymentAction.pending, (state) => {
      state.shoppingStripePayment.isLoading = true;
    });
    builder.addCase(shoppingStripePaymentAction.fulfilled, (state, action) => {
      state.shoppingStripePayment.isLoading = false;
      state.shoppingStripePayment.data = action.payload;
      state.shoppingStripePayment.error = null;
    });
    builder.addCase(shoppingStripePaymentAction.rejected, (state, action) => {
      state.shoppingStripePayment.isLoading = false;
      state.shoppingStripePayment.data = {};
      state.shoppingStripePayment.error = action.payload;
    });
  },
});

export const { emptyTheme, emptyClientWaitlist } = homeSlice.actions;

export default homeSlice.reducer;
