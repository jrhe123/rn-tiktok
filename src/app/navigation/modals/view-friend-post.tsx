import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Dimensions, NativeModules } from 'react-native';

import isEqual from 'react-fast-compare';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { dispatch } from '@common';
import {
  Block,
  BottomSheet,
  BottomSheetRef,
  Button,
  Icon,
  Text,
} from '@components';
import { appActions } from '@redux-slice';

const { width, height } = Dimensions.get('window');
const BTN_COLOR = '#E8445A';
const BTN_TEXT_COLOR = 'white';
const DIS_BTN_COLOR = '#E8E8E8';
const DIS_BTN_TEXT_COLOR = '#A9A9A9';
const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const ViewFriendPostComponent = ({
  handleConfirm,
}: {
  handleConfirm: () => void;
}) => {
  const _refBS = useRef<BottomSheetRef>(null);

  const onPress = useCallback(() => {
    const isActive = _refBS?.current?.isActive();
    if (!isActive) {
      _refBS?.current?.scrollTo(-(height - statusBarHeight) / 2);
    }
  }, []);

  useEffect(() => {
    onPress();
  }, [onPress]);

  const renderTopBar = () => (
    <>
      {/* top left btn */}
      <Block
        style={{
          position: 'absolute',
          top: 21,
          right: 24,
          width: 30,
          height: 30,
          zIndex: 1,
        }}>
        <Button onPress={handleConfirm}>
          <Icon icon={'close'} size={30} />
        </Button>
      </Block>
    </>
  );

  return (
    <GestureHandlerRootView>
      <BottomSheet
        ref={_refBS}
        height={height - statusBarHeight}
        throttle={100}
        toggleModal={toggle => {
          if (!toggle) {
            dispatch(appActions.onModalClose());
          }
        }}>
        <Block
          block
          style={{
            alignItems: 'center',
            position: 'relative',
            backgroundColor: 'white',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}>
          {renderTopBar()}
          {/* main content */}
          <Block
            style={{ width: width - 48, marginTop: 36, paddingBottom: 120 }}>
            <Block style={{ marginTop: 24 }}>
              <Text fontSize={21} fontWeight={'bold'} center>
                View your friends' posts
              </Text>
            </Block>
            <Block
              direction={'row'}
              justifyContent={'space-between'}
              marginTop={24}>
              <Block>
                <VectorIcon icon={'bx_play_circle'} size={27} />
              </Block>
              <Block paddingLeft={12} flex={1}>
                <Text fontSize={13} color={'#6F7681'}>
                  Posts are from followers that you follow back, accounts you
                  follow, and other suggested accounts.
                </Text>
              </Block>
            </Block>
            <Block
              direction={'row'}
              justifyContent={'space-between'}
              marginTop={18}>
              <Block>
                <VectorIcon icon={'bx_edit'} size={27} />
              </Block>
              <Block paddingLeft={12} flex={1}>
                <Text fontSize={13} color={'#6F7681'}>
                  You can change how your account is suggested to others in{' '}
                  <Text fontWeight={'bold'} color={'black'}>
                    Suggest your account to others
                  </Text>{' '}
                  at any time.
                </Text>
              </Block>
            </Block>
            {/* button */}
            <Block style={{ marginTop: 72, width: '100%' }}>
              <Button
                // onPress={confirmDate}
                style={{
                  backgroundColor: BTN_COLOR,
                  paddingVertical: 15,
                  width: '100%',
                }}>
                <Text color={BTN_TEXT_COLOR} fontSize={15} center>
                  OK
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export const ViewFriendPost = memo(ViewFriendPostComponent, isEqual);
