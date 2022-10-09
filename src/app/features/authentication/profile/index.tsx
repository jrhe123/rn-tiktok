import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Animated as AnimatedRN,
  Dimensions,
  Easing,
  FlatList,
  NativeModules,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import isEqual from 'react-fast-compare';
import LinearGradient from 'react-native-linear-gradient';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { Block, Button, Divider, Screen, Text } from '@components';
import { useDebounce } from '@hooks';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions } from '@redux-slice';
import { capitalize } from '@utils/common';

type View = {
  id: string;
  type: string;
};
type Bookmark = {
  id: string;
  title: string;
  type: string;
  count: number;
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
  {
    id: '1ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    type: 'BOOKMARK',
  },
  {
    id: '5ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    type: 'LIKE',
  },
];
const bookmarks: Bookmark[] = [
  {
    id: 'aa7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'videos',
    type: 'VIDEOS',
    count: 0,
  },
  {
    id: 'bb7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'collections',
    type: 'COLLECTIONS',
    count: 0,
  },
  {
    id: 'cc7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'sounds',
    type: 'SOUNDS',
    count: 0,
  },
  {
    id: 'dd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'effects',
    type: 'EFFECTS',
    count: 0,
  },
  {
    id: 'ee7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'places',
    type: 'PLACES',
    count: 0,
  },
  {
    id: 'ff7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'comments',
    type: 'COMMENTS',
    count: 0,
  },
  {
    id: 'gg7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'questions',
    type: 'QUESTIONS',
    count: 0,
  },
  {
    id: 'hh7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'hashtags',
    type: 'HASHTAGS',
    count: 0,
  },
  {
    id: 'ii7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'products',
    type: 'PRODUCTS',
    count: 0,
  },
];
const MAIN_HEADER_BAR_UNDERNEATH_WIDTH = 48;
const { width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const statusBarOffset = 0;
const MAIN_HEADER_HEIGHT = 60;
const MENU_ICON_SIZE = 30;
const EYE_ICON_SIZE = 30;
const USER_ICON_SIZE = 30;
const AVATAR_ICON_SIZE = 84;
const AVATAR_SM_ICON_SIZE = 21;
const CAMERA_BUTTON_SIZE = 96;
const CAMERA_ICON_SIZE = 42;
const CAROUSEL_HEIGHT = 72;
const OPTION_BTN_COLOR = '#E8445A';

const BANNER_TEXT: string[] = [
  'Review followed accounts',
  'Be your creative self',
  'Revisit videos you liked',
  'Review followed accounts',
  'Be your creative self',
  'Revisit videos you liked',
  'Review followed accounts',
  'Be your creative self',
  'Revisit videos you liked',
  'Review followed accounts',
  'Be your creative self',
  'Revisit videos you liked',
];

const MAIN_HEADER_BAR_WIDTH = width - 54;
const distance = MAIN_HEADER_BAR_WIDTH;
const aniControlValue = new AnimatedRN.Value(0);
const ProfileComponent = () => {
  const _refRoot = useRef<ScrollView>(null);
  const _refTabRoot = useRef<FlatList>(null);
  const _refBookmarkTitleRoot = useRef<ScrollView>(null);
  const _refBookmarkRoot = useRef<ScrollView>(null);
  const [index, setIndex] = useState<number>(0);
  const [bookmarkIndex, setBookmarkIndex] = useState<number>(0);
  const [isAuth, setIsAuth] = useState<boolean>(true);
  const [translateX, setTranslateX] = useState<number>(0);
  const [showAskPhone, setshowAskPhone] = useState<boolean>(true);
  const debouncedParam = useDebounce(bookmarkIndex, 200);

  useEffect(() => {
    // carousel auto scroll
    const id = setInterval(() => {
      setIndex(prevIndex => prevIndex + 1);
    }, 4000);
    return () => {
      clearInterval(id);
      console.log('unmount profile');
    };
  }, []);

  useEffect(() => {
    const scrollIndex = index % BANNER_TEXT.length;
    if (_refRoot.current) {
      _refRoot.current?.scrollTo({
        x: 0,
        y: (CAROUSEL_HEIGHT / 2 + 2) * scrollIndex,
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
      {isAuth && (
        <>
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
            }}>
            <TouchableOpacity onPress={() => {}}>
              <VectorIcon icon={'bx_user_plus'} size={USER_ICON_SIZE} />
            </TouchableOpacity>
          </Block>
          <Block
            style={{
              position: 'absolute',
              left: 48,
              top: 0,
              height: MAIN_HEADER_HEIGHT,
              width: MAIN_HEADER_HEIGHT,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => {}}>
              <VectorIcon
                icon={'bx_award'}
                size={USER_ICON_SIZE}
                color={'#ECD064'}
              />
            </TouchableOpacity>
          </Block>
          <Block
            style={{
              position: 'absolute',
              right: 48,
              top: 0,
              height: MAIN_HEADER_HEIGHT,
              width: MAIN_HEADER_HEIGHT,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => {}}>
              <VectorIcon icon={'bx_street_view'} size={EYE_ICON_SIZE} />
            </TouchableOpacity>
          </Block>
        </>
      )}
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
        <TouchableOpacity
          onPress={() => {
            navigate(APP_SCREEN.SETTINGS);
          }}>
          <VectorIcon icon={'bx_menu'} size={MENU_ICON_SIZE} />
        </TouchableOpacity>
      </Block>
      {isAuth ? (
        <Block direction={'row'} alignItems={'center'}>
          <AnimatedRN.Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            jiarong
          </AnimatedRN.Text>
          <TouchableOpacity>
            <VectorIcon icon={'bx_chevron_down'} size={24} />
          </TouchableOpacity>
        </Block>
      ) : (
        <AnimatedRN.Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Profile
        </AnimatedRN.Text>
      )}
    </Block>
  );

  const renderUnAuth = () => (
    <Block paddingHorizontal={25}>
      {/* camera icon */}
      <Block
        style={{
          marginTop: 36,
          alignItems: 'center',
        }}>
        <TouchableOpacity>
          <LinearGradient
            colors={['#fcdcec', '#cdedf7']}
            style={{
              width: CAMERA_BUTTON_SIZE,
              height: CAMERA_BUTTON_SIZE,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: CAMERA_BUTTON_SIZE,
            }}>
            <VectorIcon icon={'bx_camera'} size={CAMERA_ICON_SIZE} />
          </LinearGradient>
        </TouchableOpacity>
        <Block style={{ marginTop: 9 }}>
          <Text fontSize={15}>@username</Text>
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
              0
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
              0
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
              0
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
      {/* silder */}
      <Block style={{ marginTop: 90 }} alignItems={'center'}>
        <ScrollView
          ref={_refRoot}
          pagingEnabled={false}
          scrollEnabled={false}
          style={{
            height: CAROUSEL_HEIGHT,
          }}>
          {BANNER_TEXT.map((banner, i) => {
            return (
              <Block
                block
                key={i}
                alignItems={'center'}
                justifyContent={'center'}
                width={'100%'}
                height={CAROUSEL_HEIGHT / 2}
                overflow={'hidden'}>
                <Text
                  fontSize={21}
                  fontWeight={'bold'}
                  style={{
                    opacity: index % 3 === i % 3 ? 1 : 0.1,
                    height: CAROUSEL_HEIGHT / 2,
                  }}>
                  {banner}
                </Text>
              </Block>
            );
          })}
        </ScrollView>
      </Block>
      {/* button */}
      <Block style={{ marginTop: 24 }}>
        <Button
          style={{
            backgroundColor: OPTION_BTN_COLOR,
            paddingHorizontal: 13,
            paddingVertical: 15,
            height: 50,
          }}
          onPress={() => {}}>
          <Text color={'white'} fontSize={15} center>
            Log in or sign up
          </Text>
        </Button>
      </Block>
    </Block>
  );

  // ===================
  // ===================
  // ===================

  useEffect(() => {
    AnimatedRN.timing(aniControlValue, {
      toValue: translateX / distance,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [translateX]);

  useEffect(() => {
    if (_refBookmarkRoot.current) {
      // scroll top title
      if (_refBookmarkTitleRoot.current) {
        _refBookmarkTitleRoot.current.scrollTo({
          x: debouncedParam * 120, // 120 per title block
          y: 0,
          animated: true,
        });
      }
      // scroll main content
      _refBookmarkRoot.current.scrollTo({
        x: debouncedParam * width,
        y: 0,
        animated: true,
      });
    }
  }, [debouncedParam]);

  const translateDistance = aniControlValue.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [0, distance / 4, distance / 2, (distance / 4) * 3],
  });
  const opacityShare = aniControlValue.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [1, 0.5, 0.5, 0.5],
  });
  const opacityPrivate = aniControlValue.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [0.5, 1, 0.5, 0.5],
  });
  const opacityBookmark = aniControlValue.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [0.5, 0.5, 1, 0.5],
  });
  const opacityLike = aniControlValue.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [0.5, 0.5, 0.5, 1],
  });

  const renderBookmarkTitles = () => {
    return bookmarks.map((b, index) => (
      <Block
        key={b.id}
        style={{
          width: 120,
          alignItems: 'center',
        }}
        justifyContent={'center'}
        paddingHorizontal={12}>
        <Button
          onPress={() => {
            setBookmarkIndex(index);
          }}>
          <Text color={bookmarkIndex === index ? 'black' : '#6F7681'}>
            {capitalize(b.title)} {b.count}
          </Text>
        </Button>
      </Block>
    ));
  };

  const renderBookmarkContents = () => {
    return bookmarks.map(b => {
      let title = '';
      let content = '';
      switch (b.type) {
        case 'VIDEOS':
          title = 'Favorite videos';
          content = 'Your favorite videos will appear here';
          break;
        case 'COLLECTIONS':
          title = 'Your collections';
          content =
            'Only your favorite videos can be added to a collection. To create a collection, start by adding videos to Favorites';
          break;
        case 'SOUNDS':
          title = 'Favorite sounds';
          content = 'Your favorite sounds will appear here';
          break;
        case 'EFFECTS':
          title = 'Favorite effects';
          content = 'Your favorite effects will appear here';
          break;
        case 'PLACES':
          title = 'Favorite places';
          content = 'Your favorite places will appear here';
          break;
        case 'COMMENTS':
          title = 'Favorite comments';
          content = 'Your favorite comments will appear here';
          break;
        case 'QUESTIONS':
          title = 'Favorite questions';
          content = 'Your favorite questions will appear here';
          break;
        case 'HASHTAGS':
          title = 'Favorite hashtags';
          content = 'Your favorite hashtags will appear here';
          break;
        case 'PRODUCTS':
          title = 'Favorite products';
          content =
            'Your favorite products will appear here. Swipe up to see products you may like.';
          break;
        default:
          break;
      }
      return (
        <Block
          key={b.id}
          paddingHorizontal={25}
          style={{ width }}
          justifyContent={'center'}>
          <Block>
            <Text fontSize={15} fontWeight={'bold'} center>
              {title}
            </Text>
          </Block>
          <Block marginTop={6}>
            <Text fontSize={12} color={'#6F7681'} center>
              {content}
            </Text>
          </Block>
        </Block>
      );
    });
  };

  const renderItem = ({ item }: { item: View }) => {
    if (item.type === 'SHARE') {
      return (
        <Block
          style={{
            width,
          }}>
          <Block marginTop={36}>
            <Block alignItems={'center'}>
              <VectorIcon icon={'bx_photo_album'} size={48} />
            </Block>
            <Block marginTop={12}>
              <Text fontSize={15} center>
                What are some good photos
              </Text>
              <Text fontSize={15} center>
                you've taken recently?
              </Text>
            </Block>
            <Block alignItems={'center'} marginTop={12}>
              <Button
                style={{
                  backgroundColor: OPTION_BTN_COLOR,
                  paddingHorizontal: 24,
                  paddingVertical: 6,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {}}>
                <Text color={'white'} fontSize={15} center>
                  Upload
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      );
    } else if (item.type === 'PRIVATE') {
      return (
        <Block
          style={{
            width,
          }}>
          <Block marginTop={36}>
            <Block>
              <Text fontSize={15} center>
                Your private videos
              </Text>
            </Block>
            <Block marginTop={12}>
              <Text fontSize={12} center color={'#6F7681'}>
                To make your videos only visible to you. set them to
              </Text>
              <Text fontSize={12} center color={'#6F7681'}>
                "Private" in settings
              </Text>
            </Block>
          </Block>
        </Block>
      );
    } else if (item.type === 'BOOKMARK') {
      return (
        <Block
          style={{
            width,
          }}>
          {/* title list */}
          <Block
            style={{
              height: 48,
            }}>
            <ScrollView
              ref={_refBookmarkTitleRoot}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {renderBookmarkTitles()}
            </ScrollView>
          </Block>
          <Divider color="#ccc" height={0.5} />
          {/* main content */}
          <ScrollView
            ref={_refBookmarkRoot}
            scrollEventThrottle={width}
            onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
              const xOffset = event.nativeEvent.contentOffset.x;
              const index = Math.floor(xOffset / width);
              setBookmarkIndex(index);
            }}
            pagingEnabled={true}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {renderBookmarkContents()}
          </ScrollView>
        </Block>
      );
    } else if (item.type === 'LIKE') {
      return (
        <Block
          style={{
            width,
          }}>
          <Block marginTop={36}>
            <Block>
              <Text fontSize={15} center>
                Only you can see which videos you liked
              </Text>
            </Block>
            <Block marginTop={12}>
              <Text fontSize={12} center color={'#6F7681'}>
                You can change this in{' '}
                <Text color={OPTION_BTN_COLOR}>Privacy settings</Text>
              </Text>
            </Block>
          </Block>
        </Block>
      );
    }
    return null;
  };

  const renderAuth = () => (
    <Block style={{ position: 'relative' }} block>
      {/* ask add phone number */}
      {showAskPhone && (
        <Block
          style={{
            width,
            position: 'absolute',
            bottom: 12,
            left: 0,
            paddingHorizontal: 12,
            zIndex: 1,
          }}>
          <Block
            style={{
              paddingVertical: 12,
              paddingHorizontal: 12,
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              borderWidth: 0.5,
              borderColor: '#c2c2c2',
              borderRadius: 3,
            }}>
            <Block>
              <Text fontSize={12} fontWeight={'bold'}>
                Add photo number
              </Text>
              <Text fontSize={12}>Let contacts find you on TikTok</Text>
            </Block>
            <Block direction={'row'}>
              <Block marginRight={12} justifyContent={'center'}>
                <Button
                  style={{
                    paddingVertical: 3,
                    paddingHorizontal: 18,
                    borderWidth: 0.5,
                    borderColor: '#c2c2c2',
                    borderRadius: 3,
                  }}>
                  <Text fontSize={12}>Add</Text>
                </Button>
              </Block>
              <Block justifyContent={'center'}>
                <Button
                  onPress={() => {
                    setshowAskPhone(false);
                  }}>
                  <VectorIcon size={15} icon={'x_cross_exit'} />
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      )}
      {/* main content */}
      <Block paddingHorizontal={25}>
        {/* top icon */}
        <Block marginTop={12} alignItems={'center'}>
          <TouchableOpacity>
            <Block
              style={{
                height: AVATAR_ICON_SIZE,
                width: AVATAR_ICON_SIZE,
                borderRadius: AVATAR_ICON_SIZE,
                backgroundColor: '#B1305B',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}>
              <Block
                style={{
                  backgroundColor: 'white',
                  position: 'absolute',
                  right: -3,
                  bottom: -3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: AVATAR_SM_ICON_SIZE + 6,
                  height: AVATAR_SM_ICON_SIZE + 6,
                  borderRadius: AVATAR_SM_ICON_SIZE + 6,
                }}>
                <LinearGradient
                  colors={['#5DC3F0', '#6DDDCA']}
                  start={{ x: 0.0, y: 0.0 }}
                  end={{ x: 0.5, y: 1.0 }}
                  locations={[0, 1.0]}
                  style={{
                    width: AVATAR_SM_ICON_SIZE,
                    height: AVATAR_SM_ICON_SIZE,
                    borderRadius: AVATAR_SM_ICON_SIZE,
                  }}>
                  <VectorIcon
                    icon={'bx_plus'}
                    color={'white'}
                    size={AVATAR_SM_ICON_SIZE}
                  />
                </LinearGradient>
              </Block>
              <Text color={'white'} fontSize={48}>
                J
              </Text>
            </Block>
          </TouchableOpacity>
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
                0
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
                0
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
                0
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
        {/* edit profile */}
        <Block alignItems={'center'} marginTop={18}>
          <Block>
            <Button
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                height: 40,
                paddingHorizontal: 36,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text fontSize={15}>Edit profile</Text>
            </Button>
          </Block>
          {/* add bio */}
          <TouchableOpacity>
            <Block
              marginTop={12}
              style={{
                backgroundColor: '#E8E8E8',
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 3,
              }}>
              <Text fontSize={9}>+ Add bio</Text>
            </Block>
          </TouchableOpacity>
        </Block>
        {/* four tab bar */}
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
                <VectorIcon icon={'bx_lock'} size={24} />
              </AnimatedRN.Text>
            </Button>
          </Block>
          {/* tab 3 */}
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
                    index: 2,
                  });
                }
              }}>
              <AnimatedRN.Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  opacity: opacityBookmark,
                }}>
                <VectorIcon icon={'bx_bookmark'} size={24} />
              </AnimatedRN.Text>
            </Button>
          </Block>
          {/* tab 4 */}
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
                    index: 3,
                  });
                }
              }}>
              <AnimatedRN.Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  opacity: opacityLike,
                }}>
                <VectorIcon icon={'bx_heart'} size={24} />
              </AnimatedRN.Text>
            </Button>
          </Block>
          {/* Underneath bar */}
          <AnimatedRN.View
            style={{
              position: 'absolute',
              transform: [{ translateX: translateDistance }],
              bottom: -14,
              left: (distance / 4 - MAIN_HEADER_BAR_UNDERNEATH_WIDTH) / 2,
              height: 2,
              width: MAIN_HEADER_BAR_UNDERNEATH_WIDTH,
              backgroundColor: 'black',
              borderRadius: 2,
            }}
          />
        </Block>
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
    </Block>
  );

  // render
  return (
    <Block
      block
      style={{
        position: 'relative',
      }}>
      <Screen
        unsafe
        statusBarStyle="dark-content"
        bottomInsetColor="transparent"
        backgroundColor={'transparent'}>
        {renderTopBar()}
        {/* main content */}
        {isAuth ? renderAuth() : renderUnAuth()}
      </Screen>
    </Block>
  );
};

export const Profile = memo(ProfileComponent, isEqual);

// other carousel
// https://github.com/dohooo/react-native-reanimated-carousel
