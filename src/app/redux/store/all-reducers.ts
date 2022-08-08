import { appReducer, loginReducer, welcomeReducer } from '@redux-slice';
import { combineReducers } from '@reduxjs/toolkit';

export const allReducer = combineReducers({
  app: appReducer,
  welcome: welcomeReducer,
  login: loginReducer,
});

export type RootState = ReturnType<typeof allReducer>;
