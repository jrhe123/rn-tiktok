import React, { memo, useRef, useState } from 'react';

import isEqual from 'react-fast-compare';

import { dispatch } from '@common';
import { Block, Screen, Text } from '@components';
import { useAnimatedState } from '@hooks';

const WelcomeComponent = () => {
  return (
    <Block block paddingTop={0} paddingHorizontal={15}>
      <Screen
        bottomInsetColor="transparent"
        scroll
        style={{ paddingVertical: 0, paddingHorizontal: 10 }}
        backgroundColor={'transparent'}>
        <Block paddingVertical={15} middle direction={'row'}>
          <Text>this is welcome component</Text>
        </Block>
      </Screen>
    </Block>
  );
};

export const Welcome = memo(WelcomeComponent, isEqual);
