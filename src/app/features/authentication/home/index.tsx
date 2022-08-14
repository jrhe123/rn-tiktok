import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated as AnimatedRN,
  Dimensions,
  Easing,
  NativeModules,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';

import isEqual from 'react-fast-compare';

import { dispatch, STORAGE_NOTIFICATION, STORAGE_TRACKING } from '@common';
import { Block, Button, Text } from '@components';
import { appActions } from '@redux-slice';
import { loadString, saveString } from '@storage';

import { Slide } from './components/slide';

const { height, width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const statusBarOffset = 6;
const MAIN_HEADER_HEIGHT = 60;
const MAIN_HEADER_BAR_WIDTH = 120;
const MAIN_HEADER_BAR_UNDERNEATH_WIDTH = 30;

enum TAB {
  FOLLOWING = 'FOLLOWING',
  FOR_YOU = 'FOR_YOU',
}

const HomeComponent = () => {
  // const [currentTab, setCurrentTab] = useState<TAB>(TAB.FOR_YOU);
  const [translateX, setTranslateX] = useState<number>(0);
  const _refRoot = useRef<ScrollView>(null);
  const _refForYouRoot = useRef<ScrollView>(null);
  const _refFollowingRoot = useRef<ScrollView>(null);

  useEffect(() => {
    /**
     * update status bar
     */
    dispatch(appActions.onSetStatusBar('light-content'));
    /**
     * notification
     */
    const storageNoti = loadString(STORAGE_NOTIFICATION);
    if (storageNoti === undefined) {
      Alert.alert(
        '"TikTok" Would Like to Send You Notifications',
        'Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.',
        [
          {
            text: "Don't Allow",
            onPress: () => {
              saveString(STORAGE_NOTIFICATION, '0');
              console.log('Not allow Pressed');
            },
            style: 'default',
          },
          {
            text: 'Allow',
            onPress: () => {
              saveString(STORAGE_NOTIFICATION, '1');
              console.log('Allow Pressed');
            },
            style: 'default',
          },
        ],
      );
    }
    /**
     * tracking
     */
    const storageTrack = loadString(STORAGE_TRACKING);
    if (storageTrack === undefined) {
      Alert.alert(
        'Allow "TikTok" to rack your activity across other companies\' apps and websites?',
        'This allows TikTok to provide you with a better ads experience.',
        [
          {
            text: 'Ask App Not to Track',
            onPress: () => {
              saveString(STORAGE_TRACKING, '0');
              console.log('Not track Pressed');
            },
            style: 'default',
          },
          {
            text: 'Allow',
            onPress: () => {
              saveString(STORAGE_TRACKING, '1');
              console.log('Track Pressed');
            },
            style: 'default',
          },
        ],
      );
    }
    /**
     * horizontal scrollview
     */
    if (_refRoot.current) {
      _refRoot.current?.scrollTo({
        x: width * 1,
        y: 0,
        animated: true,
      });
    }
  }, []);

  // TODO: replace
  const data1 = [1, 2, 3, 4, 5];
  const data2 = [1, 2, 3];
  // render
  return (
    <Block
      block
      style={{
        backgroundColor: '#010101',
        position: 'relative',
      }}>
      {/* Main control bar */}
      <Block
        style={{
          position: 'absolute',
          top: statusBarHeight + statusBarOffset,
          left: 0,
          height: MAIN_HEADER_HEIGHT,
          width,
          flexDirection: 'row',
          borderColor: 'red',
          borderWidth: 1,
        }}>
        <Block
          block
          style={{
            position: 'relative',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Block
            style={{
              paddingHorizontal: 6,
              borderWidth: 1,
              borderColor: 'red',
              width: MAIN_HEADER_BAR_WIDTH,
            }}>
            <Button>
              <Text color={'white'} fontSize={18} center fontWeight={'bold'}>
                Following
              </Text>
            </Button>
          </Block>
          <Block
            style={{
              paddingHorizontal: 6,
              borderWidth: 1,
              borderColor: 'green',
              width: MAIN_HEADER_BAR_WIDTH,
            }}>
            <Button>
              <Text color={'white'} fontSize={18} center fontWeight={'bold'}>
                For You
              </Text>
            </Button>
          </Block>
          {/* Underneath bar */}
          <AnimatedRN.View
            style={{
              position: 'absolute',
              transform: [{ translateX }],
              bottom: 9,
              left:
                width / 2 -
                MAIN_HEADER_BAR_WIDTH +
                (MAIN_HEADER_BAR_WIDTH - MAIN_HEADER_BAR_UNDERNEATH_WIDTH) / 2,
              height: 4,
              width: MAIN_HEADER_BAR_UNDERNEATH_WIDTH,
              backgroundColor: 'white',
              borderRadius: 3,
            }}
          />
        </Block>
      </Block>
      {/* Horizontal */}
      <ScrollView
        onScroll={e => {
          const distance = MAIN_HEADER_BAR_WIDTH;
          console.log('width: ', width);
          console.log('e: ', e.nativeEvent.contentOffset.x);
          setTranslateX((e.nativeEvent.contentOffset.x / width) * distance);
        }}
        ref={_refRoot}
        style={{
          width,
          height,
        }}
        horizontal
        scrollEventThrottle={width}
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {/* Following */}
        <ScrollView
          ref={_refFollowingRoot}
          style={{
            width,
            height,
          }}
          showsVerticalScrollIndicator={false}
          pagingEnabled>
          {data2.map((item, index) => (
            <Slide key={index} />
          ))}
        </ScrollView>
        {/* For you */}
        <ScrollView
          ref={_refForYouRoot}
          style={{
            width,
            height,
          }}
          showsVerticalScrollIndicator={false}
          pagingEnabled>
          {data1.map((item, index) => (
            <Slide key={index} />
          ))}
        </ScrollView>
      </ScrollView>
    </Block>
  );
};

export const Home = memo(HomeComponent, isEqual);
