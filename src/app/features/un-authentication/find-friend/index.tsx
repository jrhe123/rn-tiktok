import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Block, Text } from '@components';

const FindFriendComponent = () => {
  return (
    <Block>
      <Text>this is FindFriend page</Text>
    </Block>
  );
};

export const FindFriend = memo(FindFriendComponent, isEqual);
