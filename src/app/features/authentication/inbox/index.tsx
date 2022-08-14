import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Block, Text } from '@components';

const InboxComponent = () => {
  console.log('hit Inbox component');
  // render
  return (
    <Block
      block
      style={{
        backgroundColor: '#010101',
        position: 'relative',
      }}>
      <Text>this is Inbox page</Text>
    </Block>
  );
};

export const Inbox = memo(InboxComponent, isEqual);
