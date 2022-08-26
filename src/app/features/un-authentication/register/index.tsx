import React, { memo, useState } from 'react';
import { Dimensions, NativeModules } from 'react-native';

import isEqual from 'react-fast-compare';
import DatePicker from 'react-native-date-picker';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { Block, Button, Icon, Screen, Text, TextField } from '@components';
import { goBack } from '@navigation/navigation-service';

const BTN_COLOR = '#E8445A';
const { width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const statusBarOffset = 0;
const MAIN_HEADER_HEIGHT = 48;

const RegisterComponent = () => {
  const [date, setDate] = useState(new Date());

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
        <Button onPress={() => {}}>
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
            borderColor: 'red',
            borderWidth: 1,
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
            <Block block style={{ marginTop: 48 }}>
              <TextField label={'Birthday'} typeInput={'flat'} />
            </Block>
            {/* button */}
            <Block style={{ marginTop: 48, width: '100%' }}>
              <Button
                onPress={() => {}}
                style={{
                  backgroundColor: BTN_COLOR,
                  paddingVertical: 15,
                  width: '100%',
                }}>
                <Text color={'white'} fontSize={15} center>
                  Next
                </Text>
              </Button>
            </Block>
          </Block>
          {/* bottom section */}
          <Block
            block
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <DatePicker date={date} onDateChange={setDate} />
          </Block>
        </Block>
      </Screen>
    </Block>
  );
};
export const Register = memo(RegisterComponent, isEqual);
