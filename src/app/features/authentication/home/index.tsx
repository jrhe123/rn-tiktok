import React, { memo, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';

import isEqual from 'react-fast-compare';

import { STORAGE_NOTIFICATION, STORAGE_TRACKING } from '@common';
import { loadString, saveString } from '@storage';

const HomeComponent = () => {
  useEffect(() => {
    const storageNoti = loadString(STORAGE_NOTIFICATION);
    const storageTrack = loadString(STORAGE_TRACKING);
    /**
     * notification
     */
    if (storageNoti === undefined) {
      Alert.alert(
        '"TikTok" Would Like to Send You Notifications',
        'Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.',
        [
          {
            text: "Don't Allow",
            onPress: () => {
              saveString(STORAGE_NOTIFICATION, '0');
              console.log('Not allow Pressed');
            },
            style: 'default',
          },
          {
            text: 'Allow',
            onPress: () => {
              saveString(STORAGE_NOTIFICATION, '1');
              console.log('Allow Pressed');
            },
            style: 'default',
          },
        ],
      );
    }
    /**
     * tracing
     */
    if (storageTrack === undefined) {
      Alert.alert(
        'Allow "TikTok" to rack your activity across other companies\' apps and websites?',
        'This allows TikTok to provide you with a better ads experience.',
        [
          {
            text: 'Ask App Not to Track',
            onPress: () => {
              saveString(STORAGE_TRACKING, '0');
              console.log('Not track Pressed');
            },
            style: 'default',
          },
          {
            text: 'Allow',
            onPress: () => {
              saveString(STORAGE_TRACKING, '1');
              console.log('Track Pressed');
            },
            style: 'default',
          },
        ],
      );
    }
  }, []);

  // render
  return (
    <View>
      <Text>Home pages</Text>
    </View>
  );
};

export const Home = memo(HomeComponent, isEqual);
