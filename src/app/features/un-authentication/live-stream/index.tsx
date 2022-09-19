import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Block, Text } from '@components';

const LiveStreamComponent = () => {
  return (
    <Block>
      <Text>this is Live Stream page</Text>
    </Block>
  );
};

export const LiveStream = memo(LiveStreamComponent, isEqual);
