import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Animated as AnimatedRN,
  Dimensions,
  NativeModules,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import isEqual from 'react-fast-compare';
import LinearGradient from 'react-native-linear-gradient';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { Block, Button, Screen, Text } from '@components';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions } from '@redux-slice';

const { width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const statusBarOffset = 0;
const MAIN_HEADER_HEIGHT = 60;
const MENU_ICON_SIZE = 30;
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

const ProfileComponent = () => {
  const _refRoot = useRef<ScrollView>(null);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    // carousel auto scroll
    const id = setInterval(() => {
      setIndex(prevIndex => prevIndex + 1);
    }, 4000);
    return () => {
      clearInterval(id);
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
      <AnimatedRN.Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Profile
      </AnimatedRN.Text>
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
      </Screen>
    </Block>
  );
};

export const Profile = memo(ProfileComponent, isEqual);

// other carousel
// https://github.com/dohooo/react-native-reanimated-carousel
