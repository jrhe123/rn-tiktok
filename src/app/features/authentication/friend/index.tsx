import React, { memo, useEffect, useState } from 'react';
import {
  Animated as AnimatedRN,
  Dimensions,
  NativeModules,
} from 'react-native';

import isEqual from 'react-fast-compare';

import { dispatch } from '@common';
import { Block, Screen } from '@components';
import { appActions } from '@redux-slice';

const { width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const statusBarOffset = 0;
const MAIN_HEADER_HEIGHT = 60;

const FriendComponent = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuth) {
      dispatch(appActions.onModalOpen('REGISTER'));
    }
  }, [isAuth]);

  const renderTopBar = () => (
    <Block
      style={{
        marginTop: statusBarHeight + statusBarOffset,
        width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: MAIN_HEADER_HEIGHT,
        position: 'relative',
      }}>
      <AnimatedRN.Text
        style={{
          fontSize: 18,
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Friend
      </AnimatedRN.Text>
    </Block>
  );
  // render
  return (
    <Block
      block
      style={{
        backgroundColor: '#010101',
        position: 'relative',
      }}>
      <Screen
        unsafe
        statusBarStyle="light-content"
        bottomInsetColor="transparent"
        backgroundColor={'transparent'}>
        {renderTopBar()}
      </Screen>
    </Block>
  );
};

export const Friend = memo(FriendComponent, isEqual);
