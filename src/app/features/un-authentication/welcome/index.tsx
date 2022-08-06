import React, { memo, useRef, useState, useCallback } from 'react';
import { View } from 'react-native';

import isEqual from 'react-fast-compare';

import { dispatch } from '@common';
import { Block, LocalImage, Screen, Text } from '@components';
import { useAnimatedState } from '@hooks';

const WelcomeComponent = () => {
  return (
    <Block block paddingTop={0} paddingHorizontal={15}>
      <Screen
        statusBarStyle="dark-content"
        bottomInsetColor="transparent"
        style={{ paddingVertical: 0, paddingHorizontal: 10 }}
        backgroundColor={'transparent'}>
        <Block paddingVertical={15} direction={'column'}>
          <Text fontSize={36} fontWeight="bold">
            Videos to
          </Text>
          <Text fontSize={36} fontWeight="bold">
            Make
          </Text>
          <Text fontSize={36} fontWeight="bold">
            Your Day
          </Text>
        </Block>
        <Block position={'absolute'} left={0} bottom={30}>
          <View
            pointerEvents={'none'}
            style={{
              width: 140,
              height: 140,
            }}>
            <LocalImage resizeMode={'contain'} source={'welcome_tiktok_logo'} />
          </View>
        </Block>
      </Screen>
    </Block>
  );
};

export const Welcome = memo(WelcomeComponent, isEqual);
