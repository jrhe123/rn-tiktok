import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Block, Screen, Text } from '@components';

const FirstPComponent = () => {
  return (
    <Block block paddingTop={0} paddingHorizontal={15}>
      <Screen
        statusBarStyle="dark-content"
        bottomInsetColor="transparent"
        style={{ paddingVertical: 0, paddingHorizontal: 10 }}
        backgroundColor={'transparent'}>
        <Text fontSize={36} fontWeight="bold">
          FirstPComponent
        </Text>
      </Screen>
    </Block>
  );
};

export const FirstP = memo(FirstPComponent, isEqual);
