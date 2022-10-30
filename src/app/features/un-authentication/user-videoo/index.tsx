import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Animated as AnimatedRN,
  Dimensions,
  Easing,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  NativeModules,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import isEqual from 'react-fast-compare';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { dispatch } from '@common';
import { Block, Button, Divider, Image, Screen, Text } from '@components';
import { rxEmail, rxMobile } from '@config/regex';
import { goBack, navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions } from '@redux-slice';
import { capitalize } from '@utils/common';
import dayjs from 'dayjs';

type View = {
  id: string;
  type: string;
};
// TODO: replace
const views: View[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    type: 'SHARE',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    type: 'PRIVATE',
  },
];

type Share = {
  id: string;
  title: string;
};
const shares: Share[] = [
  {
    id: 'aa7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'ikea fall 2022',
  },
  {
    id: 'bb7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'renter friendly upgrades',
  },
  {
    id: 'cc7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Quebec gateway',
  },
  {
    id: 'dd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Ontario developer',
  },
  {
    id: 'ee7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'React Native',
  },
  {
    id: 'ff7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Springboot',
  },
  {
    id: 'gg7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Typescipt programming',
  },
  {
    id: 'hh7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'AI flask algorithm',
  },
  {
    id: 'ii7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Digital devops',
  },
];

type Suggest = {
  id: string;
  title: string;
  userImageUrl: string;
  followerCount: number;
};
const suggestList: Suggest[] = [
  {
    id: '1',
    title: 'katekerditips',
    userImageUrl: 'https://picsum.photos/id/1002/4312/2868',
    followerCount: 11500,
  },
  {
    id: '2',
    title: 'ikea',
    userImageUrl: 'https://picsum.photos/id/1003/1181/1772',
    followerCount: 64500,
  },
  {
    id: '3',
    title: 'homedecor',
    userImageUrl: 'https://picsum.photos/id/1004/5616/3744',
    followerCount: 6983,
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
  {
    id: '5',
    url: 'https://picsum.photos/id/1002/4312/2868',
    date: new Date('2022-01-01'),
    title: '...#katekerditips',
    subtitle: '#homedecorideas',
    userImageUrl: 'https://picsum.photos/id/1002/4312/2868',
    userName: 'katekerdiinteri...',
    likeCount: 11500,
  },
  {
    id: '6',
    url: 'https://picsum.photos/id/1003/1181/1772',
    date: new Date('2022-01-02'),
    title: '...home decor from ikea',
    subtitle: 'alwways get asked abandor',
    userImageUrl: 'https://picsum.photos/id/1003/1181/1772',
    userName: 'emilyrogs',
    likeCount: 64500,
  },
  {
    id: '7',
    url: 'https://picsum.photos/id/1004/5616/3744',
    date: new Date('2022-01-03'),
    title: '...#homedecorideas',
    subtitle: '#ikeafinds #interiordesign',
    userImageUrl: 'https://picsum.photos/id/1004/5616/3744',
    userName: 'jordansamson..',
    likeCount: 6983,
  },
  {
    id: '8',
    url: 'https://picsum.photos/id/1005/5760/3840',
    date: new Date('2022-01-04'),
    title: '...#homedecor',
    subtitle: '#apartmentdecors #rente..',
    userImageUrl: 'https://picsum.photos/id/1005/5760/3840',
    userName: 'crampedliving',
    likeCount: 8602,
  },
  {
    id: '9',
    url: 'https://picsum.photos/id/1005/5760/3840',
    date: new Date('2022-01-04'),
    title: '...#homedecor',
    subtitle: '#apartmentdecors #rente..',
    userImageUrl: 'https://picsum.photos/id/1005/5760/3840',
    userName: 'crampedliving',
    likeCount: 118602,
  },
];

const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const BTN_COLOR = '#E8445A';
const AVATAR_ICON_SIZE = 84;
const SUGGEST_ICON_SIZE = 120;
const { height, width } = Dimensions.get('window');
const MAIN_HEADER_HEIGHT = 48;

const MAIN_HEADER_BAR_WIDTH = width;
const distance = MAIN_HEADER_BAR_WIDTH;
const aniControlValue = new AnimatedRN.Value(0);
const MAIN_HEADER_BAR_UNDERNEATH_WIDTH = 48;

const UserVideoComponent = () => {
  const [hasAvatar, setHasAvatar] = useState<boolean>(false);
  const [openSuggest, setOpenSuggest] = useState<boolean>(false);
  const _refTabRoot = useRef<FlatList>(null);
  const _refShareTitleRoot = useRef<ScrollView>(null);
  const [translateX, setTranslateX] = useState<number>(0);
  const [shareIndex, setShareIndex] = useState<number>(0);

  useEffect(() => {
    AnimatedRN.timing(aniControlValue, {
      toValue: translateX / distance,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [translateX]);

  const translateDistance = aniControlValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, distance / 2],
  });
  const opacityShare = aniControlValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });
  const opacityPrivate = aniControlValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const renderShareTitles = () => {
    return shares.map((b, index) => (
      <Block
        key={b.id}
        style={{
          alignItems: 'center',
          borderWidth: 0.5,
          borderColor: '#6F7681',
          marginLeft: 6,
          marginRight: 6,
          height: 36,
        }}
        justifyContent={'center'}
        paddingHorizontal={12}>
        <Button
          onPress={() => {
            setShareIndex(index);
          }}>
          <Block direction={'row'} alignItems={'center'}>
            <Text color={shareIndex === index ? 'black' : '#6F7681'}>
              {capitalize(b.title)}
            </Text>
          </Block>
        </Button>
      </Block>
    ));
  };

  const renderItem = ({ item }: { item: View }) => {
    if (item.type === 'SHARE') {
      return (
        <Block
          style={{
            width,
          }}>
          {/* title list */}
          <Block
            style={{
              height: 48,
              marginTop: 12,
            }}>
            <ScrollView
              ref={_refShareTitleRoot}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {renderShareTitles()}
            </ScrollView>
          </Block>
          <Divider color="#ccc" height={0.5} />
          {/* main content */}
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
                  width: '33%',
                  marginBottom: 3,
                }}>
                {/* image */}
                <TouchableOpacity>
                  <Block
                    style={{
                      height: 180,
                      width: '100%',
                      position: 'relative',
                    }}>
                    <Image
                      style={{
                        height: 180,
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
                      <Block direction={'row'}>
                        <Block marginRight={3}>
                          <VectorIcon
                            icon={'bx_play'}
                            size={16}
                            color={'white'}
                          />
                        </Block>
                        <Text color={'white'} fontSize={12}>
                          {top.likeCount / 1000}k
                        </Text>
                      </Block>
                    </Block>
                  </Block>
                </TouchableOpacity>
              </Block>
            ))}
          </Block>
        </Block>
      );
    } else if (item.type === 'PRIVATE') {
      return (
        <Block
          style={{
            width,
          }}></Block>
      );
    }
    return null;
  };

  const renderTopBar = () => (
    <Block
      style={{
        paddingTop: statusBarHeight,
        position: 'relative',
        height: MAIN_HEADER_HEIGHT + statusBarHeight,
        borderBottomWidth: 1,
        borderColor: '#ddd',
      }}>
      <Block
        style={{
          position: 'absolute',
          top: statusBarHeight,
          left: 0,
          height: MAIN_HEADER_HEIGHT,
          width,
          flexDirection: 'row',
          zIndex: 99,
        }}>
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
              goBack();
            }}>
            <VectorIcon icon={'bx_chevron_left1'} size={48} />
          </Button>
        </Block>
        <Block
          style={{
            position: 'absolute',
            right: 42,
            top: 0,
            height: MAIN_HEADER_HEIGHT,
            width: MAIN_HEADER_HEIGHT,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}>
          <Button onPress={() => {}}>
            <VectorIcon icon={'bx_bell'} size={24} />
          </Button>
        </Block>
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
          <Button onPress={() => {}}>
            <VectorIcon icon={'bx_dots_horizontal_rounded'} size={30} />
          </Button>
        </Block>
        <Block
          block
          style={{
            position: 'relative',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text fontSize={15} fontWeight={'bold'}>
            jrhe12
          </Text>
        </Block>
      </Block>
    </Block>
  );

  const renderSuggested = (suggest: Suggest) => (
    <Block
      key={suggest.id}
      style={{
        backgroundColor: '#F8F8F8',
        marginRight: 12,
        padding: 24,
        width: 180,
        position: 'relative',
      }}>
      {/* close btn */}
      <Block
        style={{
          position: 'absolute',
          right: 9,
          top: 9,
          zIndex: 1,
        }}>
        <Button>
          <VectorIcon icon={'x_cross_exit'} size={15} />
        </Button>
      </Block>
      {/* avatar */}
      <Block
        style={{
          width: SUGGEST_ICON_SIZE,
          height: SUGGEST_ICON_SIZE,
          borderRadius: SUGGEST_ICON_SIZE,
          overflow: 'hidden',
        }}>
        <Image
          style={{
            height: SUGGEST_ICON_SIZE,
            width: SUGGEST_ICON_SIZE,
          }}
          source={{ uri: suggest.userImageUrl }}
          resizeMode={'cover'}
        />
      </Block>
      {/* info */}
      <Block marginTop={12} direction={'row'} justifyContent={'center'}>
        <Text fontSize={12} fontWeight={'bold'}>
          {suggest.title}
        </Text>
        <Block
          style={{
            backgroundColor: '#83CEE6',
            borderRadius: 30,
            marginLeft: 3,
          }}>
          <VectorIcon icon={'bx_check'} size={15} color={'white'} />
        </Block>
      </Block>
      <Block marginTop={6}>
        <Text fontSize={12} color={'#8A8A8A'} textAlign={'center'}>
          {suggest.followerCount / 1000}k followers
        </Text>
      </Block>
      <Block marginTop={18}>
        <Button>
          <Block
            style={{
              backgroundColor: BTN_COLOR,
              paddingVertical: 6,
              borderRadius: 3,
            }}>
            <Text color={'white'} fontSize={15} textAlign={'center'}>
              Follow
            </Text>
          </Block>
        </Button>
      </Block>
    </Block>
  );

  const renderSuggestedAccounts = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {suggestList.map(suggest => renderSuggested(suggest))}
    </ScrollView>
  );

  return (
    <Block
      block
      style={{
        position: 'relative',
      }}>
      {/* Top bar */}
      {renderTopBar()}
      <Screen
        unsafe
        scroll
        statusBarStyle="dark-content"
        bottomInsetColor="transparent"
        backgroundColor={'transparent'}>
        {/* main form */}
        <Block
          style={{
            padding: 24,
            paddingBottom: 18,
            width: '100%',
          }}>
          {/* avatar */}
          <Block alignItems={'center'}>
            {!hasAvatar ? (
              <Block
                style={{
                  height: AVATAR_ICON_SIZE,
                  width: AVATAR_ICON_SIZE,
                  borderRadius: AVATAR_ICON_SIZE,
                  backgroundColor: '#B1305B',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text color={'white'} fontSize={48}>
                  J
                </Text>
              </Block>
            ) : (
              <Block
                style={{
                  width: AVATAR_ICON_SIZE,
                  height: AVATAR_ICON_SIZE,
                  borderRadius: AVATAR_ICON_SIZE,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{
                    height: AVATAR_ICON_SIZE,
                    width: AVATAR_ICON_SIZE,
                  }}
                  source={{ uri: 'https://picsum.photos/id/1009/5000/7502' }}
                  resizeMode={'cover'}
                />
              </Block>
            )}
            <Block marginTop={9}>
              <Text fontSize={15} center>
                @jrhe1213
              </Text>
            </Block>
          </Block>
          {/* static bar */}
          <Block alignItems={'center'}>
            <Block
              direction={'row'}
              alignItems={'center'}
              width={(2 / 3) * width}
              marginTop={24}>
              <Block flex={1}>
                <Text fontSize={12} center fontWeight={'bold'}>
                  8
                </Text>
                <Text
                  fontSize={12}
                  center
                  style={{ marginTop: 3 }}
                  color={'#8A8A8A'}>
                  Following
                </Text>
              </Block>
              <Block
                style={{
                  width: 0.5,
                  height: 18,
                  backgroundColor: '#8A8A8A',
                }}
              />
              <Block flex={1}>
                <Text fontSize={12} center fontWeight={'bold'}>
                  160.1K
                </Text>
                <Text
                  fontSize={12}
                  center
                  style={{ marginTop: 3 }}
                  color={'#8A8A8A'}>
                  Follower
                </Text>
              </Block>
              <Block
                style={{
                  width: 0.5,
                  height: 18,
                  backgroundColor: '#8A8A8A',
                }}
              />
              <Block flex={1}>
                <Text fontSize={12} center fontWeight={'bold'}>
                  2.2M
                </Text>
                <Text
                  fontSize={12}
                  center
                  style={{ marginTop: 3 }}
                  color={'#8A8A8A'}>
                  Likes
                </Text>
              </Block>
            </Block>
          </Block>
          {/* buttons */}
          <Block direction={'row'} justifyContent={'center'} marginTop={12}>
            <Block>
              <Button>
                <Block
                  style={{
                    backgroundColor: BTN_COLOR,
                    paddingVertical: 12,
                    paddingHorizontal: 48,
                    borderRadius: 3,
                  }}>
                  <Text color={'white'} fontSize={15}>
                    Follow
                  </Text>
                </Block>
              </Button>
            </Block>
            <Block marginLeft={3} marginRight={3}>
              <Button>
                <Block
                  style={{
                    borderColor: '#c2c2c2',
                    borderWidth: 0.5,
                    borderRadius: 3,
                    padding: 7,
                  }}>
                  <VectorIcon icon={'bx_camera'} size={27} />
                </Block>
              </Button>
            </Block>
            <Block>
              <Button
                onPress={() => {
                  setOpenSuggest(!openSuggest);
                }}>
                <Block
                  style={{
                    borderColor: '#c2c2c2',
                    borderWidth: 0.5,
                    borderRadius: 3,
                    padding: 7,
                  }}>
                  <VectorIcon
                    icon={openSuggest ? 'bx_chevron_up' : 'bx_chevron_down'}
                    size={27}
                  />
                </Block>
              </Button>
            </Block>
          </Block>
          {/* info */}
          <Block marginTop={12}>
            <Block marginBottom={6}>
              <Text center>ALL THINGS HOME & DESIGN</Text>
            </Block>
            <TouchableOpacity>
              <Block direction={'row'} justifyContent={'center'}>
                <Block marginRight={3}>
                  <VectorIcon icon={'bx_link'} size={15} />
                </Block>
                <Text fontSize={12} fontWeight={'bold'}>
                  https://github.com/jrhe123
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>
          {/* suggested */}
          {openSuggest && (
            <Block style={{ marginTop: 24 }}>
              {/* info */}
              <Block direction={'row'} justifyContent={'space-between'}>
                {/* left */}
                <Block direction={'row'} alignItems={'center'}>
                  <Block marginRight={3}>
                    <Text fontSize={13}>Suggested accounts</Text>
                  </Block>
                  <VectorIcon icon={'bx_info_circle'} size={18} />
                </Block>
                {/* right */}
                <Block direction={'row'} alignItems={'center'}>
                  <Block marginRight={3}>
                    <Text fontSize={13}>View all</Text>
                  </Block>
                  <VectorIcon icon={'bx_chevron_right'} size={21} />
                </Block>
              </Block>
              {/* main content */}
              <Block
                direction={'row'}
                style={{
                  marginTop: 24,
                }}>
                {renderSuggestedAccounts()}
              </Block>
            </Block>
          )}
        </Block>
        <Block>
          <Divider color="#ccc" height={0.5} />
        </Block>
        {/* two tab bar */}
        <Block
          style={{
            marginTop: 24,
            position: 'relative',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* tab 1 */}
          <Block
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button
              onPress={() => {
                if (_refTabRoot.current) {
                  _refTabRoot.current?.scrollToIndex({
                    animated: true,
                    index: 0,
                  });
                }
              }}>
              <AnimatedRN.Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  opacity: opacityShare,
                }}>
                <VectorIcon icon={'bx_menu'} size={24} />
              </AnimatedRN.Text>
            </Button>
          </Block>
          {/* tab 2 */}
          <Block
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button
              onPress={() => {
                if (_refTabRoot.current) {
                  _refTabRoot.current?.scrollToIndex({
                    animated: true,
                    index: 1,
                  });
                }
              }}>
              <AnimatedRN.Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  opacity: opacityPrivate,
                }}>
                <VectorIcon icon={'bx_heart1'} size={24} />
              </AnimatedRN.Text>
            </Button>
          </Block>
          {/* Underneath bar */}
          <AnimatedRN.View
            style={{
              position: 'absolute',
              transform: [{ translateX: translateDistance }],
              bottom: -14,
              left: (distance / 2 - MAIN_HEADER_BAR_UNDERNEATH_WIDTH) / 2,
              height: 2,
              width: MAIN_HEADER_BAR_UNDERNEATH_WIDTH,
              backgroundColor: 'black',
              borderRadius: 2,
            }}
          />
        </Block>
        <Block marginTop={11}>
          <Divider color="#ccc" height={0.5} />
        </Block>
        {/* horizontal */}
        <FlatList
          onScroll={e => {
            setTranslateX((e.nativeEvent.contentOffset.x / width) * distance);
          }}
          ref={_refTabRoot}
          data={views}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          style={{
            width,
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

export const UserVideo = memo(UserVideoComponent, isEqual);
