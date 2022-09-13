import React, { useEffect } from 'react';
import { ColorValue, Dimensions, NativeModules } from 'react-native';

import { dispatch, RXStore } from '@common';
import {
  Block,
  hideLoading,
  Modal,
  PortalHost,
  ProgressDialog,
  showLoading,
  SnackBar,
} from '@components';
import { ImageTransition } from '@components/light-box/image-transition';
import { useSelector } from '@hooks';
import { AppModule } from '@native-module';
import { navigationRef } from '@navigation/navigation-service';
import { RootNavigation } from '@navigation/root-navigator';
import { NavigationContainer } from '@react-navigation/native';
import { appActions } from '@redux-slice';
import { MyAppTheme } from '@theme';

import { CountryList } from './modals/country-list';
import { LanguageList } from './modals/language-list';
import { Register } from './modals/register';
import { RegisterPopup } from './modals/register-pop';
import { SwipeUpAni } from './modals/swipe-up-ani';
import { ViewFriendPost } from './modals/view-friend-post';

const { width, height } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});

export const AppContainer = () => {
  // state
  const { loadingApp, showDialog, theme, modalOpen, modalType } = useSelector(
    state => state.app,
  );

  // effect
  useEffect(() => {
    dispatch(appActions.onLoadApp());
  }, []);

  useEffect(() => {
    if (showDialog) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [showDialog]);

  useEffect(() => {
    if (theme === 'dark') {
      AppModule.setIQKeyboardOption({
        keyboardAppearance: 'dark',
      });
    } else {
      AppModule.setIQKeyboardOption({
        keyboardAppearance: 'light',
      });
    }
  }, [theme]);

  const hideDrop = () => {
    dispatch(appActions.onModalClose());
  };

  // render modal content
  const renderModalContent = () => {
    let children: React.ReactNode;
    let type = 'MODAL';
    let backgroundColor: ColorValue | undefined;
    switch (modalType) {
      case 'REGISTER':
        children = <Register />;
        backgroundColor = 'transparent';
        type = 'MODAL';
        break;
      case 'REGISTER_POPUP':
        children = (
          <RegisterPopup
            handleConfirm={() => {
              dispatch(appActions.onPopupRegisterConfirm());
            }}
            handleClose={hideDrop}
          />
        );
        backgroundColor = '#FFFFFF';
        type = 'POP_UP';
        break;
      case 'SWIPE_UP_ANI_POPUP':
        children = <SwipeUpAni handleConfirm={hideDrop} />;
        backgroundColor = 'transparent';
        type = 'POP_UP';
        break;
      case 'COUNTRY_LIST':
        children = <CountryList handleConfirm={hideDrop} />;
        backgroundColor = 'transparent';
        type = 'MODAL';
        break;
      case 'LANGUAGE_LIST':
        children = <LanguageList handleConfirm={hideDrop} />;
        backgroundColor = 'transparent';
        type = 'MODAL';
        break;
      case 'VIEW_FRIEND_POST':
        children = <ViewFriendPost handleConfirm={hideDrop} />;
        backgroundColor = 'transparent';
        type = 'MODAL';
        break;
      default:
        break;
    }
    return (
      <Block
        style={[
          type === 'POP_UP'
            ? {
                height: (1 / 3) * height,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                width: width - 48,
              }
            : {
                height: height - statusBarHeight,
                width,
              },
          {
            backgroundColor,
            overflow: 'hidden',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
        ]}>
        {children}
      </Block>
    );
  };

  // render
  return (
    <NavigationContainer ref={navigationRef} theme={MyAppTheme[theme]}>
      <>
        {!loadingApp && (
          <>
            <PortalHost name={'AppModal'} />
            <RootNavigation />
            <ProgressDialog />
            <SnackBar />
            <ImageTransition />
            {/* global */}
            <Modal
              onBackdropPress={hideDrop}
              onBackButtonPress={hideDrop}
              animatedIn={'slideInUp'}
              hasGesture={false}
              animatedOut={
                modalType?.includes('POPUP') ? 'slideOutUp' : 'slideOutDown'
              }
              style={[
                {
                  display: 'flex',
                  justifyContent: modalType?.includes('POPUP')
                    ? 'center'
                    : 'flex-end',
                  alignItems: 'center',
                  marginHorizontal: 0,
                  marginVertical: 0,
                },
              ]}
              backdropOpacity={0.3}
              isVisible={modalOpen}>
              {renderModalContent()}
            </Modal>
          </>
        )}
        <RXStore />
      </>
    </NavigationContainer>
  );
};
