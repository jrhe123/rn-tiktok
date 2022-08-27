import React, { memo } from 'react';
import { Dimensions } from 'react-native';

import isEqual from 'react-fast-compare';
import AlphabetList from 'react-native-flatlist-alphabet';

import { country } from '@assets/country';
import { Block, Button, Icon, Text } from '@components';
import IData from 'react-native-flatlist-alphabet/dist/interfaces/IData';

const { width } = Dimensions.get('window');
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

const CountryListComponent = ({
  handleConfirm,
}: {
  handleConfirm: () => void;
}) => {
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
        <Text style={{ fontSize: 18, color: '#9F9F9F' }}>+{itemF.number}</Text>
      </Block>
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
    <Block
      block
      style={{
        alignItems: 'center',
        position: 'relative',
      }}>
      {renderTopBar()}
      <Block style={{ width: width - 36, marginTop: 36, paddingBottom: 120 }}>
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
  );
};

export const CountryList = memo(CountryListComponent, isEqual);
