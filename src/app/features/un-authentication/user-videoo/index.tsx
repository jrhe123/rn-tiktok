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
import { Block, Button, Image, Screen, Text } from '@components';
import { rxEmail, rxMobile } from '@config/regex';
import { goBack, navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions } from '@redux-slice';

const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const BTN_COLOR = '#E8445A';
const AVATAR_ICON_SIZE = 84;
const { height, width } = Dimensions.get('window');
const MAIN_HEADER_HEIGHT = 48;

const UserVideoComponent = () => {
  const [hasAvatar, setHasAvatar] = useState<boolean>(false);

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
              <Button>
                <Block
                  style={{
                    borderColor: '#c2c2c2',
                    borderWidth: 0.5,
                    borderRadius: 3,
                    padding: 7,
                  }}>
                  <VectorIcon icon={'bx_chevron_down'} size={27} />
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
        </Block>
      </Screen>
    </Block>
  );
};

export const UserVideo = memo(UserVideoComponent, isEqual);
