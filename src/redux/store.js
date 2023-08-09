import { configureStore } from '@reduxjs/toolkit';
import foodApiReducer from './homeFoodApi';
import orderReducer from './orderListApi';

export const store = configureStore({
  reducer: {
    order: orderReducer,
    api: foodApiReducer,
  },
});
