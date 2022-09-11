import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Dimensions, NativeModules } from 'react-native';

import isEqual from 'react-fast-compare';
import AlphabetList from 'react-native-flatlist-alphabet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { country } from '@assets/country';
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
import IData from 'react-native-flatlist-alphabet/dist/interfaces/IData';

const { width, height } = Dimensions.get('window');
type Code = {
  id: number;
  country: string;
  number: number;
  short: string;
};
type FormattedCode = {
  key: string;
  value: string;
} & Code;
const { countries }: { countries: Code[] } = country;
const formattedCountries: FormattedCode[] = countries.map(country => {
  return {
    key: country.id + '',
    value: country.country,
    id: country.id,
    country: country.country,
    number: country.number,
    short: country.short,
  };
});

const { StatusBarManager } = NativeModules;
let statusBarHeight = 0;
StatusBarManager.getHeight(({ height }: { height: number }) => {
  statusBarHeight = height;
});
const CountryListComponent = ({
  handleConfirm,
}: {
  handleConfirm: () => void;
}) => {
  const _refBS = useRef<BottomSheetRef>(null);

  const onPress = useCallback(() => {
    const isActive = _refBS?.current?.isActive();
    if (isActive) {
      _refBS?.current?.scrollTo(0);
    } else {
      _refBS?.current?.scrollTo(-(height - statusBarHeight));
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
          left: 24,
          width: 30,
          height: 30,
          zIndex: 1,
        }}>
        <Button onPress={handleConfirm}>
          <Icon icon={'close'} size={30} />
        </Button>
      </Block>
      <Block style={{ marginTop: 24 }}>
        <Text fontSize={18} center>
          Select country/region
        </Text>
      </Block>
    </>
  );

  const renderItem = (item: IData) => {
    const itemF = item as FormattedCode;
    return (
      <Button>
        <Block
          direction={'row'}
          style={{
            justifyContent: 'space-between',
            paddingRight: 24,
            paddingVertical: 12,
            borderBottomColor: '#ccc',
            borderBottomWidth: 0.5,
          }}>
          <Text style={{ fontSize: 18 }}>{itemF.value}</Text>
          <Text style={{ fontSize: 18, color: '#9F9F9F' }}>
            +{itemF.number}
          </Text>
        </Block>
      </Button>
    );
  };

  const renderSectionHeader = ({
    title,
  }: {
    title: string;
    index: number;
    data: FormattedCode[];
  }) => {
    return (
      <Block style={{ paddingVertical: 12, backgroundColor: 'white' }}>
        <Text style={{ fontSize: 21, fontWeight: 'bold' }}>{title}</Text>
      </Block>
    );
  };

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
          <Block
            style={{ width: width - 36, marginTop: 36, paddingBottom: 120 }}>
            <AlphabetList
              data={formattedCountries}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              indexLetterColor={'#9F9F9F'}
              containerStyle={{
                right: -18,
              }}
            />
          </Block>
        </Block>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export const CountryList = memo(CountryListComponent, isEqual);
