import { SLICE_NAME } from '@config/type';
import { AppState, ModalType } from '@model/app';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeType } from '@theme';

const initialAppState: AppState = {
  internetState: true,
  profile: {},
  token: undefined,
  welcomeComplete: false,
  askRegister: false,
  /**
   * default true to load app
   */
  loadingApp: false,
  showDialog: false,
  theme: 'default',
  modalOpen: false,
  modalType: undefined,
};

const appSlice = createSlice({
  name: SLICE_NAME.APP,
  initialState: initialAppState,
  reducers: {
    onSetInternet: (state, { payload }: PayloadAction<boolean>) => {
      state.internetState = payload;
    },
    onSetToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    onSetWelcomeComplete: (state, { payload }: PayloadAction<boolean>) => {
      state.welcomeComplete = payload;
    },
    onSetAskRegisterAttempt: (state, { payload }: PayloadAction<boolean>) => {
      state.askRegister = payload;
    },
    onSetAppProfile: (state, { payload }: PayloadAction<unknown>) => {
      state.profile = payload;
    },
    onSetAppTheme: (state, { payload }: PayloadAction<ThemeType>) => {
      state.theme = payload;
    },
    onLoadApp: state => {
      state.loadingApp = true;
    },
    onLoadAppEnd: state => {
      state.loadingApp = false;
    },
    onStartProcess: state => {
      state.showDialog = true;
    },
    onEndProcess: state => {
      state.showDialog = false;
    },
    onLogout: state => {
      state.token = undefined;
      state.profile = {};
    },
    onModalOpen: (state, { payload }: PayloadAction<ModalType>) => {
      state.modalOpen = true;
      state.modalType = payload;
    },
    onModalClose: state => {
      state.modalOpen = false;
      state.modalType = undefined;
    },
  },
});

export const appActions = {
  onSetInternet: appSlice.actions.onSetInternet,
  onSetToken: appSlice.actions.onSetToken,
  onSetWelcomeComplete: appSlice.actions.onSetWelcomeComplete,
  onSetAskRegisterAttempt: appSlice.actions.onSetAskRegisterAttempt,
  onSetAppProfile: appSlice.actions.onSetAppProfile,
  onSetAppTheme: appSlice.actions.onSetAppTheme,
  onLoadApp: appSlice.actions.onLoadApp,
  onLoadAppEnd: appSlice.actions.onLoadAppEnd,
  onStartProcess: appSlice.actions.onStartProcess,
  onEndProcess: appSlice.actions.onEndProcess,
  onLogout: appSlice.actions.onLogout,
  onModalOpen: appSlice.actions.onModalOpen,
  onModalClose: appSlice.actions.onModalClose,
  //
  onPopupRegister: createAction(`${appSlice.name}/onPopupRegister`),
  onPopupRegisterConfirm: createAction(
    `${appSlice.name}/onPopupRegisterConfirm`,
  ),
};

export const { reducer } = appSlice;

export const { reducer: appReducer } = appSlice;
