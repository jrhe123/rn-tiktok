import React, { memo, useEffect } from 'react';
import { Animated as AnimatedRN, Easing } from 'react-native';

import isEqual from 'react-fast-compare';

import { Block, Button, Icon, LocalImage, Text } from '@components';

const LOGO_SIZE = 30;
const BTN_COLOR = '#E8445A';
const aniLogoValue = new AnimatedRN.Value(0);
const RegisterPopupComponent = ({
  handleConfirm,
  handleClose,
}: {
  handleConfirm: () => void;
  handleClose: () => void;
}) => {
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
      delay: 200,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Block
      block
      style={{
        padding: 24,
        alignItems: 'center',
        position: 'relative',
      }}>
      <Block
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          width: 30,
          height: 30,
        }}>
        <Button onPress={handleClose}>
          <Icon icon={'close'} size={30} />
        </Button>
      </Block>
      <AnimatedRN.View
        style={{
          transform: [{ translateY }],
          opacity,
          width: LOGO_SIZE,
          height: LOGO_SIZE,
          marginRight: 24,
        }}>
        <Block pointerEvents={'none'} width={42} height={42}>
          <LocalImage resizeMode={'contain'} source={'pure_tiktok'} />
        </Block>
      </AnimatedRN.View>
      <Block style={{ marginTop: 36 }}>
        <Text
          color={'black'}
          fontSize={18}
          fontWeight={'bold'}
          lineHeight={24}
          center>
          Log in to follow accounts and like or comment on videos
        </Text>
      </Block>
      <Block style={{ marginTop: 12, marginBottom: 18 }}>
        <Text fontSize={14} center color={'#504F54'}>
          TikTok is more fun when you follow and interact with your friends.
        </Text>
      </Block>
      <Button
        style={{
          backgroundColor: BTN_COLOR,
          paddingVertical: 15,
          width: '100%',
        }}
        onPress={handleConfirm}>
        <Text color={'white'} fontSize={15} center>
          Log in or sign up
        </Text>
      </Button>
    </Block>
  );
};

export const RegisterPopup = memo(RegisterPopupComponent, isEqual);
