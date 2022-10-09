import React, { memo, useEffect, useState } from 'react';
import {
  Alert,
  Animated as AnimatedRN,
  Dimensions,
  NativeModules,
  TextInput,
} from 'react-native';

import isEqual from 'react-fast-compare';
import DatePicker from 'react-native-date-picker';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { Block, Button, Icon, Screen, Text } from '@components';
import { goBack, navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import dayjs from 'dayjs';

const BTN_COLOR = '#E8445A';
const BTN_TEXT_COLOR = 'white';
const DIS_BTN_COLOR = '#E8E8E8';
const DIS_BTN_TEXT_COLOR = '#A9A9A9';
const { width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const statusBarOffset = 0;
const validDate = new Date();
const MAIN_HEADER_HEIGHT = 48;
const aniValue = new AnimatedRN.Value(0);

const RegisterComponent = () => {
  const [dirty, setDirty] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const disabled = !dirty || date > validDate;

  const startShake = () => {
    AnimatedRN.sequence([
      AnimatedRN.timing(aniValue, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      AnimatedRN.timing(aniValue, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      AnimatedRN.timing(aniValue, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      AnimatedRN.timing(aniValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (error) {
      startShake();
    }
  }, [error]);

  const confirmDate = () => {
    const date1 = dayjs(date.toDateString());
    const date2 = dayjs(validDate.toDateString());
    const years = date2.diff(date1, 'year');
    if (years < 18) {
      setDirty(false);
      setError(
        `You entered an age of ${years} years old. Enter your real date of birth.`,
      );
      return;
    }
    setError('');
    Alert.alert(
      'Review your date of birth',
      `You entered: ${date.toDateString()}`,
      [
        {
          text: 'OK',
          onPress: () => {
            navigate(APP_SCREEN.PHONE_EMAIL);
          },
          style: 'default',
        },
      ],
    );
  };

  const renderTopBar = () => (
    <Block
      style={{
        position: 'absolute',
        top: statusBarHeight + statusBarOffset,
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
        <Text fontSize={18}>Sign up</Text>
      </Block>
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
        {/* Main control bar */}
        {renderTopBar()}
        {/* Main content wrapper */}
        <Block
          block
          style={{
            padding: 36,
            paddingTop: statusBarHeight + statusBarOffset + MAIN_HEADER_HEIGHT,
            justifyContent: 'space-between',
          }}>
          {/* top section */}
          <Block>
            <Block
              style={{
                marginTop: 24,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Block>
                <Block>
                  <Text fontSize={18} fontWeight={'bold'}>
                    When's your birthday?
                  </Text>
                </Block>
                <Block style={{ marginTop: 12 }}>
                  <Text color={'#444444'} fontSize={13} fontWeight={'200'}>
                    Your birthday won't be shown publicly.
                  </Text>
                </Block>
              </Block>
              <Block>
                <Icon icon={'cake'} size={60} />
              </Block>
            </Block>
            {/* input */}
            <Block
              style={{
                marginTop: 24,
                marginBottom: 12,
              }}>
              <TextInput
                editable={false}
                style={{
                  height: 40,
                  borderBottomWidth: 1,
                  borderColor: '#A9A9A9',
                }}
                placeholder={'Birthday'}
                value={dirty ? date.toDateString() : ''}
              />
            </Block>
            {/* error msg */}
            {!!error && (
              <AnimatedRN.View
                style={{
                  marginBottom: 12,
                  transform: [{ translateX: aniValue }],
                }}>
                <Text fontSize={12} color={'#DF5D55'}>
                  <VectorIcon icon={'bx_warning'} size={13} />
                  {error}
                </Text>
              </AnimatedRN.View>
            )}
            {/* button */}
            <Block style={{ marginTop: 24, width: '100%' }}>
              <Button
                onPress={confirmDate}
                disabled={disabled}
                style={{
                  backgroundColor: disabled ? DIS_BTN_COLOR : BTN_COLOR,
                  paddingVertical: 15,
                  width: '100%',
                }}>
                <Text
                  color={disabled ? DIS_BTN_TEXT_COLOR : BTN_TEXT_COLOR}
                  fontSize={15}
                  center>
                  Next
                </Text>
              </Button>
            </Block>
            {!!error && (
              <Block style={{ marginTop: 9 }}>
                <Text fontSize={12} color={'#A9A9A9'}>
                  If this date is correct, tap "Next". If needed, you can edit
                  the date before continuing.
                </Text>
              </Block>
            )}
          </Block>
          {/* bottom section */}
          <Block
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <DatePicker
              date={date}
              mode="date"
              onDateChange={d => {
                setDirty(true);
                setDate(d);
              }}
            />
          </Block>
        </Block>
      </Screen>
    </Block>
  );
};
export const Register = memo(RegisterComponent, isEqual);
