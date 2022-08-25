import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Block, Text } from '@components';

const SearchComponent = () => {
  return (
    <Block>
      <Text>this is Search page</Text>
    </Block>
  );
};

export const Search = memo(SearchComponent, isEqual);
