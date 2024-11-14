import { combineReducers } from 'redux';

// Front
import mainHomeReducer from '@/slices/main_home/reducer';
import commonApiReducer from './dashboard/commonApi/reducer';
import ecommerceReducer from './dashboard/ecommerce/reducer';
import playerDashboardReducer from './dashboard/playerDashboard/reducer';
import superAdminReducer from './dashboard/superAdminDashboard/reducer';
import homeReducer from './home/reducer';
import LayoutReducer from './layouts/reducer';

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Home: homeReducer,
  SuperAdminDashboard: superAdminReducer,
  PlayerDashboard: playerDashboardReducer,
  CommonApi: commonApiReducer,
  MainHome: mainHomeReducer,
  Ecommerce: ecommerceReducer,
});

export default rootReducer;
