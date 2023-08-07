import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isShowPopup: false,
  isShowCart: false,
};
export const infoSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showPopUp: (state) => {
      state.isShowPopup = true;
    },
    closePopUp: (state) => {
      state.isShowPopup = false;
    },
    showCart: (state) => {
      state.isShowCart = true;
    },
    closeCart: (state) => {
      state.isShowCart = false;
    },
  },
});

export const { showPopUp, closePopUp, showCart, closeCart } = infoSlice.actions;

export default infoSlice.reducer;
