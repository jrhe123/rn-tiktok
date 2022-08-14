import React, { FC, memo } from 'react';
import { Animated as AnimatedRN, Dimensions } from 'react-native';

import isEqual from 'react-fast-compare';

import { VectorIcon } from '@assets/vector-icon/vector-icon';
import { Block } from '@components';
import { APP_SCREEN, RootStackParamList } from '@navigation/screen-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Friend } from './friend';
import { Inbox } from './inbox';
import { Profile } from './profile';
import { Record } from './record';
import { Video } from './video';

const { width } = Dimensions.get('window');
const BOTTOM_BAR_HEIGHT = 90;
const BOTTOM_ICON_HEIGHT = BOTTOM_BAR_HEIGHT - 39;

const HomeTab = createBottomTabNavigator<RootStackParamList>();

const TabNavigator: FC<any> = props => {
  console.log('props: ', props);
  return (
    <HomeTab.Navigator
      initialRouteName={APP_SCREEN.VIDEO}
      screenOptions={_ => {
        return {
          tabBarActiveTintColor: 'white',
          headerShown: false,
          tabBarStyle: { position: 'absolute' },
          tabBarBackground: () => (
            <Block
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: BOTTOM_BAR_HEIGHT,
                width,
                flexDirection: 'row',
                zIndex: 99,
                backgroundColor: '#010101',
                borderTopColor: '#6F7681',
                borderTopWidth: 0.5,
              }}
            />
          ),
        };
      }}>
      <HomeTab.Screen
        name={APP_SCREEN.VIDEO}
        component={Video}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => {
            return (
              <Block
                style={{
                  height: BOTTOM_ICON_HEIGHT,
                  width: width / 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <VectorIcon icon={'home'} color={color} />
                <AnimatedRN.Text
                  style={{
                    marginTop: 3,
                    color,
                    fontSize: 12,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Home
                </AnimatedRN.Text>
              </Block>
            );
          },
        }}
      />
      <HomeTab.Screen
        name={APP_SCREEN.FRIEND}
        component={Friend}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => {
            return (
              <Block
                style={{
                  height: BOTTOM_ICON_HEIGHT,
                  width: width / 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <VectorIcon icon={'multi_user'} color={color} />
                <AnimatedRN.Text
                  style={{
                    marginTop: 3,
                    color,
                    fontSize: 12,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Friend
                </AnimatedRN.Text>
              </Block>
            );
          },
        }}
      />
      <HomeTab.Screen
        name={APP_SCREEN.RECORD}
        component={Record}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => {
            return (
              <Block
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 30,
                  width: 45,
                  backgroundColor: 'white',
                  borderRadius: 9,
                  borderLeftWidth: 4,
                  borderRightWidth: 4,
                  borderLeftColor: '#67D1E8',
                  borderRightColor: '#E7426D',
                }}>
                <VectorIcon icon={'bx_plus'} color="black" />
              </Block>
            );
          },
        }}
      />
      <HomeTab.Screen
        name={APP_SCREEN.INBOX}
        component={Inbox}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => {
            return (
              <Block
                style={{
                  height: BOTTOM_ICON_HEIGHT,
                  width: width / 5,

                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <VectorIcon icon={'bx_message'} color={color} />
                <AnimatedRN.Text
                  style={{
                    marginTop: 3,
                    color,
                    fontSize: 12,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Inbox
                </AnimatedRN.Text>
              </Block>
            );
          },
        }}
      />
      <HomeTab.Screen
        name={APP_SCREEN.PROFILE}
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => {
            return (
              <Block
                style={{
                  height: BOTTOM_ICON_HEIGHT,
                  width: width / 5,

                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <VectorIcon icon={'bx_user'} color={color} />
                <AnimatedRN.Text
                  style={{
                    marginTop: 3,
                    color,
                    fontSize: 12,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Profile
                </AnimatedRN.Text>
              </Block>
            );
          },
        }}
      />
    </HomeTab.Navigator>
  );
};

export const HomeTabNavigator = memo(TabNavigator, isEqual);
