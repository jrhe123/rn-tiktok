import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Block, Text } from '@components';

const PolicyComponent = () => {
  return (
    <Block>
      <Text>this is Policy page</Text>
    </Block>
  );
};

export const Policy = memo(PolicyComponent, isEqual);
