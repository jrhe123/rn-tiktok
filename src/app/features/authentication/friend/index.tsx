import React, { memo, useEffect, useState } from 'react';
import { Animated as AnimatedRN, NativeModules } from 'react-native';

import isEqual from 'react-fast-compare';
import { TextInput } from 'react-native-paper';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { dispatch } from '@common';
import { Block, Button, Screen } from '@components';
import { appActions } from '@redux-slice';

const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const statusBarOffset = 0;
const MAIN_HEADER_HEIGHT = 60;

const FriendComponent = () => {
  const [isAuth, setIsAuth] = useState<boolean>(true);

  useEffect(() => {
    if (!isAuth) {
      dispatch(appActions.onModalOpen('REGISTER'));
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
      <Screen
        unsafe
        statusBarStyle="light-content"
        bottomInsetColor="transparent"
        backgroundColor={'transparent'}>
        {renderTopBar()}
      </Screen>
    </Block>
  );
};

export const Friend = memo(FriendComponent, isEqual);
