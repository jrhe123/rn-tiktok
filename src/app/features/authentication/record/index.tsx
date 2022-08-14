import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Block, Text } from '@components';

const RecordComponent = () => {
  console.log('hit Record component');
  // render
  return (
    <Block
      block
      style={{
        backgroundColor: '#010101',
        position: 'relative',
      }}>
      <Text>this is Record page</Text>
    </Block>
  );
};

export const Record = memo(RecordComponent, isEqual);
