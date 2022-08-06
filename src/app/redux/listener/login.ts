import { takeLatestListeners } from '@listener';
import { ApiConstants, NetWorkService } from '@networking';

import { loginActions } from '../action-slice/login';

takeLatestListeners()({
  actionCreator: loginActions.onLogin,
  effect: async (action, listenerApi) => {
    const { body, onSucceeded, onFailure } = action.payload;
    // await listenerApi.delay(1000);
    listenerApi.unsubscribe;
    const response = await NetWorkService.Post({
      url: ApiConstants.LOGIN,
      body,
    });
    if (!response) {
      if (onFailure) {
        onFailure('failed');
      }
      return;
    }
    if (onSucceeded) {
      onSucceeded();
    }
    listenerApi.dispatch(loginActions.loginSuccess());
  },
});
