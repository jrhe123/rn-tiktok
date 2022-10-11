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
import dayjs from 'dayjs';
import { capitalize } from '@utils/common';

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
  { id: '5', text: 'ikea room decor have' },
  { id: '6', text: 'ikea tiny home' },
  { id: '7', text: 'ikea room decor for men' },
  { id: '8', text: 'best ikea decor' },
];

type User = {
  id: string;
  userImageUrl?: string;
  name: string;
  description: string;
  numberOfFollowers: number;
  numberOfVideos: number;
  isFollowed: boolean;
};
const userList: User[] = [
  {
    id: '1',
    userImageUrl: 'https://picsum.photos/id/1002/4312/2868',
    name: 'your_dream_home.ideas',
    description: 'Home decor ideas',
    numberOfFollowers: 3395,
    numberOfVideos: 238,
    isFollowed: true,
  },
  {
    id: '2',
    userImageUrl: 'https://picsum.photos/id/1003/1181/1772',
    name: 'craftygirl96',
    description: 'Home Decor ideas',
    numberOfFollowers: 12900,
    numberOfVideos: 529,
    isFollowed: false,
  },
  {
    id: '3',
    userImageUrl: 'https://picsum.photos/id/1004/5616/3744',
    name: 'ideashomedecor',
    description: 'Home Decor ideas',
    numberOfFollowers: 372,
    numberOfVideos: 10,
    isFollowed: false,
  },
  {
    id: '4',
    name: 'homedecorideas',
    description: 'Home Decor ideas',
    numberOfFollowers: 208,
    numberOfVideos: 0,
    isFollowed: false,
  },
  {
    id: '5',
    userImageUrl: 'https://picsum.photos/id/1005/5760/3840',
    name: 'homedecoration',
    description: 'Home Decor ideas',
    numberOfFollowers: 895,
    numberOfVideos: 4,
    isFollowed: false,
  },
  {
    id: '6',
    userImageUrl: 'https://picsum.photos/id/1006/3000/2000',
    name: 'home_decorideas',
    description: 'Home Decor ideas',
    numberOfFollowers: 430,
    numberOfVideos: 6,
    isFollowed: false,
  },
  {
    id: '7',
    userImageUrl: 'https://picsum.photos/id/1008/5616/3744',
    name: 'homedecor710',
    description: 'Home Decor ideas',
    numberOfFollowers: 360,
    numberOfVideos: 6,
    isFollowed: false,
  },
  {
    id: '8',
    userImageUrl: 'https://picsum.photos/id/1009/5000/7502',
    name: 'raven_home_decor',
    description: 'Home Decor ideas',
    numberOfFollowers: 52,
    numberOfVideos: 14,
    isFollowed: false,
  },
  {
    id: '9',
    userImageUrl: 'https://picsum.photos/id/1009/5000/7502',
    name: 'homedeporthemesong0',
    description: 'Home Decor ideas',
    numberOfFollowers: 145,
    numberOfVideos: 0,
    isFollowed: false,
  },
  {
    id: '10',
    userImageUrl: 'https://picsum.photos/id/1009/5000/7502',
    name: 'life.style2027',
    description: 'Home Decor ideas',
    numberOfFollowers: 890,
    numberOfVideos: 125,
    isFollowed: false,
  },
];

type Sound = {
  id: string;
  imageUrl: string;
  title: string;
  author: string;
  seconds: number;
  numberOfLikes: number;
};
const soundList: Sound[] = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/id/1009/5000/7502',
    title: 'Build The Flatpack (At IKEA)',
    author: 'IKEA',
    seconds: 53,
    numberOfLikes: 40500,
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/id/1005/5760/3840',
    title: 'IKEA HOME',
    author: 'Fiffy Kamprad & Kefir',
    seconds: 47,
    numberOfLikes: 0,
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/id/1004/5616/3744',
    title: 'Home Decor',
    author: 'Darth Joom',
    seconds: 60,
    numberOfLikes: 297,
  },
  {
    id: '4',
    imageUrl: 'https://picsum.photos/id/1003/1181/1772',
    title: 'Home Decor',
    author: 'Flowzus & Hilrooy',
    seconds: 60,
    numberOfLikes: 16,
  },
  {
    id: '5',
    imageUrl: 'https://picsum.photos/id/1002/4312/2868',
    title: 'Home Decor',
    author: 'Positive Color Sound',
    seconds: 60,
    numberOfLikes: 30,
  },
  {
    id: '6',
    imageUrl: 'https://picsum.photos/id/1008/5616/3744',
    title: 'Home Decor',
    author: 'Appabaysse',
    seconds: 60,
    numberOfLikes: 0,
  },
  {
    id: '7',
    imageUrl: 'https://picsum.photos/id/1006/3000/2000',
    title: 'Home Decor',
    author: 'The Astrochimps',
    seconds: 60,
    numberOfLikes: 34,
  },
  {
    id: '8',
    imageUrl: 'https://picsum.photos/id/1006/3000/2000',
    title: 'Home Decor',
    author: 'Valley Swerve',
    seconds: 60,
    numberOfLikes: 139,
  },
];

type Hashtag = {
  id: string;
  text: string;
  numberOfViews: number;
};
const hashtagList: Hashtag[] = [
  {
    id: '1',
    text: 'ikeahomedecorideas',
    numberOfViews: 7075,
  },
  {
    id: '2',
    text: 'ikeahomedecor',
    numberOfViews: 55400000,
  },
  {
    id: '3',
    text: 'homedecorideas',
    numberOfViews: 1400000000,
  },
  {
    id: '4',
    text: 'homedecoideas',
    numberOfViews: 525700,
  },
  {
    id: '5',
    text: 'homedecoidea',
    numberOfViews: 19600000,
  },
  {
    id: '6',
    text: 'homedesignideas',
    numberOfViews: 101600000,
  },
  {
    id: '7',
    text: 'homedesignideas🏠',
    numberOfViews: 4794,
  },
  {
    id: '8',
    text: 'decorideas',
    numberOfViews: 322700000,
  },
  {
    id: '9',
    text: 'homedecorideas',
    numberOfViews: 2200000,
  },
  {
    id: '10',
    text: 'ikeahomedecorideas',
    numberOfViews: 1710,
  },
  {
    id: '11',
    text: 'homedecorationideas',
    numberOfViews: 10400000,
  },
  {
    id: '12',
    text: 'decorhomeideas',
    numberOfViews: 25500000,
  },
  {
    id: '13',
    text: 'easyhomedecorideas',
    numberOfViews: 6600000,
  },
  {
    id: '14',
    text: 'homedecorationidea',
    numberOfViews: 693500,
  },
  {
    id: '15',
    text: 'home_decor_ideas',
    numberOfViews: 28900,
  },
];

type LIVE = {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  userImageUrl: string;
  numberOfLikes: number;
};
const LIVEList: LIVE[] = [
  {
    id: '1',
    title: 'IKEA shopping with Keeks',
    author: 'creationsbygabby',
    coverImageUrl: 'https://picsum.photos/id/1002/4312/2868',
    userImageUrl: 'https://picsum.photos/id/1002/4312/2868',
    numberOfLikes: 76,
  },
  {
    id: '2',
    title: 'Tranh vai decor gia GIA xuong',
    author: 'mon_decor',
    coverImageUrl: 'https://picsum.photos/id/1003/1181/1772',
    userImageUrl: 'https://picsum.photos/id/1003/1181/1772',
    numberOfLikes: 362,
  },
  {
    id: '3',
    title: 'San do decor sale freeship',
    author: 'chiakraul',
    coverImageUrl: 'https://picsum.photos/id/1004/5616/3744',
    userImageUrl: 'https://picsum.photos/id/1004/5616/3744',
    numberOfLikes: 1400,
  },
  {
    id: '4',
    title: 'Decorando minicakes',
    author: 'queenscuocakes',
    coverImageUrl: 'https://picsum.photos/id/1005/5760/3840',
    userImageUrl: 'https://picsum.photos/id/1005/5760/3840',
    numberOfLikes: 460,
  },
];

const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const { width, height } = Dimensions.get('window');

const USER_AVATAR_SIZE = 60;
const SOUND_AVATAR_SIZE = 60;
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
        <Button
          onPress={() => {
            dispatch(appActions.onModalOpen('SEARCH_FILTER'));
          }}>
          <VectorIcon icon={'bx_filter'} size={33} />
        </Button>
      </Block>
    </Block>
  );

  const renderTop = () => {
    return (
      <>
        {/* top list */}
        <Block
          direction={'row'}
          flexWrap={'wrap'}
          style={{
            justifyContent: 'space-between',
          }}>
          {topList.map((top: Top) => (
            <Block
              key={top.id}
              style={{
                width: '49%',
                marginBottom: 18,
              }}>
              {/* image */}
              <TouchableOpacity>
                <Block
                  style={{
                    height: 270,
                    width: '100%',
                    marginBottom: 6,
                    position: 'relative',
                  }}>
                  <Image
                    style={{
                      height: 270,
                      width: '100%',
                    }}
                    source={{ uri: top.url }}
                    resizeMode={'cover'}
                  />
                  <Block
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      left: 6,
                      zIndex: 1,
                    }}>
                    <Text color={'white'} fontSize={12}>
                      {dayjs(top.date.toDateString()).format('MM/DD')}
                    </Text>
                  </Block>
                </Block>
              </TouchableOpacity>
              {/* info */}
              <Block>
                <Text fontSize={12} color={'#a8a8a8'}>
                  {top.title}
                </Text>
                <Text fontSize={12}>{top.subtitle}</Text>
              </Block>
              {/* avatar */}
              <Block
                marginTop={6}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}>
                {/* left */}
                <Block direction={'row'} alignItems={'center'}>
                  <TouchableOpacity>
                    <Block
                      style={{
                        height: 24,
                        width: 24,
                        borderRadius: 24,
                        overflow: 'hidden',
                        marginRight: 3,
                      }}>
                      <Image
                        style={{
                          height: 24,
                          width: 24,
                        }}
                        source={{ uri: top.userImageUrl }}
                        resizeMode={'cover'}
                      />
                    </Block>
                  </TouchableOpacity>
                  <Block>
                    <Text fontSize={12} color={'#A8A8A8'}>
                      {top.userName}
                    </Text>
                  </Block>
                </Block>
                {/* right */}
                <Block direction={'row'} alignItems={'center'}>
                  <Block>
                    <VectorIcon icon={'bx_heart'} size={15} color={'#a8a8a8'} />
                  </Block>
                  <Block>
                    <Text fontSize={12} color={'#a8a8a8'}>
                      {top.likeCount / 1000}k
                    </Text>
                  </Block>
                </Block>
              </Block>
            </Block>
          ))}
        </Block>
        {/* other search */}
        <Block marginTop={12}>
          <Text fontSize={15} fontWeight={'bold'}>
            Others searched for
          </Text>
          <Block
            marginTop={12}
            direction={'row'}
            flexWrap={'wrap'}
            style={{
              justifyContent: 'space-between',
            }}>
            {otherSearchList.map((other: OtherSearch) => (
              <Block
                key={other.id}
                style={{
                  width: '49%',
                  marginBottom: 18,
                }}>
                <TouchableOpacity>
                  <Block
                    style={{
                      backgroundColor: '#e3e4e5',
                      paddingVertical: 12,
                      paddingHorizontal: 9,
                    }}>
                    <Text fontSize={12}>{other.text}</Text>
                  </Block>
                </TouchableOpacity>
              </Block>
            ))}
          </Block>
        </Block>
        {/* video list */}
        <Block marginTop={12} marginBottom={12}>
          <Text fontSize={15} fontWeight={'bold'}>
            Videos
          </Text>
        </Block>
        <Block
          direction={'row'}
          flexWrap={'wrap'}
          style={{
            justifyContent: 'space-between',
          }}>
          {topList.map((top: Top) => (
            <Block
              key={top.id}
              style={{
                width: '49%',
                marginBottom: 18,
              }}>
              {/* image */}
              <TouchableOpacity>
                <Block
                  style={{
                    height: 270,
                    width: '100%',
                    marginBottom: 6,
                    position: 'relative',
                  }}>
                  <Image
                    style={{
                      height: 270,
                      width: '100%',
                    }}
                    source={{ uri: top.url }}
                    resizeMode={'cover'}
                  />
                  <Block
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      left: 6,
                      zIndex: 1,
                    }}>
                    <Text color={'white'} fontSize={12}>
                      {dayjs(top.date.toDateString()).format('MM/DD')}
                    </Text>
                  </Block>
                </Block>
              </TouchableOpacity>
              {/* info */}
              <Block>
                <Text fontSize={12} color={'#a8a8a8'}>
                  {top.title}
                </Text>
                <Text fontSize={12}>{top.subtitle}</Text>
              </Block>
              {/* avatar */}
              <Block
                marginTop={6}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}>
                {/* left */}
                <Block direction={'row'} alignItems={'center'}>
                  <TouchableOpacity>
                    <Block
                      style={{
                        height: 24,
                        width: 24,
                        borderRadius: 24,
                        overflow: 'hidden',
                        marginRight: 3,
                      }}>
                      <Image
                        style={{
                          height: 24,
                          width: 24,
                        }}
                        source={{ uri: top.userImageUrl }}
                        resizeMode={'cover'}
                      />
                    </Block>
                  </TouchableOpacity>
                  <Block>
                    <Text fontSize={12} color={'#A8A8A8'}>
                      {top.userName}
                    </Text>
                  </Block>
                </Block>
                {/* right */}
                <Block direction={'row'} alignItems={'center'}>
                  <Block>
                    <VectorIcon icon={'bx_heart'} size={15} color={'#a8a8a8'} />
                  </Block>
                  <Block>
                    <Text fontSize={12} color={'#a8a8a8'}>
                      {top.likeCount / 1000}k
                    </Text>
                  </Block>
                </Block>
              </Block>
            </Block>
          ))}
        </Block>
      </>
    );
  };

  const renderVideos = () => {
    return (
      <Block
        direction={'row'}
        flexWrap={'wrap'}
        style={{
          justifyContent: 'space-between',
        }}>
        {topList.map((top: Top) => (
          <Block
            key={top.id}
            style={{
              width: '49%',
              marginBottom: 18,
            }}>
            {/* image */}
            <TouchableOpacity>
              <Block
                style={{
                  height: 270,
                  width: '100%',
                  marginBottom: 6,
                  position: 'relative',
                }}>
                <Image
                  style={{
                    height: 270,
                    width: '100%',
                  }}
                  source={{ uri: top.url }}
                  resizeMode={'cover'}
                />
                <Block
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    left: 6,
                    zIndex: 1,
                  }}>
                  <Text color={'white'} fontSize={12}>
                    {dayjs(top.date.toDateString()).format('MM/DD')}
                  </Text>
                </Block>
              </Block>
            </TouchableOpacity>
            {/* info */}
            <Block>
              <Text fontSize={12} color={'#a8a8a8'}>
                {top.title}
              </Text>
              <Text fontSize={12}>{top.subtitle}</Text>
            </Block>
            {/* avatar */}
            <Block
              marginTop={6}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}>
              {/* left */}
              <Block direction={'row'} alignItems={'center'}>
                <TouchableOpacity>
                  <Block
                    style={{
                      height: 24,
                      width: 24,
                      borderRadius: 24,
                      overflow: 'hidden',
                      marginRight: 3,
                    }}>
                    <Image
                      style={{
                        height: 24,
                        width: 24,
                      }}
                      source={{ uri: top.userImageUrl }}
                      resizeMode={'cover'}
                    />
                  </Block>
                </TouchableOpacity>
                <Block>
                  <Text fontSize={12} color={'#A8A8A8'}>
                    {top.userName}
                  </Text>
                </Block>
              </Block>
              {/* right */}
              <Block direction={'row'} alignItems={'center'}>
                <Block>
                  <VectorIcon icon={'bx_heart'} size={15} color={'#a8a8a8'} />
                </Block>
                <Block>
                  <Text fontSize={12} color={'#a8a8a8'}>
                    {top.likeCount / 1000}k
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        ))}
      </Block>
    );
  };

  const renderUsers = () => {
    return userList.map(user => (
      <Block key={user.id} direction={'row'} marginBottom={18}>
        <Block
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          {/* avatar */}
          <Block marginRight={12}>
            {user.userImageUrl ? (
              <Block
                style={{
                  height: USER_AVATAR_SIZE,
                  width: USER_AVATAR_SIZE,
                  borderRadius: USER_AVATAR_SIZE,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{
                    height: USER_AVATAR_SIZE,
                    width: USER_AVATAR_SIZE,
                  }}
                  source={{ uri: user.userImageUrl }}
                  resizeMode={'cover'}
                />
              </Block>
            ) : (
              <Block
                style={{
                  height: USER_AVATAR_SIZE,
                  width: USER_AVATAR_SIZE,
                  borderRadius: USER_AVATAR_SIZE,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#CF783F',
                }}>
                <Text color={'white'} fontSize={30}>
                  {capitalize(user.name.substring(0, 1))}
                </Text>
              </Block>
            )}
          </Block>
          {/* info */}
          <Block>
            <Text fontSize={12} fontWeight={'bold'}>
              {user.name}
            </Text>
            <Text fontSize={12} color={'#a8a8a8'}>
              {user.description}
            </Text>
            <Text fontSize={12} color={'#a8a8a8'}>
              {user.numberOfFollowers} followers·{user.numberOfVideos} videos
            </Text>
          </Block>
        </Block>
        {/* button */}
        <Block
          alignItems={'flex-end'}
          justifyContent={'center'}
          style={{ flexGrow: 1 }}>
          {user.isFollowed ? (
            <Button>
              <Block
                style={{
                  backgroundColor: 'transparent',
                  borderWidth: 0.5,
                  borderColor: '#c2c2c2',
                  paddingVertical: 6,
                  width: 90,
                }}>
                <Text fontSize={12} center>
                  Following
                </Text>
              </Block>
            </Button>
          ) : (
            <Button>
              <Block
                style={{
                  backgroundColor: '#D4525E',
                  paddingVertical: 6,
                  width: 90,
                }}>
                <Text color={'white'} fontSize={12} center>
                  Follow
                </Text>
              </Block>
            </Button>
          )}
        </Block>
      </Block>
    ));
  };

  const renderSounds = () => {
    return soundList.map(sound => (
      <Block key={sound.id} direction={'row'} marginBottom={18}>
        <Block
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          {/* avatar */}
          <Block marginRight={12}>
            <TouchableOpacity>
              <Block
                style={{
                  height: SOUND_AVATAR_SIZE,
                  width: SOUND_AVATAR_SIZE,
                  position: 'relative',
                }}>
                <Block
                  style={{
                    position: 'absolute',
                    top: 9,
                    left: 9,
                    zIndex: 1,
                  }}>
                  <VectorIcon
                    icon={'bx_play'}
                    size={48}
                    color={'rgba(255,255,255,0.5)'}
                  />
                </Block>
                <Image
                  style={{
                    height: SOUND_AVATAR_SIZE,
                    width: SOUND_AVATAR_SIZE,
                  }}
                  source={{ uri: sound.imageUrl }}
                  resizeMode={'cover'}
                />
              </Block>
            </TouchableOpacity>
          </Block>
          {/* info */}
          <Block>
            <Text fontSize={12} fontWeight={'bold'}>
              {sound.title}
            </Text>
            <Text fontSize={12} color={'#a8a8a8'}>
              {sound.author}
            </Text>
            <Block marginTop={6}>
              <Text fontSize={12} color={'#a8a8a8'}>
                {formatSoundSecond(sound.seconds)}
              </Text>
            </Block>
          </Block>
        </Block>
        {/* button */}
        <Block
          alignItems={'flex-end'}
          justifyContent={'center'}
          style={{ flexGrow: 1 }}>
          <Text fontSize={12} center>
            {sound.numberOfLikes > 1000
              ? `${sound.numberOfLikes / 1000}k`
              : sound.numberOfLikes}
          </Text>
        </Block>
      </Block>
    ));
  };

  const renderHashtags = () => {
    return hashtagList.map(hashtag => (
      <TouchableOpacity key={hashtag.id}>
        <Block direction={'row'} marginBottom={18}>
          <Block direction={'row'} alignItems={'center'}>
            <Block
              style={{
                borderWidth: 0.5,
                borderColor: '#c2c2c2',
                borderRadius: 30,
                marginRight: 12,
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <VectorIcon icon={'bx_hash'} size={18} />
            </Block>
            <Block>
              <Text fontSize={13} fontWeight={'bold'}>
                {hashtag.text}
              </Text>
            </Block>
          </Block>
          <Block style={{ flexGrow: 1, alignItems: 'flex-end' }}>
            <Text fontSize={13} color={'#a8a8a8'}>
              {hashtag.numberOfViews / 1000}k views
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    ));
  };

  const renderLives = () => {
    return (
      <Block
        direction={'row'}
        flexWrap={'wrap'}
        style={{
          justifyContent: 'space-between',
        }}>
        {LIVEList.map(Live => (
          <Block
            key={Live.id}
            style={{
              width: '49%',
              marginBottom: 12,
            }}>
            {/* cover */}
            <TouchableOpacity>
              <Block
                style={{
                  height: 270,
                  width: '100%',
                  position: 'relative',
                }}>
                <Block
                  style={{
                    position: 'absolute',
                    top: 9,
                    left: 9,
                    zIndex: 1,
                  }}>
                  <Block
                    direction={'row'}
                    style={{
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}>
                    <Block
                      style={{
                        backgroundColor: '#D4525E',
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                      }}>
                      <Text color={'white'} fontSize={12}>
                        LIVE
                      </Text>
                    </Block>
                    <Block
                      direction={'row'}
                      alignItems={'center'}
                      style={{
                        backgroundColor: '#7E7E7E',
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                      }}>
                      <Block marginRight={3}>
                        <VectorIcon icon={'like'} size={12} color={'white'} />
                      </Block>
                      <Text color={'white'} fontSize={12}>
                        {Live.numberOfLikes > 1000
                          ? `${Live.numberOfLikes / 1000}k`
                          : Live.numberOfLikes}
                      </Text>
                    </Block>
                  </Block>
                </Block>
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  source={{ uri: Live.coverImageUrl }}
                  resizeMode={'cover'}
                />
              </Block>
            </TouchableOpacity>
            {/* info */}
            <Block marginTop={6}>
              <Text fontSize={12} fontWeight={'bold'}>
                {Live.title}
              </Text>
            </Block>
            <Block marginTop={6} direction={'row'} alignItems={'center'}>
              <Block
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 24,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  source={{ uri: Live.userImageUrl }}
                  resizeMode={'cover'}
                />
              </Block>
              <Block marginLeft={6}>
                <Text color={'#a8a8a8'} fontSize={12}>
                  {Live.author}
                </Text>
              </Block>
            </Block>
          </Block>
        ))}
      </Block>
    );
  };

  const renderContent = () => {
    // top
    if (index === 0) {
      return renderTop();
    } else if (index === 1) {
      return renderUsers();
    } else if (index === 2) {
      return renderVideos();
    } else if (index === 3) {
      return renderSounds();
    } else if (index === 4) {
      return renderLives();
    } else if (index === 5) {
      return renderHashtags();
    }
    return null;
  };

  const renderItem = ({ item }: { item: Filter }) => {
    return (
      <Block
        style={{
          width: width - 30,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 12,
          }}>
          {renderContent()}
        </ScrollView>
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

const formatSoundSecond = (timeInSeconds: number) => {
  const secLength = (timeInSeconds % 60).toString().length;
  return `${(timeInSeconds / 60) | 0}:${timeInSeconds % 60}${
    secLength === 1 ? '0' : ''
  }`;
};
