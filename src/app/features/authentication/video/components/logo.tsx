import React, { memo, useEffect, useState } from 'react';
import { Animated as AnimatedRN } from 'react-native';

import isEqual from 'react-fast-compare';

import { ImageTypes } from '@assets/image';
import { Block, LocalImage, Text } from '@components';
import { useInterval } from '@hooks';

const IMAGES: ImageTypes[] = [
  'tk_frame1',
  'tk_frame2',
  'tk_frame3',
  'tk_frame4',
  'tk_frame5',
];
const aniShakeVValue = new AnimatedRN.Value(0);
const aniShakeHValue = new AnimatedRN.Value(0);

const LogoComponent = () => {
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    startShake();
  }, []);

  useInterval(() => {
    let temp = index;
    if (index === 4) temp = -1;
    setIndex(temp + 1);
  }, 30);

  const startShake = () => {
    AnimatedRN.loop(
      AnimatedRN.sequence([
        AnimatedRN.timing(aniShakeVValue, {
          toValue: 1,
          duration: 30,
          useNativeDriver: false,
        }),
        AnimatedRN.timing(aniShakeVValue, {
          toValue: -1,
          duration: 30,
          useNativeDriver: false,
        }),
        AnimatedRN.timing(aniShakeVValue, {
          toValue: 1,
          duration: 30,
          useNativeDriver: false,
        }),
        AnimatedRN.timing(aniShakeVValue, {
          toValue: 0,
          duration: 30,
          useNativeDriver: false,
        }),
      ]),
      {
        iterations: -1,
      },
    ).start();
    AnimatedRN.loop(
      AnimatedRN.sequence([
        AnimatedRN.timing(aniShakeHValue, {
          toValue: 2,
          duration: 30,
          useNativeDriver: false,
        }),
        AnimatedRN.timing(aniShakeHValue, {
          toValue: -2,
          duration: 30,
          useNativeDriver: false,
        }),
        AnimatedRN.timing(aniShakeHValue, {
          toValue: 2,
          duration: 30,
          useNativeDriver: false,
        }),
        AnimatedRN.timing(aniShakeHValue, {
          toValue: 0,
          duration: 30,
          useNativeDriver: false,
        }),
      ]),
      {
        iterations: -1,
      },
    ).start();
  };

  return (
    <Block direction={'row'} alignItems={'center'}>
      <AnimatedRN.View
        style={{
          transform: [{ translateY: aniShakeVValue }],
        }}>
        <Block style={{ marginRight: 3, width: 18, height: 21 }}>
          <LocalImage resizeMode={'cover'} source={IMAGES[index]} />
        </Block>
      </AnimatedRN.View>
      <Block>
        <AnimatedRN.View
          style={{
            transform: [{ translateX: aniShakeHValue }],
          }}>
          <Text fontSize={12} fontWeight="bold" color={'white'}>
            TikTok
          </Text>
        </AnimatedRN.View>
      </Block>
    </Block>
  );
};

export const Logo = memo(LogoComponent, isEqual);
