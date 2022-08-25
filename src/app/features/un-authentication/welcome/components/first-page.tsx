import React, { memo, useEffect } from 'react';
import { Animated as AnimatedRN, Easing } from 'react-native';

import isEqual from 'react-fast-compare';

import { Block, LocalImage, Screen, Text } from '@components';
import { useSwipe } from '@hooks';

const LOGO_SIZE = 140;
const aniLogoValue = new AnimatedRN.Value(0);

const FirstPComponent = ({ handleConfirm }: { handleConfirm: () => void }) => {
  //
  const onSwipeUp = () => {
    handleConfirm();
  };
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeUp, null, 6);
  //
  const translateY = aniLogoValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0, -10, 0],
  });
  const opacity = aniLogoValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });
  useEffect(() => {
    // animated logo
    AnimatedRN.timing(aniLogoValue, {
      toValue: 1,
      delay: 500,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <Block
      block
      paddingTop={0}
      paddingHorizontal={15}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}>
      <Screen
        statusBarStyle="dark-content"
        bottomInsetColor="transparent"
        style={{ paddingVertical: 0, paddingHorizontal: 10 }}
        backgroundColor={'transparent'}>
        <AnimatedRN.View
          style={{
            transform: [{ translateY }],
            opacity,
          }}>
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
        </AnimatedRN.View>
        <AnimatedRN.View
          style={{
            transform: [{ translateY }],
            opacity,
            width: LOGO_SIZE,
            height: LOGO_SIZE,
            position: 'absolute',
            left: 0,
            bottom: 30,
          }}>
          <Block pointerEvents={'none'} width={140} height={140}>
            <LocalImage resizeMode={'contain'} source={'welcome_tiktok_logo'} />
          </Block>
        </AnimatedRN.View>
      </Screen>
    </Block>
  );
};

export const FirstP = memo(FirstPComponent, isEqual);
