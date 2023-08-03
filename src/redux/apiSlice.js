import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchFoodData = createAsyncThunk('api/fetchFoodData', async () => {
  try {
    const response = await fetch('http://localhost:3000/breakfasts');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch food data.');
  }
});

const initialState = {
  food: {},
  status: false,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFoodData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchFoodData.fulfilled, (state, action) => {
      state.food = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchFoodData.rejected, (state, action) => {
      state.status = 'error';
    });
  },
});

export default apiSlice.reducer;
