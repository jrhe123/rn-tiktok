import React, { memo, useRef } from 'react';
import { Dimensions, FlatList, NativeModules } from 'react-native';

import isEqual from 'react-fast-compare';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { dispatch } from '@common';
import { Block, Button, Icon } from '@components';
import { navigate } from '@navigation/navigation-service';
import { APP_SCREEN } from '@navigation/screen-types';
import { appActions } from '@redux-slice';

import { SignInPage } from './components/sign-in';
import { SignUpPage } from './components/sign-up';

const { height, width } = Dimensions.get('window');
type Page = {
  id: string;
  type: string;
};
const pages: Page[] = [
  {
    id: '0',
    type: 'SIGN_UP',
  },
  {
    id: '1',
    type: 'SIGN_IN',
  },
];

const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const RegisterComponent = () => {
  const _refRoot = useRef<FlatList>(null);

  const renderTopBar = () => (
    <>
      {/* top left btn */}
      <Block
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          width: 30,
          height: 30,
          zIndex: 1,
        }}>
        <Button>
          <Icon icon={'close'} size={30} />
        </Button>
      </Block>
      {/* top right btn */}
      <Block
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          width: 30,
          height: 30,
          zIndex: 1,
        }}>
        <Button
          onPress={() => {
            dispatch(appActions.onModalClose());
            navigate(APP_SCREEN.INFO);
          }}>
          <VectorIcon icon={'bx_info_circle1'} size={30} />
        </Button>
      </Block>
    </>
  );

  const renderItem = ({ item }: { item: Page }) => {
    if (item.type === 'SIGN_UP') {
      return (
        <SignUpPage
          handleNavigateToLogin={() => {
            if (_refRoot.current) {
              _refRoot.current?.scrollToIndex({
                animated: true,
                index: 1,
              });
            }
          }}
        />
      );
    } else if (item.type === 'SIGN_IN') {
      return (
        <SignInPage
          handleNavigateToSignup={() => {
            if (_refRoot.current) {
              _refRoot.current?.scrollToIndex({
                animated: true,
                index: 0,
              });
            }
          }}
        />
      );
    }
    return null;
  };

  return (
    <Block
      block
      style={{
        alignItems: 'center',
        position: 'relative',
      }}>
      {renderTopBar()}
      <FlatList
        ref={_refRoot}
        data={pages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        scrollEnabled={false}
        style={{
          width,
          height: height - statusBarHeight,
        }}
        scrollEventThrottle={width}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </Block>
  );
};

export const Register = memo(RegisterComponent, isEqual);
