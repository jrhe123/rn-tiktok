import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Block, Text } from '@components';

const TermsComponent = () => {
  return (
    <Block>
      <Text>this is Terms page</Text>
    </Block>
  );
};

export const Terms = memo(TermsComponent, isEqual);
