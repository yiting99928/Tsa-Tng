import { configureStore } from '@reduxjs/toolkit';
import foodApiReducer from './homeFoodApi';
import orderReducer from './orderListSlice';

export const store = configureStore({
  reducer: {
    order: orderReducer,
    api: foodApiReducer,
  },
});
