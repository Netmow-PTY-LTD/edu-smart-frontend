import { createSlice } from '@reduxjs/toolkit';
import {
  addEcommerceProduct,
  allEcommerceProduct,
  allOrderLists,
  deleteEcommerceProduct,
  deleteOrderLists,
  editEcommerceProduct,
  getEcommerceOrder,
  updateEcommerceOrder,
} from './Actions/productActions';
import {
  addProductSize,
  allProductSize,
  deleteProductSize,
  editProductSize,
} from './Actions/productSizeActions';
import {
  addShopCategory,
  allShopCategory,
  deleteShopCategory,
  editShopCategory,
} from './Actions/shopActions';

const initialStates = {
  addShopCategory: {
    data: [],
    isLoading: false,
    error: null,
  },
  allShopCategory: {
    data: [],
    isLoading: false,
    error: null,
  },
  editShopCategory: {
    data: [],
    isLoading: false,
    error: null,
  },
  deleteShopCategory: {
    data: [],
    isLoading: false,
    error: null,
  },
  addProductSize: {
    data: [],
    isLoading: false,
    error: null,
  },
  allProductSize: {
    data: [],
    isLoading: false,
    error: null,
  },
  editProductSize: {
    data: [],
    isLoading: false,
    error: null,
  },
  deleteProductSize: {
    data: [],
    isLoading: false,
    error: null,
  },
  addEcommerceProduct: {
    data: [],
    isLoading: false,
    error: null,
  },
  allEcommerceProduct: {
    data: [],
    isLoading: false,
    error: null,
  },
  editEcommerceProduct: {
    data: [],
    isLoading: false,
    error: null,
  },
  deleteEcommerceProduct: {
    data: [],
    isLoading: false,
    error: null,
  },
  allOrderLists: {
    data: [],
    isLoading: false,
    error: null,
  },
  deleteOrderLists: {
    data: [],
    isLoading: false,
    error: null,
  },
  getEcommerceOrder: {
    data: [],
    isLoading: false,
    error: null,
  },
  updateEcommerceOrder: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const ecommerceSlice = createSlice({
  name: 'Ecommerce',
  initialState: initialStates,
  reducers: {
    // emptyProfileSettingsForCommon: (state) => {
    //   state.postProfileSettingsForCommon.data = {};
    // },
  },

  extraReducers: (builder) => {
    // addShopCategory
    builder.addCase(addShopCategory.pending, (state) => {
      state.addShopCategory.isLoading = true;
    });
    builder.addCase(addShopCategory.fulfilled, (state, action) => {
      state.addShopCategory.isLoading = false;
      state.addShopCategory.data = action.payload;
      state.addShopCategory.error = null;
    });
    builder.addCase(addShopCategory.rejected, (state, action) => {
      state.addShopCategory.isLoading = false;
      state.addShopCategory.data = {};
      state.addShopCategory.error = action.payload;
    });
    // allShopCategory
    builder.addCase(allShopCategory.pending, (state) => {
      state.allShopCategory.isLoading = true;
    });
    builder.addCase(allShopCategory.fulfilled, (state, action) => {
      state.allShopCategory.isLoading = false;
      state.allShopCategory.data = action.payload;
      state.allShopCategory.error = null;
    });
    builder.addCase(allShopCategory.rejected, (state, action) => {
      state.allShopCategory.isLoading = false;
      state.allShopCategory.data = {};
      state.allShopCategory.error = action.payload;
    });
    // editShopCategory
    builder.addCase(editShopCategory.pending, (state) => {
      state.editShopCategory.isLoading = true;
    });
    builder.addCase(editShopCategory.fulfilled, (state, action) => {
      state.editShopCategory.isLoading = false;
      state.editShopCategory.data = action.payload;
      state.editShopCategory.error = null;
    });
    builder.addCase(editShopCategory.rejected, (state, action) => {
      state.editShopCategory.isLoading = false;
      state.editShopCategory.data = {};
      state.editShopCategory.error = action.payload;
    });
    // deleteShopCategory
    builder.addCase(deleteShopCategory.pending, (state) => {
      state.deleteShopCategory.isLoading = true;
    });
    builder.addCase(deleteShopCategory.fulfilled, (state, action) => {
      state.deleteShopCategory.isLoading = false;
      state.deleteShopCategory.data = action.payload;
      state.deleteShopCategory.error = null;
    });
    builder.addCase(deleteShopCategory.rejected, (state, action) => {
      state.deleteShopCategory.isLoading = false;
      state.deleteShopCategory.data = {};
      state.deleteShopCategory.error = action.payload;
    });
    // addProductSize
    builder.addCase(addProductSize.pending, (state) => {
      state.addProductSize.isLoading = true;
    });
    builder.addCase(addProductSize.fulfilled, (state, action) => {
      state.addProductSize.isLoading = false;
      state.addProductSize.data = action.payload;
      state.addProductSize.error = null;
    });
    builder.addCase(addProductSize.rejected, (state, action) => {
      state.addProductSize.isLoading = false;
      state.addProductSize.data = {};
      state.addProductSize.error = action.payload;
    });
    // allProductSize
    builder.addCase(allProductSize.pending, (state) => {
      state.allProductSize.isLoading = true;
    });
    builder.addCase(allProductSize.fulfilled, (state, action) => {
      state.allProductSize.isLoading = false;
      state.allProductSize.data = action.payload;
      state.allProductSize.error = null;
    });
    builder.addCase(allProductSize.rejected, (state, action) => {
      state.allProductSize.isLoading = false;
      state.allProductSize.data = {};
      state.allProductSize.error = action.payload;
    });
    // editProductSize
    builder.addCase(editProductSize.pending, (state) => {
      state.editProductSize.isLoading = true;
    });
    builder.addCase(editProductSize.fulfilled, (state, action) => {
      state.editProductSize.isLoading = false;
      state.editProductSize.data = action.payload;
      state.editProductSize.error = null;
    });
    builder.addCase(editProductSize.rejected, (state, action) => {
      state.editProductSize.isLoading = false;
      state.editProductSize.data = {};
      state.editProductSize.error = action.payload;
    });
    // deleteProductSize
    builder.addCase(deleteProductSize.pending, (state) => {
      state.deleteProductSize.isLoading = true;
    });
    builder.addCase(deleteProductSize.fulfilled, (state, action) => {
      state.deleteProductSize.isLoading = false;
      state.deleteProductSize.data = action.payload;
      state.deleteProductSize.error = null;
    });
    builder.addCase(deleteProductSize.rejected, (state, action) => {
      state.deleteProductSize.isLoading = false;
      state.deleteProductSize.data = {};
      state.deleteProductSize.error = action.payload;
    });
    // addEcommerceProduct
    builder.addCase(addEcommerceProduct.pending, (state) => {
      state.addEcommerceProduct.isLoading = true;
    });
    builder.addCase(addEcommerceProduct.fulfilled, (state, action) => {
      state.addEcommerceProduct.isLoading = false;
      state.addEcommerceProduct.data = action.payload;
      state.addEcommerceProduct.error = null;
    });
    builder.addCase(addEcommerceProduct.rejected, (state, action) => {
      state.addEcommerceProduct.isLoading = false;
      state.addEcommerceProduct.data = {};
      state.addEcommerceProduct.error = action.payload;
    });
    // allEcommerceProduct
    builder.addCase(allEcommerceProduct.pending, (state) => {
      state.allEcommerceProduct.isLoading = true;
    });
    builder.addCase(allEcommerceProduct.fulfilled, (state, action) => {
      state.allEcommerceProduct.isLoading = false;
      state.allEcommerceProduct.data = action.payload;
      state.allEcommerceProduct.error = null;
    });
    builder.addCase(allEcommerceProduct.rejected, (state, action) => {
      state.allEcommerceProduct.isLoading = false;
      state.allEcommerceProduct.data = {};
      state.allEcommerceProduct.error = action.payload;
    });
    // editEcommerceProduct
    builder.addCase(editEcommerceProduct.pending, (state) => {
      state.editEcommerceProduct.isLoading = true;
    });
    builder.addCase(editEcommerceProduct.fulfilled, (state, action) => {
      state.editEcommerceProduct.isLoading = false;
      state.editEcommerceProduct.data = action.payload;
      state.editEcommerceProduct.error = null;
    });
    builder.addCase(editEcommerceProduct.rejected, (state, action) => {
      state.editEcommerceProduct.isLoading = false;
      state.editEcommerceProduct.data = {};
      state.editEcommerceProduct.error = action.payload;
    });
    // deleteEcommerceProduct
    builder.addCase(deleteEcommerceProduct.pending, (state) => {
      state.deleteEcommerceProduct.isLoading = true;
    });
    builder.addCase(deleteEcommerceProduct.fulfilled, (state, action) => {
      state.deleteEcommerceProduct.isLoading = false;
      state.deleteEcommerceProduct.data = action.payload;
      state.deleteEcommerceProduct.error = null;
    });
    builder.addCase(deleteEcommerceProduct.rejected, (state, action) => {
      state.deleteEcommerceProduct.isLoading = false;
      state.deleteEcommerceProduct.data = {};
      state.deleteEcommerceProduct.error = action.payload;
    });
    // allOrderLists
    builder.addCase(allOrderLists.pending, (state) => {
      state.allOrderLists.isLoading = true;
    });
    builder.addCase(allOrderLists.fulfilled, (state, action) => {
      state.allOrderLists.isLoading = false;
      state.allOrderLists.data = action.payload;
      state.allOrderLists.error = null;
    });
    builder.addCase(allOrderLists.rejected, (state, action) => {
      state.allOrderLists.isLoading = false;
      state.allOrderLists.data = {};
      state.allOrderLists.error = action.payload;
    });
    // deleteOrderLists
    builder.addCase(deleteOrderLists.pending, (state) => {
      state.deleteOrderLists.isLoading = true;
    });
    builder.addCase(deleteOrderLists.fulfilled, (state, action) => {
      state.deleteOrderLists.isLoading = false;
      state.deleteOrderLists.data = action.payload;
      state.deleteOrderLists.error = null;
    });
    builder.addCase(deleteOrderLists.rejected, (state, action) => {
      state.deleteOrderLists.isLoading = false;
      state.deleteOrderLists.data = {};
      state.deleteOrderLists.error = action.payload;
    });
    // getEcommerceOrder
    builder.addCase(getEcommerceOrder.pending, (state) => {
      state.getEcommerceOrder.isLoading = true;
    });
    builder.addCase(getEcommerceOrder.fulfilled, (state, action) => {
      state.getEcommerceOrder.isLoading = false;
      state.getEcommerceOrder.data = action.payload;
      state.getEcommerceOrder.error = null;
    });
    builder.addCase(getEcommerceOrder.rejected, (state, action) => {
      state.getEcommerceOrder.isLoading = false;
      state.getEcommerceOrder.data = {};
      state.getEcommerceOrder.error = action.payload;
    });
    // updateEcommerceOrder
    builder.addCase(updateEcommerceOrder.pending, (state) => {
      state.updateEcommerceOrder.isLoading = true;
    });
    builder.addCase(updateEcommerceOrder.fulfilled, (state, action) => {
      state.updateEcommerceOrder.isLoading = false;
      state.updateEcommerceOrder.data = action.payload;
      state.updateEcommerceOrder.error = null;
    });
    builder.addCase(updateEcommerceOrder.rejected, (state, action) => {
      state.updateEcommerceOrder.isLoading = false;
      state.updateEcommerceOrder.data = {};
      state.updateEcommerceOrder.error = action.payload;
    });
  },
});

// export const { emptyProfileSettingsForCommon } = ecommerceSlice.actions;

export default ecommerceSlice.reducer;
