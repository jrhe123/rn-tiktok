import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated as AnimatedRN,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import isEqual from 'react-fast-compare';
import Animated, { Extrapolate, SlideOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Block, Button, Screen, Text } from '@components';

import { Option } from '../type';

const SCROLL_THROTTLE = 120;
const ANIMATED_HEADER_HEIGHT = 90;
const OPTION_BTN_COLOR = '#E8445A';

const SecondPComponent = ({
  options,
  handleSetOptions,
  handleConfirm,
}: {
  options: Option[];
  handleSetOptions: (options: Option[]) => void;
  handleConfirm: () => void;
}) => {
  // animated header
  const insets = useSafeAreaInsets();
  const offset = useRef(new AnimatedRN.Value(0)).current;
  const [opacity, setOpacity] = useState<number>(0);
  const headerHeight = offset.interpolate({
    inputRange: [0, ANIMATED_HEADER_HEIGHT + insets.top],
    outputRange: [ANIMATED_HEADER_HEIGHT + insets.top, insets.top + 44],
    extrapolate: Extrapolate.CLAMP,
  });
  //
  useEffect(() => {
    const id = setTimeout(() => {
      Alert.alert(
        '',
        'By tapping "Agree and continue", you agree to our Terms of Service and acknowledge that you have read our Privacy Policy to learn how we collect, use, and share your data',
        [
          {
            text: 'Agree and continue',
            onPress: () => {
              console.log('agreed');
            },
            style: 'default',
          },
        ],
      );
    }, 1000);
    return () => clearTimeout(id);
  }, []);
  //
  const enableInterests = options.some(op => op.selected);
  return (
    <Animated.View style={{ flex: 1 }} exiting={SlideOutUp}>
      <Block block>
        {/* interests list */}
        <Block block paddingTop={0} paddingBottom={90} paddingHorizontal={15}>
          <Screen
            onScroll={AnimatedRN.event(
              [{ nativeEvent: { contentOffset: { y: offset } } }],
              {
                useNativeDriver: false,
                listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
                  const offsetY = e.nativeEvent.contentOffset.y;
                  const offsetYAbs = offsetY > 0 ? offsetY : 0;
                  const minVal = Math.min(offsetYAbs, SCROLL_THROTTLE);
                  setOpacity(minVal / SCROLL_THROTTLE);
                },
              },
            )}
            scroll
            statusBarStyle="dark-content"
            bottomInsetColor="transparent"
            style={{ paddingVertical: 0, paddingHorizontal: 10 }}
            backgroundColor={'transparent'}>
            <Block paddingVertical={15} direction={'column'}>
              <Text fontSize={36} fontWeight="bold">
                Choose your
              </Text>
              <Text fontSize={36} fontWeight="bold">
                interests
              </Text>
            </Block>
            <Block>
              <Text fontSize={18}>Get better video recommendations</Text>
            </Block>
            <Block paddingTop={40} direction="row" flexWrap={'wrap'}>
              {options.map((op, index) => (
                <Button
                  key={index}
                  style={{
                    backgroundColor: op.selected ? OPTION_BTN_COLOR : 'white',
                    paddingHorizontal: 13,
                    paddingVertical: 12,
                    borderRadius: 24,
                    borderWidth: 0.5,
                    borderColor: op.selected ? OPTION_BTN_COLOR : '#ccc',
                    marginRight: 9,
                    marginBottom: 12,
                  }}
                  onPress={() => {
                    const updated = options.map((item, i) => {
                      if (i === index) {
                        item.selected = !item.selected;
                      }
                      return item;
                    });
                    handleSetOptions(updated);
                  }}>
                  <Text color={op.selected ? 'white' : 'black'} fontSize={15}>
                    {op.title}
                  </Text>
                </Button>
              ))}
            </Block>
          </Screen>
        </Block>
        {/* hidden header */}
        <AnimatedRN.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            height: headerHeight,
            backgroundColor: '#F2F2F2',
            borderBottomColor: '#ccc',
            borderWidth: 1,
            borderStyle: 'solid',
            opacity,
          }}>
          <Block
            block
            paddingTop={42}
            justifyContent={'center'}
            alignItems={'center'}>
            <Text fontSize={18} fontWeight="bold">
              Choose your interests
            </Text>
          </Block>
        </AnimatedRN.View>
        {/* fixed footer */}
        <Block
          block
          style={{
            backgroundColor: '#F2F2F2',
          }}
          paddingTop={15}
          paddingHorizontal={15}
          position={'absolute'}
          left={0}
          bottom={0}
          height={120}
          width={'100%'}
          borderColor={'#ccc'}
          borderTopWidth={1}
          borderStyle={'solid'}
          direction="row">
          <Button
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 13,
              paddingVertical: 15,
              borderWidth: 0.5,
              borderColor: '#ccc',
              marginRight: 9,
              flex: 1,
              height: 50,
            }}
            onPress={handleConfirm}>
            <Text color={'black'} fontSize={15} center>
              Skip
            </Text>
          </Button>
          <Button
            style={{
              backgroundColor: enableInterests ? OPTION_BTN_COLOR : '#ccc',
              paddingHorizontal: 13,
              paddingVertical: 15,
              flex: 1,
              height: 50,
            }}
            disabled={!enableInterests}
            onPress={handleConfirm}>
            <Text color={'white'} fontSize={15} center>
              Next
            </Text>
          </Button>
        </Block>
      </Block>
    </Animated.View>
  );
};

export const SecondP = memo(SecondPComponent, isEqual);
