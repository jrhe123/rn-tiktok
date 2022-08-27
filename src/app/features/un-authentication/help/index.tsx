import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Block, Text } from '@components';

const HelpCenterComponent = () => {
  return (
    <Block>
      <Text>this is HelpCenter page</Text>
    </Block>
  );
};

export const HelpCenter = memo(HelpCenterComponent, isEqual);
