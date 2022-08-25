export enum APP_SCREEN {
  AUTHORIZE = 'AUTHORIZE',
  UN_AUTHORIZE = 'UN_AUTHORIZE',
  SPLASH = 'SPLASH',
  DETAIL = 'DETAIL',
  //
  WELCOME = 'WELCOME',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  //
  INFO = 'INFO',
  TERMS_OF_SERVICE = 'TERMS_OF_SERVICE',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  // tab
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
  [APP_SCREEN.LOGIN]: undefined;
  [APP_SCREEN.REGISTER]: undefined;
  [APP_SCREEN.WELCOME]: undefined;
  [APP_SCREEN.SEARCH]: undefined;
  //
  [APP_SCREEN.INFO]: undefined;
  [APP_SCREEN.TERMS_OF_SERVICE]: undefined;
  [APP_SCREEN.PRIVACY_POLICY]: undefined;
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
