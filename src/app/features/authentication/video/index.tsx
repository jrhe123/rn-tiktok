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

import { dispatch, STORAGE_NOTIFICATION, STORAGE_TRACKING } from '@common';
import { Block, Button, Icon } from '@components';
import { appActions } from '@redux-slice';
import { loadString, saveString } from '@storage';

import { Slide } from './components/slide';

const { height, width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const statusBarOffset = 0;
const MAIN_HEADER_HEIGHT = 60;
const MAIN_HEADER_BAR_WIDTH = 100;
const MAIN_HEADER_BAR_UNDERNEATH_WIDTH = 30;
const SEARCH_ICON_SIZE = 27;

type View = {
  id: string;
  type: string;
  title: string;
};
enum TAB {
  FOLLOWING = 'FOLLOWING',
  FOR_YOU = 'FOR_YOU',
}

const distance = MAIN_HEADER_BAR_WIDTH;
const aniControlValue = new AnimatedRN.Value(1);
const VideoComponent = () => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<TAB>(TAB.FOR_YOU);
  const [translateX, setTranslateX] = useState<number>(0);
  const _refRoot = useRef<FlatList>(null);
  const _refForYouRoot = useRef<ScrollView>(null);
  const _refFollowingRoot = useRef<ScrollView>(null);

  useEffect(() => {
    AnimatedRN.timing(aniControlValue, {
      toValue: translateX / distance,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    switch (translateX / distance) {
      case 0:
        setCurrentTab(TAB.FOLLOWING);
        break;
      case 1:
        setCurrentTab(TAB.FOR_YOU);
        break;
      default:
        break;
    }
  }, [translateX]);

  const translateDistance = aniControlValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, distance],
  });
  const opacityFollow = aniControlValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });
  const opacityForYou = aniControlValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  useEffect(() => {
    /**
     * delay render
     */
    setTimeout(() => {
      setIsShown(true);
    }, 300);
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
  }, []);

  const renderItem = ({ item }: { item: View }) => {
    if (item.type === 'FOLLOWING') {
      return (
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
      );
    } else if (item.type === 'FOR_YOU') {
      return (
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
      );
    }
    return null;
  };

  // TODO: replace
  const views: View[] = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Following',
      type: 'FOLLOWING',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'For You',
      type: 'FOR_YOU',
    },
  ];
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
      {!isShown ? null : (
        <>
          {/* Main control bar */}
          <Block
            style={{
              position: 'absolute',
              top: statusBarHeight + statusBarOffset,
              left: 0,
              height: MAIN_HEADER_HEIGHT,
              width,
              flexDirection: 'row',
              zIndex: 99,
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
                  width: MAIN_HEADER_BAR_WIDTH,
                }}>
                <Button
                  style={{ paddingVertical: 18 }}
                  onPress={() => {
                    if (_refRoot.current) {
                      _refRoot.current?.scrollToIndex({
                        animated: true,
                        index: 0,
                      });
                    }
                  }}>
                  <AnimatedRN.Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      opacity: opacityFollow,
                    }}>
                    Following
                  </AnimatedRN.Text>
                </Button>
              </Block>
              <Block
                style={{
                  paddingHorizontal: 6,
                  width: MAIN_HEADER_BAR_WIDTH,
                }}>
                <Button
                  style={{ paddingVertical: 18 }}
                  onPress={() => {
                    if (_refRoot.current) {
                      _refRoot.current?.scrollToIndex({
                        animated: true,
                        index: 1,
                      });
                    }
                  }}>
                  <AnimatedRN.Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      opacity: opacityForYou,
                    }}>
                    For You
                  </AnimatedRN.Text>
                </Button>
              </Block>
              {/* Underneath bar */}
              <AnimatedRN.View
                style={{
                  position: 'absolute',
                  transform: [{ translateX: translateDistance }],
                  bottom: 9,
                  left:
                    width / 2 -
                    MAIN_HEADER_BAR_WIDTH +
                    (MAIN_HEADER_BAR_WIDTH - MAIN_HEADER_BAR_UNDERNEATH_WIDTH) /
                      2,
                  height: 4,
                  width: MAIN_HEADER_BAR_UNDERNEATH_WIDTH,
                  backgroundColor: 'white',
                  borderRadius: 2,
                }}
              />
              {/* Search icon */}
              <Block
                style={{
                  position: 'absolute',
                  right: 6,
                  top: 0,
                  height: MAIN_HEADER_HEIGHT,
                  width: MAIN_HEADER_HEIGHT,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Button onPress={() => {}}>
                  <Icon
                    icon={'search'}
                    color={'white'}
                    size={SEARCH_ICON_SIZE}
                  />
                </Button>
              </Block>
            </Block>
          </Block>
          {/* Horizontal */}
          <FlatList
            onScroll={e => {
              setTranslateX((e.nativeEvent.contentOffset.x / width) * distance);
            }}
            ref={_refRoot}
            data={views}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            style={{
              width,
              height,
            }}
            initialScrollIndex={1}
            scrollEventThrottle={width}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScrollToIndexFailed={info => {
              const wait: Promise<unknown> = new Promise(resolve =>
                setTimeout(resolve, 500),
              );
              wait.then(() => {
                _refRoot.current?.scrollToIndex({
                  index: info.index,
                  animated: true,
                });
              });
            }}
          />
        </>
      )}
    </Block>
  );
};

export const Video = memo(VideoComponent, isEqual);
