import React, { memo } from 'react';
import { Dimensions } from 'react-native';

import isEqual from 'react-fast-compare';

import { Block, Text } from '@components';

const BOTTOM_BAR_HEIGHT = 90;
const { height, width } = Dimensions.get('window');
const SlideComponent = () => {
  return (
    <Block
      style={{
        width,
        height: height - BOTTOM_BAR_HEIGHT,
      }}>
      <Text fontSize={36} fontWeight="bold" color={'white'}>
        123
      </Text>
    </Block>
  );
};

export const Slide = memo(SlideComponent, isEqual);
