import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './homeFoodApi';
import orderReducer from './orderListApi';

export const store = configureStore({
  reducer: {
    order: orderReducer,
    api: apiReducer,
  },
});
