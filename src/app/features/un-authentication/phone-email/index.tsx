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
const BTN_TEXT_COLOR = 'white';
const DIS_BTN_COLOR = '#E8E8E8';
const DIS_BTN_TEXT_COLOR = '#A9A9A9';
const { height, width } = Dimensions.get('window');
const MAIN_HEADER_HEIGHT = 48;
const MAIN_TOP_BAR_HEIGHT = 60;

type View = {
  id: string;
  type: string;
  title: string;
};
enum TAB {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
}
// TODO: replace
const views: View[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Phone',
    type: 'PHONE',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Email',
    type: 'EMAIL',
  },
];

const aniControlValue = new AnimatedRN.Value(0);
const MAIN_TAB_BAR_WIDTH = (width - 24) / 2;
const MAIN_TAB_BAR_UNDERNEATH_WIDTH = MAIN_TAB_BAR_WIDTH;
const distance = MAIN_TAB_BAR_WIDTH;

const PhoneEmailComponent = () => {
  const _refRoot = useRef<FlatList>(null);
  const [currentTab, setCurrentTab] = useState<TAB>(TAB.PHONE);
  const [translateX, setTranslateX] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    AnimatedRN.timing(aniControlValue, {
      toValue: translateX / distance,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    switch (translateX / distance) {
      case 0:
        setCurrentTab(TAB.PHONE);
        break;
      case 1:
        setCurrentTab(TAB.EMAIL);
        break;
      default:
        break;
    }
  }, [translateX]);

  const translateDistance = aniControlValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, distance],
  });
  const opacityPhone = aniControlValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });
  const opacityEmail = aniControlValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const disabledP = !phoneNumber.match(rxMobile);
  const disabledE = !email.match(rxEmail);
  const renderItem = ({ item }: { item: View }) => {
    if (item.type === 'PHONE') {
      return (
        <KeyboardAvoidingView behavior="padding">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Block
              block
              style={{
                width,
                padding: 24,
              }}>
              <Block
                style={{
                  marginTop: 18,
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderColor: '#B4B4B4',
                  paddingBottom: 12,
                }}>
                <Button
                  onPress={() => {
                    dispatch(appActions.onModalOpen('COUNTRY_LIST'));
                  }}>
                  <Block
                    style={{
                      width: 72,
                      borderRightWidth: 1,
                      borderColor: '#B4B4B4',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={{ marginRight: 6 }}>CA +1</Text>
                    <VectorIcon icon={'bx_chevron_down'} size={18} />
                  </Block>
                </Button>
                <Block style={{ flex: 1, paddingLeft: 12 }}>
                  <TextInput
                    placeholder={'Phone number'}
                    value={phoneNumber}
                    keyboardType={'numeric'}
                    onChangeText={setPhoneNumber}
                    autoFocus
                  />
                </Block>
              </Block>
              <Block style={{ marginTop: 12 }}>
                <Text
                  style={{ fontSize: 15, lineHeight: 21, color: '#A1A1A1' }}>
                  Your phone number will be used to improve your TikTok
                  experience, including connecting you with people you may know,
                  personalizing your ads experience, and more. If you sign up
                  with SMS, SMS fees may apply.{' '}
                  <TouchableOpacity
                    onPress={() => {
                      // dispatch(appActions.onModalClose());
                      // navigate(APP_SCREEN.TERMS_OF_SERVICE);
                    }}
                    style={{
                      marginTop: -2,
                    }}>
                    <Text fontSize={15}>Learn more</Text>
                  </TouchableOpacity>
                </Text>
              </Block>
              <Block style={{ marginTop: 36 }}>
                <Button
                  onPress={() => {}}
                  disabled={disabledP}
                  style={{
                    backgroundColor: disabledP ? DIS_BTN_COLOR : BTN_COLOR,
                    paddingVertical: 15,
                    width: '100%',
                  }}>
                  <Text
                    color={disabledP ? DIS_BTN_TEXT_COLOR : BTN_TEXT_COLOR}
                    fontSize={15}
                    center>
                    Send code
                  </Text>
                </Button>
              </Block>
            </Block>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
    } else if (item.type === 'EMAIL') {
      return (
        <KeyboardAvoidingView behavior="padding">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Block
              style={{
                width,
                padding: 24,
              }}>
              {/* main form */}
              <Block>
                <Block
                  style={{
                    marginTop: 18,
                    paddingBottom: 12,
                    borderBottomWidth: 1,
                    borderColor: '#B4B4B4',
                  }}>
                  <TextInput
                    placeholder={'Email address'}
                    autoFocus
                    value={email}
                    onChangeText={setEmail}
                  />
                </Block>
                <Block style={{ marginTop: 18 }}>
                  <Text
                    style={{ fontSize: 13, lineHeight: 21, color: '#A1A1A1' }}>
                    By continuing, you agree to TikTok's
                    <TouchableOpacity
                      onPress={() => {
                        // dispatch(appActions.onModalClose());
                        // navigate(APP_SCREEN.TERMS_OF_SERVICE);
                      }}
                      style={{
                        marginTop: -1,
                      }}>
                      <Text fontSize={13}>Terms of Service</Text>
                    </TouchableOpacity>{' '}
                    and confirm that you have read TikTok's{' '}
                    <TouchableOpacity
                      onPress={() => {
                        // dispatch(appActions.onModalClose());
                        // navigate(APP_SCREEN.TERMS_OF_SERVICE);
                      }}
                      style={{
                        marginTop: -2,
                      }}>
                      <Text fontSize={13}>Privacy Policy</Text>
                    </TouchableOpacity>
                  </Text>
                </Block>
                <Block style={{ marginTop: 36 }}>
                  <Button
                    onPress={() => {}}
                    disabled={disabledE}
                    style={{
                      backgroundColor: disabledE ? DIS_BTN_COLOR : BTN_COLOR,
                      paddingVertical: 15,
                      width: '100%',
                    }}>
                    <Text
                      color={disabledE ? DIS_BTN_TEXT_COLOR : BTN_TEXT_COLOR}
                      fontSize={15}
                      center>
                      Next
                    </Text>
                  </Button>
                </Block>
              </Block>
              {/* email suffix options */}
              <Block style={{ marginTop: 90 }}>
                <Block>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Button
                      style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        marginRight: 12,
                      }}>
                      <Text>@gmail.com</Text>
                    </Button>
                    <Button
                      style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        marginRight: 12,
                      }}>
                      <Text>@yahoo.com</Text>
                    </Button>
                    <Button
                      style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        marginRight: 12,
                      }}>
                      <Text>@outlook.com</Text>
                    </Button>
                    <Button
                      style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        marginRight: 12,
                      }}>
                      <Text>@hotmail.com</Text>
                    </Button>
                    <Button
                      style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                      }}>
                      <Text>@icloud.com</Text>
                    </Button>
                  </ScrollView>
                </Block>
              </Block>
            </Block>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
    }
    return null;
  };

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
              navigate(APP_SCREEN.INFO);
            }}>
            <VectorIcon icon={'bx_info_circle1'} size={30} />
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
          <Text fontSize={18}>Sign up</Text>
        </Block>
      </Block>
    </Block>
  );

  const renderTabBar = () => (
    <Block
      style={{
        position: 'relative',
        height: MAIN_TOP_BAR_HEIGHT,
      }}>
      <Block
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: MAIN_TOP_BAR_HEIGHT,
          width,
          flexDirection: 'row',
          zIndex: 99,
        }}>
        <Block
          block
          style={{
            position: 'relative',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Block
            style={{
              paddingHorizontal: 6,
              width: MAIN_TAB_BAR_WIDTH,
            }}>
            <Button
              style={{ paddingVertical: 18 }}
              onPress={() => {
                if (_refRoot.current) {
                  _refRoot.current?.scrollToIndex({
                    animated: true,
                    index: 0,
                  });
                }
              }}>
              <AnimatedRN.Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  opacity: opacityPhone,
                }}>
                Phone
              </AnimatedRN.Text>
            </Button>
          </Block>
          <Block
            style={{
              paddingHorizontal: 6,
              width: MAIN_TAB_BAR_WIDTH,
            }}>
            <Button
              style={{ paddingVertical: 18 }}
              onPress={() => {
                if (_refRoot.current) {
                  _refRoot.current?.scrollToIndex({
                    animated: true,
                    index: 1,
                  });
                }
              }}>
              <AnimatedRN.Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  opacity: opacityEmail,
                }}>
                Email
              </AnimatedRN.Text>
            </Button>
          </Block>
          {/* Underneath bar */}
          <AnimatedRN.View
            style={{
              position: 'absolute',
              transform: [{ translateX: translateDistance }],
              bottom: 9,
              left:
                width / 2 -
                MAIN_TAB_BAR_WIDTH +
                (MAIN_TAB_BAR_WIDTH - MAIN_TAB_BAR_UNDERNEATH_WIDTH) / 2,
              height: 2,
              width: MAIN_TAB_BAR_UNDERNEATH_WIDTH,
              backgroundColor: 'black',
              borderRadius: 2,
            }}
          />
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
        {/* Main control bar */}
        {renderTabBar()}
        {/* Horizontal */}
        <FlatList
          onScroll={e => {
            setTranslateX((e.nativeEvent.contentOffset.x / width) * distance);
          }}
          ref={_refRoot}
          data={views}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          scrollEnabled={false}
          nestedScrollEnabled={true}
          style={{
            width,
            height,
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
              _refRoot.current?.scrollToIndex({
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

export const PhoneEmail = memo(PhoneEmailComponent, isEqual);
