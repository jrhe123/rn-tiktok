import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated as AnimatedRN,
  Dimensions,
  NativeModules,
  ScrollView,
} from 'react-native';

import isEqual from 'react-fast-compare';
import { TextInput } from 'react-native-paper';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { dispatch } from '@common';
import { Block, Button, Image, Screen, Text } from '@components';
import { goBack } from '@navigation/navigation-service';
import { appActions } from '@redux-slice';

const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const statusBarOffset = 0;
const MAIN_HEADER_HEIGHT = 60;

const { width, height } = Dimensions.get('window');
const images: string[] = [
  'https://picsum.photos/id/1002/4312/2868',
  'https://picsum.photos/id/1003/1181/1772',
  'https://picsum.photos/id/1004/5616/3744',
  'https://picsum.photos/id/1005/5760/3840',
  'https://picsum.photos/id/1006/3000/2000',
  'https://picsum.photos/id/1008/5616/3744',
  'https://picsum.photos/id/1009/5000/7502',
];
type MayLike = {
  id: string;
  color: string;
  title: string;
  isHot: boolean;
};
const mayLikeList: MayLike[] = [
  {
    id: '1',
    color: 'red',
    title: 'Chinese Opera',
    isHot: true,
  },
  {
    id: '2',
    color: 'orange',
    title: 'Music Covers',
    isHot: true,
  },
  {
    id: '3',
    color: 'yellow',
    title: 'Slip Skirt Outfit',
    isHot: false,
  },
  {
    id: '4',
    color: 'grey',
    title: 'Asian Squat',
    isHot: false,
  },
  {
    id: '5',
    color: 'grey',
    title: 'Bikini Try On Haul',
    isHot: false,
  },
  {
    id: '6',
    color: 'grey',
    title: "6'4 Compared To 5'2",
    isHot: false,
  },
  {
    id: '7',
    color: 'grey',
    title: "It's Corn! Filter",
    isHot: false,
  },
  {
    id: '8',
    color: 'grey',
    title: 'How To Check TikTok History',
    isHot: false,
  },
  {
    id: '9',
    color: 'grey',
    title: '10/10 Songs',
    isHot: false,
  },
  {
    id: '10',
    color: 'grey',
    title: 'Space Song',
    isHot: false,
  },
];
const CAROUSEL_WIDTH = width - 30;
const CAROUSEL_HEIGHT = 150;

const SearchComponent = () => {
  const _refRoot = useRef<ScrollView>(null);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(prevIndex => prevIndex + 1);
    }, 2000);

    return () => {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const scrollIndex = index % images.length;
    if (_refRoot.current) {
      _refRoot.current?.scrollTo({
        x: CAROUSEL_WIDTH * scrollIndex,
        y: 0,
        animated: true,
      });
    }
  }, [index]);

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
            // value={''}
          />
        </Block>
        <Button onPress={() => {}}>
          <Text fontSize={15} fontWeight={'bold'} color={'#D6525E'}>
            Search
          </Text>
        </Button>
      </Block>
    </Block>
  );

  const renderMayLikeList = () =>
    mayLikeList.map((ml: MayLike) => (
      <Button key={ml.id}>
        <Block direction={'row'} marginBottom={18}>
          <Block justifyContent={'center'}>
            <Block
              style={{
                width: 7,
                height: 7,
                backgroundColor: ml.color,
                borderRadius: 7,
              }}
            />
          </Block>
          <Block direction={'row'} marginLeft={12}>
            <Block>
              <Text fontSize={15}>{ml.title}</Text>
            </Block>
            {ml.isHot && (
              <Block marginLeft={6} justifyContent={'center'}>
                <VectorIcon icon={'bx_money'} size={18} color={'red'} />
              </Block>
            )}
          </Block>
        </Block>
      </Button>
    ));

  const renderCarousel = () => {
    return images.map((url, index) => (
      <Block
        key={index}
        style={{
          height: CAROUSEL_HEIGHT,
          width: CAROUSEL_WIDTH,
        }}>
        <Image
          style={{
            height: CAROUSEL_HEIGHT,
            width: CAROUSEL_WIDTH,
          }}
          source={{ uri: url }}
          resizeMode={'cover'}
        />
      </Block>
    ));
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
        <Block marginTop={6}>
          <Text fontSize={15} fontWeight={'bold'}>
            You may like
          </Text>
        </Block>
        {/* may likes */}
        <Block marginTop={12}>{renderMayLikeList()}</Block>
        {/* info */}
        <Block marginTop={12}>
          <Text fontSize={12} color={'#a8a8a8'} center>
            Give feedback
          </Text>
        </Block>
        {/* carousel */}
        <Block
          style={{
            marginTop: 12,
            height: CAROUSEL_HEIGHT,
            width: CAROUSEL_WIDTH,
          }}>
          <ScrollView horizontal pagingEnabled ref={_refRoot}>
            {renderCarousel()}
          </ScrollView>
        </Block>
      </Screen>
    </Block>
  );
};

export const Search = memo(SearchComponent, isEqual);
