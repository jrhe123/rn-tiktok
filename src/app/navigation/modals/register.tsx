import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated as AnimatedRN,
  Dimensions,
  Easing,
  FlatList,
  NativeModules,
  ScrollView,
} from 'react-native';
import isEqual from 'react-fast-compare';

import { Block, Button, Icon, Text } from '@components';

const RegisterComponent = () => {
  return (
    <Block
      block
      style={{
        position: 'relative',
      }}>
      <Text>register here</Text>
    </Block>
  );
};

export const Register = memo(RegisterComponent, isEqual);
