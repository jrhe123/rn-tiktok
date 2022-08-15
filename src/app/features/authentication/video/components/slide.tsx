import React, { memo } from 'react';
import { Dimensions } from 'react-native';

import isEqual from 'react-fast-compare';

import { Block, Text } from '@components';

const { height, width } = Dimensions.get('window');
const SlideComponent = () => {
  return (
    <Block style={{ width, height }}>
      <Text fontSize={36} fontWeight="bold" color={'white'}></Text>
    </Block>
  );
};

export const Slide = memo(SlideComponent, isEqual);
