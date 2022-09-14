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
import { Block, Button, Divider, Screen, Text } from '@components';

const { width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const statusBarOffset = 0;
const MAIN_HEADER_HEIGHT = 60;
const EDIT_ICON_SIZE = 30;
const AVATAR_ICON_SIZE = 60;
const AVATAR_SM_ICON_SIZE = 21;
const REGULAR_ICON_SIZE = 48;
const BUTTN_ICON_SIZE = 42;
const ICON_SIZE = 24;
const SM_ICON_SIZE = 21;
const CAROUSEL_HEIGHT = 72;
const OPTION_BTN_COLOR = '#E8445A';

const BANNER_TEXT: string[] = [
  'Connect with the community',
  'Share videos with friends',
  'Check notifications',
  'Connect with the community',
  'Share videos with friends',
  'Check notifications',
  'Connect with the community',
  'Share videos with friends',
  'Check notifications',
  'Connect with the community',
  'Share videos with friends',
  'Check notifications',
];

const InboxComponent = () => {
  const _refRoot = useRef<ScrollView>(null);
  const [index, setIndex] = useState<number>(0);
  const [isAuth, setIsAuth] = useState<boolean>(true);

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
        width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: MAIN_HEADER_HEIGHT,
        position: 'relative',
      }}>
      <AnimatedRN.Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Inbox
      </AnimatedRN.Text>
      {isAuth && (
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
          <TouchableOpacity onPress={() => {}}>
            <VectorIcon icon={'bx_edit'} size={EDIT_ICON_SIZE} />
          </TouchableOpacity>
        </Block>
      )}
    </Block>
  );

  const renderUnauth = () => (
    <Block paddingHorizontal={25}>
      {/* icon list */}
      <Block
        style={{
          marginTop: 36,
          alignItems: 'center',
        }}>
        {/* icon #1 */}
        <Block direction={'row'}>
          <TouchableOpacity style={{ marginRight: 24 }}>
            <Block
              style={{
                height: BUTTN_ICON_SIZE,
                width: BUTTN_ICON_SIZE,
                borderRadius: BUTTN_ICON_SIZE,
                backgroundColor: '#4BAAED',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <VectorIcon
                icon={'bx_message_alt_detail'}
                color={'white'}
                size={ICON_SIZE}
              />
            </Block>
          </TouchableOpacity>
          <Block justifyContent={'space-between'}>
            <Block
              direction={'row'}
              alignItems={'center'}
              height={BUTTN_ICON_SIZE}
              marginBottom={9}>
              <LinearGradient
                colors={['#fcdcec', '#cdedf7']}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 0.5, y: 3.0 }}
                locations={[0, 1.0]}
                style={{
                  width: 120,
                  height: 15,
                  marginRight: 24,
                }}
              />
              <Block
                style={{
                  width: 40,
                  height: 12,
                  backgroundColor: '#E5E5E5',
                }}
              />
            </Block>
            <Block
              style={{
                width: '100%',
                borderBottomColor: '#D0D0D0',
                borderBottomWidth: 0.5,
              }}
            />
          </Block>
        </Block>
        {/* icon #2 */}
        <Block direction={'row'} marginTop={9}>
          <TouchableOpacity style={{ marginRight: 24 }}>
            <Block
              style={{
                height: BUTTN_ICON_SIZE,
                width: BUTTN_ICON_SIZE,
                borderRadius: BUTTN_ICON_SIZE,
                backgroundColor: '#E94E76',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <VectorIcon icon={'bx_heart'} color={'white'} size={ICON_SIZE} />
            </Block>
          </TouchableOpacity>
          <Block justifyContent={'space-between'}>
            <Block
              direction={'row'}
              alignItems={'center'}
              height={BUTTN_ICON_SIZE}
              marginBottom={12}>
              <LinearGradient
                colors={['#fcdcec', '#cdedf7']}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 0.5, y: 3.0 }}
                locations={[0, 1.0]}
                style={{
                  width: 120,
                  height: 15,
                  marginRight: 24,
                }}
              />
              <Block
                style={{
                  width: 40,
                  height: 12,
                  backgroundColor: '#E5E5E5',
                }}
              />
            </Block>
            <Block
              style={{
                width: '100%',
                borderBottomColor: '#D0D0D0',
                borderBottomWidth: 0.5,
              }}
            />
          </Block>
        </Block>
        {/* icon #3 */}
        <Block direction={'row'}>
          <TouchableOpacity style={{ marginRight: 24 }}>
            <Block
              style={{
                height: BUTTN_ICON_SIZE,
                width: BUTTN_ICON_SIZE,
                borderRadius: BUTTN_ICON_SIZE,
                backgroundColor: '#4BAAED',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <VectorIcon
                icon={'multi_user'}
                color={'white'}
                size={SM_ICON_SIZE}
              />
            </Block>
          </TouchableOpacity>
          <Block justifyContent={'space-between'}>
            <Block
              direction={'row'}
              alignItems={'center'}
              height={BUTTN_ICON_SIZE}
              marginBottom={9}>
              <LinearGradient
                colors={['#fcdcec', '#cdedf7']}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 0.5, y: 3.0 }}
                locations={[0, 1.0]}
                style={{
                  width: 120,
                  height: 15,
                  marginRight: 24,
                }}
              />
              <Block
                style={{
                  width: 40,
                  height: 12,
                  backgroundColor: '#E5E5E5',
                }}
              />
            </Block>
            <Block
              style={{
                width: '100%',
                borderBottomColor: '#D0D0D0',
                borderBottomWidth: 0.5,
              }}
            />
          </Block>
        </Block>
        {/* icon #4 */}
        <Block direction={'row'} marginTop={9}>
          <TouchableOpacity style={{ marginRight: 24 }}>
            <Block
              style={{
                height: BUTTN_ICON_SIZE,
                width: BUTTN_ICON_SIZE,
                borderRadius: BUTTN_ICON_SIZE,
                backgroundColor: '#E94E76',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <VectorIcon icon={'bx_send'} color={'white'} size={ICON_SIZE} />
            </Block>
          </TouchableOpacity>
          <Block justifyContent={'space-between'}>
            <Block
              direction={'row'}
              alignItems={'center'}
              height={BUTTN_ICON_SIZE}
              marginBottom={12}>
              <LinearGradient
                colors={['#fcdcec', '#cdedf7']}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 0.5, y: 3.0 }}
                locations={[0, 1.0]}
                style={{
                  width: 120,
                  height: 15,
                  marginRight: 24,
                }}
              />
              <Block
                style={{
                  width: 40,
                  height: 12,
                  backgroundColor: '#E5E5E5',
                }}
              />
            </Block>
            <Block
              style={{
                width: '100%',
                borderBottomColor: '#D0D0D0',
                borderBottomWidth: 0.5,
              }}
            />
          </Block>
        </Block>
      </Block>

      {/* silder */}
      <Block style={{ marginTop: 42 }} alignItems={'center'}>
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

  const renderAuth = () => (
    <Block>
      {/* top icon */}
      <Block paddingHorizontal={25}>
        <Block width={AVATAR_ICON_SIZE} marginTop={12} marginBottom={18}>
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
              <Text color={'white'} fontSize={30}>
                J
              </Text>
            </Block>
          </TouchableOpacity>
          <Block marginTop={9}>
            <Text fontSize={12} center color={'#6F7681'}>
              Create
            </Text>
          </Block>
        </Block>
      </Block>
      <Divider color="#ccc" height={0.5} />
      {/* activity */}
      <Block paddingHorizontal={25} marginBottom={18}>
        <Block
          marginTop={18}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Text fontSize={15}>Activity</Text>
          <TouchableOpacity>
            <Block style={{ width: 30 }}>
              <VectorIcon icon={'bx_chevron_right'} size={27} />
            </Block>
          </TouchableOpacity>
        </Block>
        <Block direction={'row'} marginTop={18} alignItems={'center'}>
          <Block
            style={{
              width: REGULAR_ICON_SIZE,
              height: REGULAR_ICON_SIZE,
              borderRadius: REGULAR_ICON_SIZE,
              borderWidth: 1,
              borderColor: '#ccc',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 9,
            }}>
            <VectorIcon icon={'bx_bell'} size={30} />
          </Block>
          <Block block>
            <Text color={'#6F7681'} fontSize={12}>
              <Text fontWeight={'bold'} color={'black'}>
                Account updates:{' '}
              </Text>
              Upload longer videos
            </Text>
            <Text color={'#6F7681'} fontSize={12}>
              Just now
            </Text>
          </Block>
          <TouchableOpacity>
            <Block style={{ width: 30 }}>
              <VectorIcon icon={'bx_chevron_right'} size={27} />
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>
      <Divider color="#ccc" height={0.5} />
      {/* messages */}
      <Block paddingHorizontal={25} marginTop={18}>
        <Block marginBottom={18}>
          <Text fontSize={15}>Messages</Text>
        </Block>
        <Block direction={'row'} alignItems={'center'}>
          <Block
            style={{
              width: REGULAR_ICON_SIZE,
              height: REGULAR_ICON_SIZE,
              borderRadius: REGULAR_ICON_SIZE,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 9,
              backgroundColor: '#67D073',
            }}>
            <VectorIcon icon={'bx_phone'} size={30} color={'white'} />
          </Block>
          <Block block>
            <Block marginBottom={6}>
              <Text fontSize={15}>Contacts</Text>
            </Block>
            <Text color={'#6F7681'} fontSize={12}>
              Find your contacts
            </Text>
          </Block>
          <Button
            style={{
              backgroundColor: OPTION_BTN_COLOR,
              paddingHorizontal: 30,
              height: 30,
              justifyContent: 'center',
            }}
            onPress={() => {}}>
            <Text color={'white'} fontSize={15} center>
              Find
            </Text>
          </Button>
        </Block>
        <Block direction={'row'} alignItems={'center'} marginTop={24}>
          <Block
            style={{
              width: REGULAR_ICON_SIZE,
              height: REGULAR_ICON_SIZE,
              borderRadius: REGULAR_ICON_SIZE,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 9,
              backgroundColor: '#4CAAEE',
            }}>
            <VectorIcon icon={'multi_user'} size={21} color={'white'} />
          </Block>
          <Block block>
            <Block
              direction={'row'}
              justifyContent={'space-between'}
              marginBottom={6}>
              <Text fontSize={15}>New followers</Text>
              <Text fontSize={12} color={'#6F7681'}>
                12/31/1969
              </Text>
            </Block>
            <Text color={'#6F7681'} fontSize={12}>
              Messages from followers will appear here
            </Text>
          </Block>
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
        unsafe
        statusBarStyle="dark-content"
        bottomInsetColor="transparent"
        backgroundColor={'transparent'}>
        {renderTopBar()}
        {/* main content */}
        {isAuth ? renderAuth() : renderUnauth()}
      </Screen>
    </Block>
  );
};

export const Inbox = memo(InboxComponent, isEqual);
