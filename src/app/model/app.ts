/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusBarStyle } from 'react-native';

import { ThemeType } from '@theme';

export interface AppState {
  internetState: boolean;

  profile: any;

  token: string | undefined;

  welcomeComplete: boolean;

  loadingApp: boolean;

  showDialog: boolean;

  theme: ThemeType;

  statusBar: StatusBarStyle;
}
