import { takeLatestListeners } from '@listener';
import { ApiConstants, NetWorkService } from '@networking';

import { welcomeActions } from '../action-slice/welcome';

takeLatestListeners()({
  actionCreator: welcomeActions.onCustomize,
  effect: async (action, listenerApi) => {
    const { body, onSucceeded, onFailure } = action.payload;
    listenerApi.dispatch(welcomeActions.cutomizeRequst());
    const response = await NetWorkService.Post({
      url: ApiConstants.CUSTOMIZE,
      body,
    });
    console.log('response: ', response);
    if (!response) {
      if (onFailure) {
        onFailure('failed');
      }
      listenerApi.dispatch(welcomeActions.cutomizeFail('Error: abc'));
      return;
    }
    if (onSucceeded) {
      onSucceeded();
    }
    listenerApi.dispatch(welcomeActions.cutomizeSuccess());
  },
});
