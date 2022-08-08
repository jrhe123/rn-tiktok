import {
  checkKeyInObject,
  STORAGE_KEY_APP_THEME,
  STORAGE_KEY_TOKEN,
  STORAGE_WELCOME_COMPLETE,
} from '@common';
import { takeLatestListeners } from '@listener';
import { MyAppTheme, ThemeType } from '@theme';
import { loadString } from '@utils/storage';

import { appActions } from '../action-slice/app';

takeLatestListeners()({
  actionCreator: appActions.onLoadApp,
  effect: async (_, listenerApi) => {
    const appTheme = loadString(STORAGE_KEY_APP_THEME);
    const token = loadString(STORAGE_KEY_TOKEN);
    const welcomeComplete = loadString(STORAGE_WELCOME_COMPLETE);
    if (typeof token === 'string') {
      listenerApi.dispatch(appActions.onSetToken(token));
    }
    if (typeof welcomeComplete === 'string') {
      listenerApi.dispatch(appActions.onSetWelcomeComplete(true));
    }
    if (
      typeof appTheme === 'string' &&
      checkKeyInObject(MyAppTheme, appTheme)
    ) {
      listenerApi.dispatch(appActions.onSetAppTheme(appTheme as ThemeType));
    }
    listenerApi.dispatch(appActions.onLoadAppEnd());
  },
});
