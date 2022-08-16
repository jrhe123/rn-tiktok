import React, { memo } from 'react';
import {
  Animated as AnimatedRN,
  Dimensions,
  NativeModules,
  TouchableOpacity,
} from 'react-native';

import isEqual from 'react-fast-compare';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { Block } from '@components';

const { width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const statusBarOffset = 0;
const MAIN_HEADER_HEIGHT = 60;
const MENU_ICON_SIZE = 27;

const ProfileComponent = () => {
  console.log('hit Profile component');
  // render
  return (
    <Block
      block
      style={{
        backgroundColor: '#010101',
        position: 'relative',
      }}>
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
          <TouchableOpacity>
            <VectorIcon icon={'bx_menu'} color="white" size={30} />
          </TouchableOpacity>
        </Block>
        <AnimatedRN.Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Profile
        </AnimatedRN.Text>
      </Block>
    </Block>
  );
};

export const Profile = memo(ProfileComponent, isEqual);
