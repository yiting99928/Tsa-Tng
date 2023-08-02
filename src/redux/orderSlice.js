import { createSlice } from '@reduxjs/toolkit';
export const orderSlice = createSlice({
  name: 'order',
  initialState: [],
  reducers: {
    initOrder(state, action) {
      state = [];
      return state.concat(action.payload);
    },
    createOrder(state, action) {
      const newFood = action.payload;
      const existingItem = state.find(
        (orderItem) =>
          orderItem.name === newFood.name && orderItem.note === newFood.note
      );

      if (existingItem) {
        existingItem.qty += newFood.qty;
      } else {
        state.push(newFood);
      }
    },
    removeOrder(state, action) {
      const index = state.findIndex((order) => order.id === action.payload);
      state.splice(index, 1);
    },
    updateOrder(state, action) {
      const index = state.findIndex((order) => order.id === action.payload.id);
      state[index] = action.payload;
    },
  },
});
export const { initOrder, createOrder, removeOrder, updateOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
