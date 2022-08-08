/* eslint-disable @typescript-eslint/no-explicit-any */
import { SLICE_NAME } from '@config/type';
import { WelcomeState } from '@model/welcome';
import * as Action from '@redux-action-type/welcome';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: WelcomeState = {
  loading: false,
  error: '',
};

const welcomeSlice = createSlice({
  name: SLICE_NAME.WELCOME,
  initialState: initialState,
  reducers: {
    cutomizeRequst: state => {
      state.loading = true;
    },
    cutomizeSuccess: state => {
      state.loading = false;
    },
    cutomizeFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const onCustomize = createAction(
  Action.CUSTOMIZE,
  (body: any, onSucceeded?: () => void, onFailure?: (msg: string) => void) => ({
    payload: {
      body,
      onSucceeded,
      onFailure,
    },
  }),
);

export const welcomeActions = { ...welcomeSlice.actions, onCustomize };
export const welcomeReducer = welcomeSlice.reducer;
