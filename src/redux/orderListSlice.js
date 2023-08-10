import { createSlice } from '@reduxjs/toolkit';

const findExistingItem = (state, action) => {
  return state.items.findIndex(
    (order) =>
      order.name === action.payload.name && order.note === action.payload.note
  );
};

const findUpdateItem = (state, action) => {
  return state.items.findIndex((order) => order.time === action.payload.time);
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    selectedFood: null,
    items: [],
  },
  reducers: {
    setSelectedFood(state, action) {
      state.selectedFood = action.payload;
    },
    initOrder(state, action) {
      state.items = action.payload;
    },
    createOrder(state, action) {
      const existingItemIndex = findExistingItem(state, action);

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].qty += action.payload.qty;
      } else {
        state.items.push(action.payload);
      }
    },
    removeOrder(state, action) {
      const index = findExistingItem(state, action);
      state.items.splice(index, 1);
    },
    updateOrder(state, action) {
      const index = findUpdateItem(state, action);
      state.items[index] = action.payload;
    },
  },
});

export const {
  setSelectedFood,
  initOrder,
  createOrder,
  removeOrder,
  updateOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
