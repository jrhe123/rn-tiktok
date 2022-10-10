import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Animated as AnimatedRN,
  Dimensions,
  Easing,
  FlatList,
  NativeModules,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import isEqual from 'react-fast-compare';
import { TextInput } from 'react-native-paper';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { dispatch } from '@common';
import { Block, Button, Image, Screen, Text } from '@components';
import { goBack, navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions } from '@redux-slice';

type Filter = {
  id: string;
  title: string;
};
const filters: Filter[] = [
  {
    id: 'aa7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Top',
  },
  {
    id: 'bb7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Users',
  },
  {
    id: 'cc7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Videos',
  },
  {
    id: 'dd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Sounds',
  },
  {
    id: 'ee7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'LIVE',
  },
  {
    id: 'ff7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Hashtags',
  },
];
type Top = {
  id: string;
  url: string;
  date: Date;
  title: string;
  subtitle: string;
  userImageUrl: string;
  userName: string;
  likeCount: number;
};
const topList: Top[] = [
  {
    id: '1',
    url: 'https://picsum.photos/id/1002/4312/2868',
    date: new Date('2022-01-01'),
    title: '...#katekerditips',
    subtitle: '#homedecorideas',
    userImageUrl: 'https://picsum.photos/id/1002/4312/2868',
    userName: 'katekerdiinteri...',
    likeCount: 11500,
  },
  {
    id: '2',
    url: 'https://picsum.photos/id/1003/1181/1772',
    date: new Date('2022-01-02'),
    title: '...home decor from ikea',
    subtitle: 'alwways get asked abandor',
    userImageUrl: 'https://picsum.photos/id/1003/1181/1772',
    userName: 'emilyrogs',
    likeCount: 64500,
  },
  {
    id: '3',
    url: 'https://picsum.photos/id/1004/5616/3744',
    date: new Date('2022-01-03'),
    title: '...#homedecorideas',
    subtitle: '#ikeafinds #interiordesign',
    userImageUrl: 'https://picsum.photos/id/1004/5616/3744',
    userName: 'jordansamson..',
    likeCount: 6983,
  },
  {
    id: '4',
    url: 'https://picsum.photos/id/1005/5760/3840',
    date: new Date('2022-01-04'),
    title: '...#homedecor',
    subtitle: '#apartmentdecors #rente..',
    userImageUrl: 'https://picsum.photos/id/1005/5760/3840',
    userName: 'crampedliving',
    likeCount: 8602,
  },
];
type OtherSearch = {
  id: string;
  text: string;
};
const otherSearchList: OtherSearch[] = [
  { id: '1', text: 'ikea decor hacks 2022' },
  { id: '2', text: 'home hacks ikea' },
  { id: '3', text: 'ikea home decor canada' },
  { id: '4', text: 'ikea home ideas' },
  { id: '5', text: 'ikea room decor must have' },
  { id: '6', text: 'ikea tiny home' },
  { id: '7', text: 'ikea room decor for men' },
  { id: '8', text: 'best ikea decor' },
];

const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const { width, height } = Dimensions.get('window');

const statusBarOffset = 0;
const MAIN_HEADER_HEIGHT = 60;
const TAB_WIDTH = 66;
const MAIN_HEADER_BAR_WIDTH = TAB_WIDTH * filters.length;
const distance = MAIN_HEADER_BAR_WIDTH;
const aniControlValue = new AnimatedRN.Value(0);

const SearchResultComponent = () => {
  const [search, setSearch] = useState<string>('IKEA Home Decor Ideas');
  const [translateX, setTranslateX] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const _refRoot = useRef<ScrollView>(null);
  const _refTabRoot = useRef<FlatList>(null);

  const translateDistance = aniControlValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [
      0,
      distance / 6,
      distance / 3,
      distance / 2,
      (distance / 3) * 2,
      (distance / 6) * 5,
    ],
  });
  const opacityTop = aniControlValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [1, 0.5, 0.5, 0.5, 0.5, 0.5],
  });
  const opacityUsers = aniControlValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [0.5, 1, 0.5, 0.5, 0.5, 0.5],
  });
  const opacityVideos = aniControlValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [0.5, 0.5, 1, 0.5, 0.5, 0.5],
  });
  const opacitySounds = aniControlValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [0.5, 0.5, 0.5, 1, 0.5, 0.5],
  });
  const opacityLive = aniControlValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [0.5, 0.5, 0.5, 0.5, 1, 0.5],
  });
  const opacityHashtags = aniControlValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: [0.5, 0.5, 0.5, 0.5, 0.5, 1],
  });
  const filterOpacityArr = [
    opacityTop,
    opacityUsers,
    opacityVideos,
    opacitySounds,
    opacityLive,
    opacityHashtags,
  ];

  useEffect(() => {
    AnimatedRN.timing(aniControlValue, {
      toValue: translateX / distance,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [translateX]);

  const renderTopBar = () => (
    <Block
      style={{
        marginTop: statusBarHeight + statusBarOffset,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: MAIN_HEADER_HEIGHT,
        position: 'relative',
      }}>
      <Block
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Button
          onPress={() => {
            goBack();
          }}>
          <VectorIcon icon={'bx_chevron_left'} size={33} />
        </Button>
        <Block block style={{ marginHorizontal: 12 }}>
          <TextInput
            left={
              <TextInput.Icon
                name={() => <VectorIcon icon={'bx_search'} size={21} />}
              />
            }
            right={
              search && (
                <TextInput.Icon
                  name={() => (
                    <TouchableOpacity
                      onPress={() => {
                        setSearch('');
                        goBack();
                      }}>
                      <VectorIcon icon={'x_cross_exit'} size={15} />
                    </TouchableOpacity>
                  )}
                />
              )
            }
            style={{
              height: 36,
              backgroundColor: '#e2e3e4',
              borderRadius: 4,
              paddingRight: 9,
              fontSize: 15,
            }}
            theme={{ colors: { text: 'black' } }}
            activeUnderlineColor={'transparent'}
            underlineColor={'transparent'}
            placeholderTextColor={'#c2c2c2'}
            placeholder={'Search'}
            value={search}
            onChangeText={setSearch}
          />
        </Block>
        <Button onPress={() => {}}>
          <VectorIcon icon={'bx_filter'} size={33} />
        </Button>
      </Block>
    </Block>
  );

  const renderContent = () => {
    // top
    if (index === 0) {
      return <ScrollView showsVerticalScrollIndicator={false}></ScrollView>;
    }
    return null;
  };

  const renderItem = ({ item }: { item: Filter }) => {
    return (
      <Block
        style={{
          width: width - 30,
        }}>
        {renderContent()}
      </Block>
    );
  };

  return (
    <Block
      block
      style={{
        position: 'relative',
        paddingHorizontal: 15,
      }}>
      <Screen
        unsafe
        statusBarStyle="dark-content"
        bottomInsetColor="transparent"
        backgroundColor={'transparent'}>
        {renderTopBar()}
        {/* main content */}
        {/* tab navigation */}
        <Block
          style={{
            marginTop: 6,
            position: 'relative',
            borderBottomWidth: 0.5,
            borderColor: '#c2c2c2',
          }}>
          <ScrollView
            ref={_refRoot}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {filters.map((filter, index) => (
              <Block
                key={filter.id}
                style={{
                  width: TAB_WIDTH,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingBottom: 9,
                }}>
                <Button
                  onPress={() => {
                    if (_refTabRoot.current) {
                      _refTabRoot.current?.scrollToIndex({
                        animated: true,
                        index,
                      });
                    }
                  }}>
                  <AnimatedRN.Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      textAlign: 'center',
                      opacity: filterOpacityArr[index],
                    }}>
                    {filter.title}
                  </AnimatedRN.Text>
                </Button>
              </Block>
            ))}
            {/* Underneath bar */}
            <AnimatedRN.View
              style={{
                position: 'absolute',
                transform: [{ translateX: translateDistance }],
                bottom: 0,
                left: 0,
                height: 2,
                width: TAB_WIDTH,
                backgroundColor: 'black',
                borderRadius: 2,
              }}
            />
          </ScrollView>
        </Block>
        {/* horizontal */}
        <FlatList
          onScroll={e => {
            const temp = e.nativeEvent.contentOffset.x / (width - 30);
            setTranslateX(temp * distance);
            setIndex(temp);
          }}
          ref={_refTabRoot}
          data={filters}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          style={{
            width: width - 30,
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
              _refTabRoot.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
        />
      </Screen>
    </Block>
  );
};

export const SearchResult = memo(SearchResultComponent, isEqual);
