import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Animated as AnimatedRN,
  Dimensions,
  Easing,
  ScrollView,
} from 'react-native';

import isEqual from 'react-fast-compare';

import { ImageTypes } from '@assets/image';
import { Block, Button, Icon, LocalImage, Screen, Text } from '@components';
import { useSwipe } from '@hooks';

const OPTION_BTN_COLOR = '#E8445A';
const GIF_IMAGES: ImageTypes[] = [
  'welcome_dog_tiktok',
  'welcome_cat_tiktok',
  'welcome_bird_tiktok',
  'welcome_seal_tiktok',
];
const CAROUSEL_WIDTH = 180;
const CAROUSEL_HEIGHT = 360;
const CAROUSEL_HAND_SIZE = 72;
const CAROUSEL_TOUCH_POINT_SIZE = 36;

const { width } = Dimensions.get('window');
const aniHandValue = new AnimatedRN.Value(0);

const ThirdPComponent = ({ handleConfirm }: { handleConfirm: () => void }) => {
  //
  const onSwipeUp = () => {
    handleConfirm();
  };
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeUp, null, 6);
  const _refRoot = useRef<ScrollView>(null);
  const fadeAnim = useRef(new AnimatedRN.Value(0)).current;
  const [index, setIndex] = useState<number>(0);
  const [enableBtn, setEnableBtn] = useState<boolean>(false);

  const spin = aniHandValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: ['0deg', '60deg', '0deg'],
  });
  const translateY = aniHandValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0, -100, 0],
  });
  const opacity = aniHandValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [1, 0, 0],
  });

  useEffect(() => {
    // animated hand
    AnimatedRN.loop(
      AnimatedRN.timing(aniHandValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
    // carousel auto scroll
    const id = setInterval(() => {
      setIndex(prevIndex => prevIndex + 1);
    }, 2000);
    // enable btn
    const tid = setTimeout(() => {
      setEnableBtn(true);
    }, 3000);
    return () => {
      clearInterval(id);
      clearTimeout(tid);
    };
  }, []);

  useEffect(() => {
    AnimatedRN.timing(fadeAnim, {
      delay: 3000,
      toValue: 1,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    const scrollIndex = index % GIF_IMAGES.length;
    if (_refRoot.current) {
      _refRoot.current?.scrollTo({
        x: 0,
        y: (CAROUSEL_HEIGHT + 20) * scrollIndex,
        animated: true,
      });
    }
  }, [index]);

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
        <Block paddingVertical={15} direction={'column'}>
          <Text fontSize={36} fontWeight="bold">
            Swipe up
          </Text>
        </Block>
        <Block paddingVertical={6} direction={'column'} paddingRight={30}>
          <Text fontSize={18} lineHeight={24}>
            Videos are personalized for you based on what you watch, like, and
            share.
          </Text>
        </Block>
        {/* carousel */}
        <Block
          marginTop={40}
          alignItems={'center'}
          height={CAROUSEL_HEIGHT}
          position="relative">
          {/* iphone frame */}
          <Block
            width={CAROUSEL_WIDTH}
            height={CAROUSEL_HEIGHT}
            position="absolute"
            top={0}
            left={width / 2 - 35 - CAROUSEL_WIDTH / 2}
            zIndex={99}>
            <LocalImage resizeMode={'contain'} source={'welcome_iphone'} />
          </Block>
          {/* animated touch point */}
          <Block
            width={CAROUSEL_TOUCH_POINT_SIZE}
            height={CAROUSEL_TOUCH_POINT_SIZE}
            position="absolute"
            top={(CAROUSEL_HEIGHT - CAROUSEL_TOUCH_POINT_SIZE) / 2 + 90}
            right={width / 2 - 35 - CAROUSEL_TOUCH_POINT_SIZE / 2}
            zIndex={99}>
            <AnimatedRN.View
              style={{
                transform: [{ translateY }],
                opacity,
                width: CAROUSEL_TOUCH_POINT_SIZE,
                height: CAROUSEL_TOUCH_POINT_SIZE,
                backgroundColor: '#ccc',
                borderRadius: CAROUSEL_TOUCH_POINT_SIZE,
              }}
            />
          </Block>
          {/* animated hand */}
          <Block
            width={CAROUSEL_HAND_SIZE}
            height={CAROUSEL_HAND_SIZE}
            style={{
              transform: [{ rotate: '-90deg' }],
            }}
            position="absolute"
            top={(CAROUSEL_HEIGHT - CAROUSEL_HAND_SIZE) / 2 + 90}
            right={width / 2 - 35 - CAROUSEL_WIDTH / 2 - 20}
            zIndex={99}>
            <AnimatedRN.View
              style={{
                transform: [{ rotate: spin }],
                width: 200,
                height: 200,
              }}>
              <Icon icon={'hand'} size={CAROUSEL_HAND_SIZE} />
            </AnimatedRN.View>
          </Block>
          {/* actual carousel */}
          <ScrollView
            ref={_refRoot}
            style={{
              width: CAROUSEL_WIDTH,
              height: CAROUSEL_HEIGHT,
              borderRadius: 18,
            }}
            pagingEnabled>
            {GIF_IMAGES.map((img, index) => (
              <Block
                key={index}
                width={CAROUSEL_WIDTH - 10}
                height={CAROUSEL_HEIGHT}
                borderRadius={18}
                overflow={'hidden'}>
                <LocalImage resizeMode={'cover'} source={img} />
              </Block>
            ))}
          </ScrollView>
        </Block>
        {/* bottom button */}
        <AnimatedRN.View
          style={{
            position: 'absolute',
            left: 0,
            bottom: 30,
            width: '100%',
            height: 50,
            opacity: fadeAnim,
          }}>
          <Button
            style={{
              backgroundColor: OPTION_BTN_COLOR,
              paddingHorizontal: 13,
              paddingVertical: 15,
              flex: 1,
              height: 50,
            }}
            disabled={!enableBtn}
            onPress={handleConfirm}>
            <Text color={'white'} fontSize={15} center>
              Start watching
            </Text>
          </Button>
        </AnimatedRN.View>
      </Screen>
    </Block>
  );
};

export const ThirdP = memo(ThirdPComponent, isEqual);
