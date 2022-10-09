/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeType } from '@theme';

export interface AppState {
  internetState: boolean;

  profile: any;

  token: string | undefined;

  welcomeComplete: boolean;

  askRegister: boolean;

  askLanguage: boolean;

  loadingApp: boolean;

  showDialog: boolean;

  theme: ThemeType;

  modalOpen: boolean;

  modalType: ModalType | undefined;
}

export type ModalType =
  | 'REGISTER'
  | 'REGISTER_POPUP'
  | 'SWIPE_UP_ANI_POPUP'
  | 'COUNTRY_LIST'
  | 'LANGUAGE_LIST'
  | 'VIEW_FRIEND_POST'
  | 'VIDEO_SHARE'
  | 'VIDEO_COMMENT'
  | 'PHOTO_LIST'
  | 'OTHER';
