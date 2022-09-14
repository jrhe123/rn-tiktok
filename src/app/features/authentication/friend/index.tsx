import React, { memo, useEffect, useState } from 'react';
import { Alert, Animated as AnimatedRN, NativeModules } from 'react-native';

import isEqual from 'react-fast-compare';
import { TextInput } from 'react-native-paper';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { dispatch } from '@common';
import { Block, Button, Screen, Text, Wallpaper } from '@components';
import { appActions } from '@redux-slice';

const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const statusBarOffset = 0;
const MAIN_HEADER_HEIGHT = 60;

const FriendComponent = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuth) {
      dispatch(appActions.onModalOpen('REGISTER'));
    } else {
      Alert.alert(
        'Find contacts',
        'To connect with people you know on TikTok, allow access to your contacts in your device settings.',
        [
          {
            text: "Don't Allow",
            onPress: () => {},
            style: 'default',
          },
          {
            text: 'Open settings',
            onPress: () => {
              dispatch(appActions.onModalOpen('VIEW_FRIEND_POST'));
            },
            style: 'default',
          },
        ],
      );
    }
  }, [isAuth]);

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
      {isAuth ? (
        <Block
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Button onPress={() => {}}>
            <VectorIcon color={'white'} icon={'bx_user_plus'} size={33} />
          </Button>
          <Block block style={{ marginHorizontal: 12 }}>
            <TextInput
              left={
                <TextInput.Icon
                  name={() => (
                    <VectorIcon color={'white'} icon={'bx_search'} size={21} />
                  )}
                />
              }
              style={{
                height: 36,
                backgroundColor: '#323232',
                borderRadius: 4,
                paddingRight: 9,
                fontSize: 15,
              }}
              theme={{ colors: { text: 'white' } }}
              activeUnderlineColor={'transparent'}
              placeholderTextColor={'white'}
              placeholder={'Find friends'}
              // value={''}
            />
          </Block>
          <Button onPress={() => {}}>
            <VectorIcon color={'white'} icon={'bx_info_circle1'} size={30} />
          </Button>
        </Block>
      ) : (
        <AnimatedRN.Text
          style={{
            fontSize: 18,
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Friend
        </AnimatedRN.Text>
      )}
    </Block>
  );

  // render
  return (
    <Block
      block
      style={{
        backgroundColor: '#010101',
        position: 'relative',
        paddingHorizontal: 15,
      }}>
      {isAuth && <Wallpaper backgroundImage={'tk_bg_wallpaper'} />}
      <Screen
        unsafe
        statusBarStyle="light-content"
        bottomInsetColor="transparent"
        backgroundColor={'transparent'}>
        {renderTopBar()}
        {/* main content */}
        {isAuth && (
          <>
            <Block marginTop={36}>
              <Text fontSize={48} fontWeight={'bold'} color={'white'}>
                Don't miss
              </Text>
              <Text fontSize={48} fontWeight={'bold'} color={'white'}>
                your friends'
              </Text>
              <Text fontSize={48} fontWeight={'bold'} color={'white'}>
                posts
              </Text>
            </Block>
            <Block marginTop={12}>
              <Text fontSize={12} color={'white'}>
                Your friends haven't posted anything yet.
              </Text>
            </Block>
            <Block marginTop={30}>
              <Button>
                <Block
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 48,
                    backgroundColor: 'white',
                    borderRadius: 9,
                    borderLeftWidth: 6,
                    borderRightWidth: 6,
                    borderLeftColor: '#67D1E8',
                    borderRightColor: '#E7426D',
                  }}>
                  <Text fontSize={15} fontWeight={'bold'}>
                    Connect with contacts
                  </Text>
                </Block>
              </Button>
            </Block>
            <Block marginTop={15}>
              <Button>
                <Block
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 48,
                    backgroundColor: '#1e1e1e',
                    borderRadius: 9,
                  }}>
                  <Text fontSize={15} color={'white'}>
                    Connect with Facebook friends
                  </Text>
                </Block>
              </Button>
            </Block>
          </>
        )}
      </Screen>
    </Block>
  );
};

export const Friend = memo(FriendComponent, isEqual);
