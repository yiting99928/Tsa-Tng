import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isShowPopup: false,
};
export const infoState = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showPopUp: (state) => {
      state.isShowPopup = true;
    },
    closePopUp: (state) => {
      state.isShowPopup = false;
    },
  },
});

export const { showPopUp, closePopUp } = infoState.actions;

export default infoState.reducer;
