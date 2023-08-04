import { createSlice } from '@reduxjs/toolkit';

const findExistingItemIndex = (state, action) => {
  return state.findIndex(
    (order) =>
      order.name === action.payload.name && order.note === action.payload.note
  );
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: [],
  reducers: {
    initOrder(state, action) {
      return (state = action.payload);
    },
    createOrder(state, action) {
      const existingItemIndex = findExistingItemIndex(state, action);

      if (existingItemIndex !== -1) {
        state[existingItemIndex].qty += action.payload.qty;
      } else {
        state.push(action.payload);
      }
    },
    removeOrder(state, action) {
      const index = findExistingItemIndex(state, action);
      state.splice(index, 1);
    },
    updateOrder(state, action) {
      const index = findExistingItemIndex(state, action);
      state[index] = action.payload;
    },
  },
});

export const { initOrder, createOrder, removeOrder, updateOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
