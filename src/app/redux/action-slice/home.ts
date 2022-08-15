/* eslint-disable @typescript-eslint/no-explicit-any */
import { SLICE_NAME } from '@config/type';
import { HomeState } from '@model/home';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: HomeState = {
  loading: false,
  error: '',
};

const homeSlice = createSlice({
  name: SLICE_NAME.HOME,
  initialState: initialState,
  reducers: {},
});

export const homeActions = { ...homeSlice.actions };
export const homeReducer = homeSlice.reducer;
