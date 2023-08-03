import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './apiSlice';
import counterReducer from './counterSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    order: orderReducer,
    api: apiReducer,
  },
});
