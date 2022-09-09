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

const { width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const statusBarOffset = 0;
const MAIN_HEADER_HEIGHT = 60;
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
                  <VectorIcon
                    icon={'bx_heart'}
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
                  <VectorIcon
                    icon={'bx_send'}
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
      </Screen>
    </Block>
  );
};

export const Inbox = memo(InboxComponent, isEqual);
