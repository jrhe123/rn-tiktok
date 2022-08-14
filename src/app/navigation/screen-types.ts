export enum APP_SCREEN {
  UN_AUTHORIZE = 'UN_AUTHORIZE',
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  WELCOME = 'WELCOME',
  DETAIL = 'DETAIL',
  REGISTER = 'REGISTER',
  AUTHORIZE = 'AUTHORIZE',
  HOME = 'HOME',
  // tab
  VIDEO = 'VIDEO',
  FRIEND = 'FRIEND',
  RECORD = 'RECORD',
  INBOX = 'INBOX',
  PROFILE = 'PROFILE',
}

export type UnAuthorizeParamsList = {
  [APP_SCREEN.LOGIN]: undefined;
  [APP_SCREEN.WELCOME]: undefined;
  [APP_SCREEN.DETAIL]: {
    id?: number;
  };
  [APP_SCREEN.REGISTER]: undefined;
  [APP_SCREEN.SPLASH]: undefined;
};
export type AuthorizeParamsList = {
  [APP_SCREEN.HOME]: undefined;
  //
  [APP_SCREEN.VIDEO]: undefined;
  [APP_SCREEN.FRIEND]: undefined;
  [APP_SCREEN.RECORD]: undefined;
  [APP_SCREEN.INBOX]: undefined;
  [APP_SCREEN.PROFILE]: undefined;
};
export type RootStackParamList = {
  [APP_SCREEN.UN_AUTHORIZE]: undefined;
  [APP_SCREEN.AUTHORIZE]: undefined;
} & UnAuthorizeParamsList &
  AuthorizeParamsList;
