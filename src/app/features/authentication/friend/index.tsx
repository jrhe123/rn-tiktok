import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Block, Text } from '@components';

const FriendComponent = () => {
  console.log('hit friend component');
  // render
  return (
    <Block
      block
      style={{
        backgroundColor: '#010101',
        position: 'relative',
      }}>
      <Text>this is friend page</Text>
    </Block>
  );
};

export const Friend = memo(FriendComponent, isEqual);
