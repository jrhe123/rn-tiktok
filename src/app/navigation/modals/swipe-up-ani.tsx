import React, { memo, useEffect } from 'react';
import { Animated as AnimatedRN, Dimensions, Easing } from 'react-native';

import isEqual from 'react-fast-compare';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { Block, Icon, Text } from '@components';
import { useSwipe } from '@hooks';

const { width } = Dimensions.get('window');
const HAND_SIZE = 72;
const PHONE_HEIGHT = 120;

const aniValue = new AnimatedRN.Value(0);
const SwipeUpAniComponent = ({
  handleConfirm,
}: {
  handleConfirm: () => void;
}) => {
  const onSwipeUp = () => {
    handleConfirm();
  };
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeUp, null, 6);

  const spin = aniValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: ['0deg', '60deg', '0deg'],
  });

  useEffect(() => {
    // animated hand
    AnimatedRN.loop(
      AnimatedRN.timing(aniValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  return (
    <Block block onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <Block
        style={{
          width: '100%',
          alignItems: 'center',
          position: 'relative',
        }}>
        <Icon icon={'phone'} size={170} color={'white'} />
        <Block
          style={{
            position: 'absolute',
            top: 15,
            left: (width - 48) / 2 - 30,
          }}>
          <VectorIcon icon={'bx_play'} color={'white'} size={60} />
        </Block>
        {/* animated hand */}
        <Block
          width={HAND_SIZE}
          height={HAND_SIZE}
          style={{
            transform: [{ rotate: '-90deg' }],
          }}
          position="absolute"
          top={(PHONE_HEIGHT - HAND_SIZE) / 2 + 36}
          left={width / 2 - 12}
          zIndex={99}>
          <AnimatedRN.View
            style={{
              transform: [{ rotate: spin }],
              width: 200,
              height: 200,
            }}>
            <Icon icon={'hand'} size={HAND_SIZE} />
          </AnimatedRN.View>
        </Block>
      </Block>
      <Block style={{ marginTop: 36 }}>
        <Text
          fontSize={27}
          fontWeight="bold"
          color={'white'}
          textAlign={'center'}>
          Swipe up for more
        </Text>
      </Block>
    </Block>
  );
};

export const SwipeUpAni = memo(SwipeUpAniComponent, isEqual);
