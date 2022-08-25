import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Block, Text } from '@components';

const InfoComponent = () => {
  return (
    <Block>
      <Text>this is info page</Text>
    </Block>
  );
};

export const Info = memo(InfoComponent, isEqual);
