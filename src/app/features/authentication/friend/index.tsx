import React, { memo } from 'react';
import {
  Animated as AnimatedRN,
  Dimensions,
  NativeModules,
} from 'react-native';

import isEqual from 'react-fast-compare';

import { Block, Screen } from '@components';

const { width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const statusBarOffset = 0;
const MAIN_HEADER_HEIGHT = 60;
const FriendComponent = () => {
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
        position: 'relative',
      }}>
      <Screen
        unsafe
        statusBarStyle="dark-content"
        bottomInsetColor="transparent"
        backgroundColor={'transparent'}>
        {renderTopBar()}
      </Screen>
    </Block>
  );
};

export const Friend = memo(FriendComponent, isEqual);
