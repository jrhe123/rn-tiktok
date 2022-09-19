import React, { memo } from 'react';
import { Dimensions } from 'react-native';

import isEqual from 'react-fast-compare';

import { Block, Text } from '@components';

// import { Logo } from './logo';

const { height, width } = Dimensions.get('window');
const SlideComponent = () => {
  return (
    <Block style={{ width, height, borderWidth: 1, borderColor: 'red' }}>
      <Text fontSize={36} fontWeight="bold" color={'white'}>
        123
      </Text>
      {/* <Logo /> */}
    </Block>
  );
};

export const Slide = memo(SlideComponent, isEqual);
