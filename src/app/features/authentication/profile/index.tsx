import React, { memo } from 'react';
import {
  Animated as AnimatedRN,
  Dimensions,
  NativeModules,
  TouchableOpacity,
} from 'react-native';

import isEqual from 'react-fast-compare';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { Block, Screen } from '@components';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions } from '@redux-slice';

const { width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const statusBarOffset = 0;
const MAIN_HEADER_HEIGHT = 60;
const MENU_ICON_SIZE = 30;

const ProfileComponent = () => {
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
      <Block
        style={{
          position: 'absolute',
          right: 6,
          top: 0,
          height: MAIN_HEADER_HEIGHT,
          width: MAIN_HEADER_HEIGHT,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigate(APP_SCREEN.SETTINGS);
          }}>
          <VectorIcon icon={'bx_menu'} size={MENU_ICON_SIZE} />
        </TouchableOpacity>
      </Block>
      <AnimatedRN.Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Profile
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

export const Profile = memo(ProfileComponent, isEqual);
