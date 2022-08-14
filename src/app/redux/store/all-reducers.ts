import {
  appReducer,
  homeReducer,
  loginReducer,
  welcomeReducer,
} from '@redux-slice';
import { combineReducers } from '@reduxjs/toolkit';

export const allReducer = combineReducers({
  app: appReducer,
  welcome: welcomeReducer,
  login: loginReducer,
  home: homeReducer,
});

export type RootState = ReturnType<typeof allReducer>;
