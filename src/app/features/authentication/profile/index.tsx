import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Block, Text } from '@components';

const ProfileComponent = () => {
  console.log('hit Profile component');
  // render
  return (
    <Block
      block
      style={{
        backgroundColor: '#010101',
        position: 'relative',
      }}>
      <Text>this is Profile page</Text>
    </Block>
  );
};

export const Profile = memo(ProfileComponent, isEqual);
