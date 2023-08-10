import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchFoodData = createAsyncThunk('api/fetchFoodData', async () => {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/yiting99928/Tsa-Tng/main/db.json'
    );
    const data = await response.json();
    return data.breakfasts;
  } catch (error) {
    throw new Error('Failed to fetch food data.');
  }
});

const initialState = {
  food: [],
  status: null,
};

const homeFoodApi = createSlice({
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
    builder.addCase(fetchFoodData.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export default homeFoodApi.reducer;
