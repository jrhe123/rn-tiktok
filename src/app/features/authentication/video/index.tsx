import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated as AnimatedRN,
  Dimensions,
  Easing,
  FlatList,
  NativeModules,
} from 'react-native';

import isEqual from 'react-fast-compare';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { dispatch, STORAGE_NOTIFICATION, STORAGE_TRACKING } from '@common';
import { Block, Button, Icon, Screen, Text } from '@components';
import { S3_BASE_URL } from '@env';
import { useSelector } from '@hooks';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions } from '@redux-slice';
import { loadString, saveString } from '@storage';

import { Slide } from './components/slide';

const BOTTOM_BAR_HEIGHT = 90;
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
const LIVE_ICON_SIZE = 30;
const videoLink = S3_BASE_URL + '/dragon_0001.mp4';
const videoLink2 = S3_BASE_URL + '/pokemon_00001.mp4';
const videoLink3 = S3_BASE_URL + '/digimon_0001.mp4';
const videoLink4 = S3_BASE_URL + '/yu-gi-oh_0001.mp4';
const videoLink5 = S3_BASE_URL + '/bleach_0001.mp4';
const videoLink6 = S3_BASE_URL + '/naruto_0001.mp4';
const videoLink7 = S3_BASE_URL + '/one_piece_0001.mp4';
const videoLink8 = S3_BASE_URL + '/marvel_0001.mp4';
const videoLink9 = S3_BASE_URL + '/lord_of_ring_0001.mp4';

type View = {
  id: string;
  type: string;
  title: string;
};
enum VIDEO_TYPE {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  LIVE_STREAM = 'LIVE_STREAM',
  FEEDBACK = 'FEEDBACK',
  AD = 'AD',
}
type Video = {
  id: string;
  type: VIDEO_TYPE;
  url?: string;
  image_urls?: string[];
};
enum TAB {
  FOLLOWING = 'FOLLOWING',
  FOR_YOU = 'FOR_YOU',
}

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
const videos_1: Video[] = [
  {
    id: '007acbea-c1b1-46c2-aed5-3ad53abb28ba',
    type: VIDEO_TYPE.VIDEO,
    url: videoLink,
  },
  {
    id: 'aa7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    type: VIDEO_TYPE.VIDEO,
    url: videoLink2,
  },
  {
    id: 'bb7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    type: VIDEO_TYPE.VIDEO,
    url: videoLink3,
  },
  {
    id: 'cc7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    type: VIDEO_TYPE.VIDEO,
    url: videoLink4,
  },
  {
    id: 'dd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    type: VIDEO_TYPE.VIDEO,
    url: videoLink5,
  },
  {
    id: 'ee7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    type: VIDEO_TYPE.VIDEO,
    url: videoLink6,
  },
];
const videos_2: Video[] = [
  {
    id: 'bb7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    type: VIDEO_TYPE.VIDEO,
    url: videoLink7,
  },
  // {
  //   id: 'cc7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //   type: VIDEO_TYPE.VIDEO,
  //   url: videoLink8,
  // },
  // {
  //   id: 'dd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //   type: VIDEO_TYPE.VIDEO,
  //   url: videoLink9,
  // },
];
const viewabilityConfig = {
  itemVisiblePercentThreshold: 40,
  waitForInteraction: true,
};

const distance = MAIN_HEADER_BAR_WIDTH;
const aniControlValue = new AnimatedRN.Value(0);
const VideoComponent = () => {
  // state
  const { askRegister, askLanguage, modalOpen, modalType } = useSelector(
    state => state.app,
  );
  //
  const [isShown, setIsShown] = useState<boolean>(false);
  const [allowNoti, setAllowNoti] = useState<boolean>(false);
  const [allowTrack, setAllowTrack] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<TAB>(TAB.FOLLOWING);
  const [translateX, setTranslateX] = useState<number>(0);
  const [FYVisibleItemIndex, setFYVisibleItemIndex] = useState<number>(0);
  const [FOVisibleItemIndex, setFOVisibleItemIndex] = useState<number>(0);
  const _refRoot = useRef<FlatList>(null);
  const _refForYouRoot = useRef<FlatList>(null);
  const _refFollowingRoot = useRef<FlatList>(null);
  // video in comment mode
  const isMiniVideo = modalOpen && modalType === 'VIDEO_COMMENT';

  useEffect(() => {
    if (allowNoti && allowTrack) {
      dispatch(appActions.onModalOpen('SWIPE_UP_ANI_POPUP'));
    }
  }, [allowNoti, allowTrack]);

  useEffect(() => {
    if (askRegister && FYVisibleItemIndex + FOVisibleItemIndex === 3) {
      // pop up register alert, if haven't asked yet - once
      dispatch(appActions.onPopupRegister());
      dispatch(appActions.onSetAskRegisterAttempt(false));
    }
  }, [askRegister, FYVisibleItemIndex, FOVisibleItemIndex]);

  useEffect(() => {
    if (askLanguage && FYVisibleItemIndex + FOVisibleItemIndex === 1) {
      // pop up language alert, if haven't asked yet - once
      dispatch(appActions.onModalOpen('LANGUAGE_LIST'));
      dispatch(appActions.onSetAskLanguageAttempt(false));
    }
  }, [askLanguage, FYVisibleItemIndex, FOVisibleItemIndex]);

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
              setAllowNoti(false);
            },
            style: 'default',
          },
          {
            text: 'Allow',
            onPress: () => {
              // saveString(STORAGE_NOTIFICATION, '1');
              setAllowNoti(true);
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
              setAllowTrack(false);
            },
            style: 'default',
          },
          {
            text: 'Allow',
            onPress: () => {
              // saveString(STORAGE_TRACKING, '1');
              setAllowTrack(true);
            },
            style: 'default',
          },
        ],
      );
    }
    return () => {
      console.log('unmount video');
    };
  }, []);

  // FY
  const onFYViewableItemsChanged = useCallback(({ changed }) => {
    if (changed && changed.length > 0) {
      setFYVisibleItemIndex(changed[0].index);
    }
  }, []);
  const FYViewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged: onFYViewableItemsChanged },
  ]);
  // FO
  const onFOViewableItemsChanged = useCallback(({ changed }) => {
    if (changed && changed.length > 0) {
      setFOVisibleItemIndex(changed[0].index);
    }
  }, []);
  const FOViewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged: onFOViewableItemsChanged },
  ]);

  const renderTopBar = () => (
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
              (MAIN_HEADER_BAR_WIDTH - MAIN_HEADER_BAR_UNDERNEATH_WIDTH) / 2,
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
            zIndex: 1,
          }}>
          <Button
            onPress={() => {
              navigate(APP_SCREEN.SEARCH);
            }}>
            <Icon icon={'search'} color={'white'} size={SEARCH_ICON_SIZE} />
          </Button>
        </Block>
        {/* Live icon */}
        <Block
          style={{
            position: 'absolute',
            left: 6,
            top: 0,
            height: MAIN_HEADER_HEIGHT,
            width: MAIN_HEADER_HEIGHT,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}>
          <Button
            onPress={() => {
              navigate(APP_SCREEN.LIVE_STREAM);
            }}>
            <Block
              style={{
                position: 'relative',
              }}>
              <Block
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 2,
                  zIndex: 1,
                  backgroundColor: 'black',
                }}>
                <Text color={'white'} fontSize={11} fontWeight={'bold'}>
                  LIVE
                </Text>
              </Block>
              <VectorIcon
                icon={'bx_tv1'}
                color={'white'}
                size={LIVE_ICON_SIZE}
              />
            </Block>
          </Button>
        </Block>
      </Block>
    </Block>
  );

  const renderFOVItem = ({ item }: { item: Video }) => {
    const itemIndex = videos_2.findIndex(i => i.id === item.id);
    const active =
      itemIndex === FOVisibleItemIndex && currentTab === TAB.FOLLOWING;
    return <Slide item={item} active={active} />;
  };

  const renderFUVItem = ({ item }: { item: Video }) => {
    const itemIndex = videos_1.findIndex(i => i.id === item.id);
    const active =
      itemIndex === FYVisibleItemIndex && currentTab === TAB.FOR_YOU;
    return <Slide item={item} active={active} />;
  };

  const renderItem = ({ item }: { item: View }) => {
    if (item.type === 'FOLLOWING') {
      return (
        <FlatList
          ref={_refFollowingRoot}
          data={videos_2}
          renderItem={renderFOVItem}
          keyExtractor={item => item.id}
          style={{
            width,
            height: height - BOTTOM_BAR_HEIGHT,
          }}
          scrollEventThrottle={height}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          viewabilityConfigCallbackPairs={
            FOViewabilityConfigCallbackPairs.current
          }
        />
      );
    } else if (item.type === 'FOR_YOU') {
      return (
        <FlatList
          ref={_refForYouRoot}
          data={videos_1}
          renderItem={renderFUVItem}
          keyExtractor={item => item.id}
          style={{
            width,
            height: height - BOTTOM_BAR_HEIGHT,
          }}
          scrollEventThrottle={height}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          viewabilityConfigCallbackPairs={
            FYViewabilityConfigCallbackPairs.current
          }
        />
      );
    }
    return null;
  };

  // render
  return (
    <Block
      block
      style={{
        backgroundColor: '#010101',
        position: 'relative',
      }}>
      <Screen
        unsafe
        statusBarStyle="light-content"
        bottomInsetColor="transparent"
        backgroundColor={'transparent'}>
        {/* main page */}
        {!isShown ? null : (
          <>
            {/* Main control bar */}
            {!isMiniVideo && renderTopBar()}
            {/* Horizontal */}
            <FlatList
              onScroll={e => {
                setTranslateX(
                  (e.nativeEvent.contentOffset.x / width) * distance,
                );
              }}
              ref={_refRoot}
              data={views}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal
              style={{
                width,
                height: height - BOTTOM_BAR_HEIGHT,
              }}
              initialScrollIndex={0}
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
      </Screen>
    </Block>
  );
};

export const Video = memo(VideoComponent, isEqual);

// flat view active index & play video
// https://stackoverflow.com/questions/66956230/onviewableitemschanged-is-being-called-even-after-navigating-to-different-screen
