import React, { memo, useCallback } from 'react';

import isEqual from 'react-fast-compare';

import { Block, Screen, Text } from '@components';
import { APP_SCREEN, UnAuthorizeParamsList } from '@navigation/screen-types';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

type detailComponentRouteType = RouteProp<
  UnAuthorizeParamsList,
  APP_SCREEN.DETAIL
>;

const DetailComponent = () => {
  const { setOptions } = useNavigation();
  const {
    params: { id },
  } = useRoute<detailComponentRouteType>();

  useFocusEffect(
    useCallback(() => {
      setOptions({ title: 'this is new title: ' + id });
      return () => {
        console.log('left');
      };
    }, [id, setOptions]),
  );

  return (
    <Block block paddingTop={0} paddingHorizontal={15}>
      <Screen
        statusBarStyle="dark-content"
        bottomInsetColor="transparent"
        style={{ paddingVertical: 0, paddingHorizontal: 10 }}
        backgroundColor={'transparent'}>
        <Text fontSize={36} fontWeight="bold">
          DetailComponent
        </Text>
      </Screen>
    </Block>
  );
};

export const Detail = memo(DetailComponent, isEqual);
