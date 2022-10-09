import React, { memo } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import isEqual from 'react-fast-compare';
import { TextInput } from 'react-native-paper';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { dispatch } from '@common';
import { Block, Button, Screen, Text } from '@components';
import { goBack, navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions } from '@redux-slice';

const { height, width } = Dimensions.get('window');
const MAIN_HEADER_HEIGHT = 48;
const AVATAR_ICON_SIZE = 120;
const AVATAR_SM_ICON_SIZE = 36;

const FindFriendComponent = () => {
  const renderTopBar = () => (
    <Block
      style={{
        position: 'relative',
        height: MAIN_HEADER_HEIGHT,
      }}>
      <Block
        style={{
          position: 'absolute',
          top: 0,
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
            right: 6,
            top: 0,
            width: MAIN_HEADER_HEIGHT,
            height: MAIN_HEADER_HEIGHT,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}>
          <Button
            onPress={() => {
              navigate(APP_SCREEN.SCANNER);
            }}>
            <VectorIcon icon={'bx_scan'} size={24} />
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
          <Text fontSize={18}>Find friends</Text>
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
      <Screen
        statusBarStyle="dark-content"
        bottomInsetColor="transparent"
        backgroundColor={'transparent'}>
        {/* Top bar */}
        {renderTopBar()}

        <KeyboardAvoidingView behavior="padding">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Block
              style={{
                marginHorizontal: 12,
              }}>
              {/* search bar */}
              <Block marginTop={12}>
                <TextInput
                  left={
                    <TextInput.Icon
                      name={() => (
                        <VectorIcon
                          color={'black'}
                          icon={'bx_search'}
                          size={21}
                        />
                      )}
                    />
                  }
                  style={{
                    height: 36,
                    backgroundColor: '#E2E3E4',
                    borderRadius: 4,
                    paddingRight: 9,
                    fontSize: 15,
                  }}
                  theme={{ colors: { text: 'white' } }}
                  activeUnderlineColor={'transparent'}
                  underlineColor={'transparent'}
                  placeholderTextColor={'#a8a8a8'}
                  placeholder={'Search by name'}
                  // value={''}
                />
              </Block>
              {/* top icon */}
              <Block marginTop={72} alignItems={'center'}>
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
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: AVATAR_SM_ICON_SIZE,
                        height: AVATAR_SM_ICON_SIZE,
                        borderRadius: AVATAR_SM_ICON_SIZE / 3,
                        backgroundColor: 'black',
                      }}>
                      <Block marginLeft={2}>
                        <VectorIcon
                          icon={'bx_play'}
                          color={'white'}
                          size={AVATAR_SM_ICON_SIZE}
                        />
                      </Block>
                    </Block>
                    <Text color={'white'} fontSize={48}>
                      J
                    </Text>
                  </Block>
                </TouchableOpacity>
              </Block>
              <Block marginTop={30}>
                <Text fontSize={21} fontWeight={'bold'} center>
                  Connect with <Text color={'#629DBF'}>friends</Text> to make
                </Text>
                <Text fontSize={21} fontWeight={'bold'} center>
                  TikTok more fun
                </Text>
              </Block>
              {/* buttons */}
              <Block marginTop={30}>
                {/* #1 */}
                <Block marginBottom={12}>
                  <Button
                    buttonColor={'#6AA950'}
                    style={{
                      borderRadius: 3,
                    }}>
                    <Block
                      direction={'row'}
                      justifyContent={'center'}
                      paddingVertical={12}>
                      <Block marginRight={3}>
                        <VectorIcon
                          icon={'bx_phone'}
                          color={'white'}
                          size={21}
                        />
                      </Block>
                      <Text color={'white'} fontSize={15} fontWeight={'bold'}>
                        Find contacts
                      </Text>
                    </Block>
                  </Button>
                </Block>
                {/* #2 */}
                <Block marginBottom={12}>
                  <Button
                    buttonColor={'#4578E0'}
                    style={{
                      borderRadius: 3,
                    }}>
                    <Block
                      direction={'row'}
                      justifyContent={'center'}
                      paddingVertical={12}>
                      <Block marginRight={3}>
                        <VectorIcon
                          icon={'bx_book'}
                          color={'white'}
                          size={21}
                        />
                      </Block>
                      <Text color={'white'} fontSize={15} fontWeight={'bold'}>
                        Find Facebook friends
                      </Text>
                    </Block>
                  </Button>
                </Block>
                {/* #3 */}
                <Block>
                  <Button>
                    <Block
                      direction={'row'}
                      justifyContent={'center'}
                      paddingVertical={12}
                      borderRadius={3}
                      borderWidth={0.5}
                      borderColor={'#c2c2c2'}>
                      <Text color={'black'} fontSize={15} fontWeight={'bold'}>
                        Invite friends
                      </Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
            </Block>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Screen>
    </Block>
  );
};

export const FindFriend = memo(FindFriendComponent, isEqual);
