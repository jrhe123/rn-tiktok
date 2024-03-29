export enum APP_SCREEN {
  AUTHORIZE = 'AUTHORIZE',
  UN_AUTHORIZE = 'UN_AUTHORIZE',
  SPLASH = 'SPLASH',
  DETAIL = 'DETAIL',
  //
  WELCOME = 'WELCOME',
  PHONE_EMAIL = 'PHONE_EMAIL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  SEARCH = 'SEARCH',
  SEARCH_RESULT = 'SEARCH_RESULT',
  FIND_FRIEND = 'FIND_FRIEND',
  SCANNER = 'SCANNER',
  QR_SHARE = 'QR_SHARE',
  LIVE_STREAM = 'LIVE_STREAM',
  USER_VIDEO = 'USER_VIDEO',
  //
  HELP = 'HELP',
  INFO = 'INFO',
  TERMS_OF_SERVICE = 'TERMS_OF_SERVICE',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  SETTINGS = 'SETTINGS',
  // tab
  HOME = 'HOME',
  VIDEO = 'VIDEO',
  FRIEND = 'FRIEND',
  RECORD = 'RECORD',
  INBOX = 'INBOX',
  PROFILE = 'PROFILE',
}

export type UnAuthorizeParamsList = {
  [APP_SCREEN.SPLASH]: undefined;
  [APP_SCREEN.DETAIL]: {
    id?: number;
  };
  //
  [APP_SCREEN.WELCOME]: undefined;
  [APP_SCREEN.PHONE_EMAIL]: undefined;
  [APP_SCREEN.LOGIN]: undefined;
  [APP_SCREEN.REGISTER]: undefined;
  [APP_SCREEN.SEARCH]: undefined;
  [APP_SCREEN.SEARCH_RESULT]: undefined;
  [APP_SCREEN.FIND_FRIEND]: undefined;
  [APP_SCREEN.SCANNER]: undefined;
  [APP_SCREEN.QR_SHARE]: undefined;
  [APP_SCREEN.LIVE_STREAM]: undefined;
  [APP_SCREEN.USER_VIDEO]: undefined;
  //
  [APP_SCREEN.HELP]: undefined;
  [APP_SCREEN.INFO]: undefined;
  [APP_SCREEN.TERMS_OF_SERVICE]: undefined;
  [APP_SCREEN.PRIVACY_POLICY]: undefined;
  [APP_SCREEN.SETTINGS]: undefined;
};
export type AuthorizeParamsList = {
  [APP_SCREEN.HOME]: undefined;
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
