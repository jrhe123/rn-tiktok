/* eslint-disable @typescript-eslint/no-explicit-any */
import { SLICE_NAME } from '@config/type';
import { HistoryProps, HomeState } from '@model/home';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: HomeState = {
  loading: false,
  error: '',
  history: [],
};

const homeSlice = createSlice({
  name: SLICE_NAME.HOME,
  initialState: initialState,
  reducers: {
    updateHistory: (state, { payload }: PayloadAction<HistoryProps[]>) => {
      state.history = payload;
    },
  },
});

export const homeActions = { ...homeSlice.actions };
export const homeReducer = homeSlice.reducer;
