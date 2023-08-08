import { configureStore } from '@reduxjs/toolkit';
import foodApiReducer from './homeFoodApi';
import infoReducer from './infoStateApi';
import orderReducer from './orderListApi';

export const store = configureStore({
  reducer: {
    order: orderReducer,
    api: foodApiReducer,
    info: infoReducer,
  },
});
