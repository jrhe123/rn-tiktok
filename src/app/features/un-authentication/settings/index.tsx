import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Animated as AnimatedRN,
  Dimensions,
  Easing,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import isEqual from 'react-fast-compare';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { dispatch } from '@common';
import { Block, Button, Screen, Text } from '@components';
import { rxEmail, rxMobile } from '@config/regex';
import { goBack, navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions } from '@redux-slice';

const BTN_COLOR = '#E8445A';
const { height, width } = Dimensions.get('window');
const MAIN_HEADER_HEIGHT = 48;

const SettingsComponent = () => {
  const renderTopBar = () => (
    <Block
      style={{
        position: 'relative',
        height: MAIN_HEADER_HEIGHT,
        borderBottomWidth: 1,
        borderColor: '#ddd',
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
          block
          style={{
            position: 'relative',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text fontSize={18}>Settings and privacy</Text>
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
        scroll
        statusBarStyle="dark-content"
        bottomInsetColor="transparent"
        backgroundColor={'transparent'}>
        {/* Top bar */}
        {renderTopBar()}
        {/* main form */}
        <Block
          style={{
            padding: 24,
            width: '100%',
          }}>
          {/* account */}
          <Block>
            <Text color={'#8A8A8A'} fontSize={13}>
              ACCOUNT
            </Text>
          </Block>
          <Block
            direction={'row'}
            justifyContent={'space-between'}
            style={{
              width: '100%',
              marginTop: 12,
              paddingBottom: 24,
              borderBottomColor: '#ddd',
              borderBottomWidth: 1,
            }}>
            <Block direction={'row'} alignItems={'center'}>
              <VectorIcon
                icon={'bx_user'}
                color="black"
                style={{ marginRight: 6 }}
              />
              <Text fontSize={13}>My account</Text>
            </Block>
            <Button
              style={{
                backgroundColor: BTN_COLOR,
                paddingHorizontal: 24,
                height: 30,
              }}>
              <Block block justifyContent={'center'}>
                <Text color={'white'}>Sign up</Text>
              </Block>
            </Button>
          </Block>
          {/* content & activity */}
          <Block marginTop={24}>
            <Text color={'#8A8A8A'} fontSize={13}>
              CONTENT & ACTIVITY
            </Text>
          </Block>
          <Block
            direction={'row'}
            justifyContent={'space-between'}
            style={{
              width: '100%',
              marginTop: 24,
            }}>
            <Block direction={'row'} alignItems={'center'}>
              <VectorIcon
                icon={'bx_book_open1'}
                color="black"
                style={{ marginRight: 6 }}
              />
              <Text fontSize={13}>My account</Text>
            </Block>
            <Button>
              <Block block direction={'row'} alignItems={'center'}>
                <Text>English</Text>
                <VectorIcon icon={'bx_chevron_right'} size={24} />
              </Block>
            </Button>
          </Block>
          <Block
            direction={'row'}
            justifyContent={'space-between'}
            style={{
              width: '100%',
              marginTop: 24,
            }}>
            <Block direction={'row'} alignItems={'center'}>
              <VectorIcon
                icon={'bx_moon'}
                color="black"
                style={{ marginRight: 6 }}
              />
              <Text fontSize={13}>Dark mode</Text>
            </Block>
            <Button>
              <Block block direction={'row'} alignItems={'center'}>
                <VectorIcon icon={'bx_chevron_right'} size={24} />
              </Block>
            </Button>
          </Block>
          <Block
            direction={'row'}
            justifyContent={'space-between'}
            style={{
              width: '100%',
              marginTop: 24,
              paddingBottom: 24,
              borderBottomColor: '#ddd',
              borderBottomWidth: 1,
            }}>
            <Block direction={'row'} alignItems={'center'}>
              <VectorIcon
                icon={'bx_video'}
                color="black"
                style={{ marginRight: 6 }}
              />
              <Text fontSize={13}>Content preferences</Text>
            </Block>
            <Button>
              <Block block direction={'row'} alignItems={'center'}>
                <VectorIcon icon={'bx_chevron_right'} size={24} />
              </Block>
            </Button>
          </Block>
          {/* cache & cellular data */}
          <Block marginTop={24}>
            <Text color={'#8A8A8A'} fontSize={13}>
              CACHE & CELLULAR DATA
            </Text>
          </Block>
          <Block
            direction={'row'}
            justifyContent={'space-between'}
            style={{
              width: '100%',
              marginTop: 24,
              paddingBottom: 24,
              borderBottomColor: '#ddd',
              borderBottomWidth: 1,
            }}>
            <Block direction={'row'} alignItems={'center'}>
              <VectorIcon
                icon={'bx_trash'}
                color="black"
                style={{ marginRight: 6 }}
              />
              <Text fontSize={13}>Clear cache</Text>
            </Block>
            <Button>
              <Block block direction={'row'} alignItems={'center'}>
                <Text>28M</Text>
              </Block>
            </Button>
          </Block>
          {/* support */}
          <Block marginTop={24}>
            <Text color={'#8A8A8A'} fontSize={13}>
              SUPPORT
            </Text>
          </Block>
          <Block
            direction={'row'}
            justifyContent={'space-between'}
            style={{
              width: '100%',
              marginTop: 24,
            }}>
            <Block direction={'row'} alignItems={'center'}>
              <VectorIcon
                icon={'bx_edit'}
                color="black"
                style={{ marginRight: 6 }}
              />
              <Text fontSize={13}>Report a problem</Text>
            </Block>
            <Button>
              <Block block direction={'row'} alignItems={'center'}>
                <VectorIcon icon={'bx_chevron_right'} size={24} />
              </Block>
            </Button>
          </Block>
          <Block
            direction={'row'}
            justifyContent={'space-between'}
            style={{
              width: '100%',
              marginTop: 24,
            }}>
            <Block direction={'row'} alignItems={'center'}>
              <VectorIcon
                icon={'bx_info_circle'}
                color="black"
                style={{ marginRight: 6 }}
              />
              <Text fontSize={13}>Help Center</Text>
            </Block>
            <Button>
              <Block block direction={'row'} alignItems={'center'}>
                <VectorIcon icon={'bx_chevron_right'} size={24} />
              </Block>
            </Button>
          </Block>
          <Block
            direction={'row'}
            justifyContent={'space-between'}
            style={{
              width: '100%',
              marginTop: 24,
              paddingBottom: 24,
              borderBottomColor: '#ddd',
              borderBottomWidth: 1,
            }}>
            <Block direction={'row'} alignItems={'center'}>
              <VectorIcon
                icon={'bx_shield1'}
                color="black"
                style={{ marginRight: 6 }}
              />
              <Text fontSize={13}>Safety Center</Text>
            </Block>
            <Button>
              <Block block direction={'row'} alignItems={'center'}>
                <VectorIcon icon={'bx_chevron_right'} size={24} />
              </Block>
            </Button>
          </Block>
          {/* about */}
          <Block marginTop={24}>
            <Text color={'#8A8A8A'} fontSize={13}>
              ABOUT
            </Text>
          </Block>
          <Block
            direction={'row'}
            justifyContent={'space-between'}
            style={{
              width: '100%',
              marginTop: 24,
            }}>
            <Block direction={'row'} alignItems={'center'}>
              <VectorIcon
                icon={'bx_book_content'}
                color="black"
                style={{ marginRight: 6 }}
              />
              <Text fontSize={13}>Community Guidelines</Text>
            </Block>
            <Button>
              <Block block direction={'row'} alignItems={'center'}>
                <VectorIcon icon={'bx_chevron_right'} size={24} />
              </Block>
            </Button>
          </Block>
          <Block
            direction={'row'}
            justifyContent={'space-between'}
            style={{
              width: '100%',
              marginTop: 24,
            }}>
            <Block direction={'row'} alignItems={'center'}>
              <VectorIcon
                icon={'bx_book'}
                color="black"
                style={{ marginRight: 6 }}
              />
              <Text fontSize={13}>Terms of Service</Text>
            </Block>
            <Button>
              <Block block direction={'row'} alignItems={'center'}>
                <VectorIcon icon={'bx_chevron_right'} size={24} />
              </Block>
            </Button>
          </Block>
          <Block
            direction={'row'}
            justifyContent={'space-between'}
            style={{
              width: '100%',
              marginTop: 24,
            }}>
            <Block direction={'row'} alignItems={'center'}>
              <VectorIcon
                icon={'bx_file_blank'}
                color="black"
                style={{ marginRight: 6 }}
              />
              <Text fontSize={13}>Privacy Policy</Text>
            </Block>
            <Button>
              <Block block direction={'row'} alignItems={'center'}>
                <VectorIcon icon={'bx_chevron_right'} size={24} />
              </Block>
            </Button>
          </Block>
          <Block
            direction={'row'}
            justifyContent={'space-between'}
            style={{
              width: '100%',
              marginTop: 24,
              paddingBottom: 24,
              borderBottomColor: '#ddd',
              borderBottomWidth: 1,
            }}>
            <Block direction={'row'} alignItems={'center'}>
              <VectorIcon
                icon={'bx_copyright'}
                color="black"
                style={{ marginRight: 6 }}
              />
              <Text fontSize={13}>Copyright Policy</Text>
            </Block>
            <Button>
              <Block block direction={'row'} alignItems={'center'}>
                <VectorIcon icon={'bx_chevron_right'} size={24} />
              </Block>
            </Button>
          </Block>
          {/* bottom version no. */}
          <Block marginTop={36} paddingBottom={40}>
            <Text center>v25.71(2571040)</Text>
          </Block>
        </Block>
      </Screen>
    </Block>
  );
};

export const Settings = memo(SettingsComponent, isEqual);
