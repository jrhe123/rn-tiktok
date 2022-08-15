import React, { memo, useEffect } from 'react';
import {
  Animated as AnimatedRN,
  Dimensions,
  Easing,
  TouchableOpacity,
} from 'react-native';

import isEqual from 'react-fast-compare';

import { VectorIcon, VectorIconIcon } from '@assets/vector-icon/vector-icon';
import { Block } from '@components';
import { APP_SCREEN, RootStackParamList } from '@navigation/screen-types';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Friend } from './friend';
import { Inbox } from './inbox';
import { Profile } from './profile';
import { Record } from './record';
import { Video } from './video';

const { width } = Dimensions.get('window');
const BOTTOM_BAR_HEIGHT = 90;
const BOTTOM_ICON_HEIGHT = BOTTOM_BAR_HEIGHT - 39;

const HomeTab = createBottomTabNavigator<RootStackParamList>();

type LabelPosition = 'beside-icon' | 'below-icon';
type LabelProps =
  | string
  | ((props: {
      focused: boolean;
      color: string;
      position: LabelPosition;
    }) => React.ReactNode);

const aniVideoValue = new AnimatedRN.Value(1);
const aniFriendValue = new AnimatedRN.Value(1);
const aniInboxValue = new AnimatedRN.Value(1);
const aniProfileValue = new AnimatedRN.Value(1);
const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const scaleVideo = aniVideoValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0.7, 1, 1],
  });
  const opacityVideo = aniVideoValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0.7, 1, 1],
  });
  const scaleFriend = aniFriendValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0.7, 1, 1],
  });
  const opacityFriend = aniVideoValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0.7, 1, 1],
  });
  const scaleInbox = aniInboxValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0.7, 1, 1],
  });
  const opacityInbox = aniVideoValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0.7, 1, 1],
  });
  const scaleProfile = aniProfileValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0.7, 1, 1],
  });
  const opacityProfile = aniVideoValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0.7, 1, 1],
  });

  useEffect(() => {
    switch (state.index) {
      case 0:
        AnimatedRN.timing(aniVideoValue, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            AnimatedRN.timing(aniVideoValue, {
              toValue: 1,
              duration: 500,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start();
          }
        });
        break;
      case 1:
        AnimatedRN.timing(aniFriendValue, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            AnimatedRN.timing(aniFriendValue, {
              toValue: 1,
              duration: 500,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start();
          }
        });
        break;
      case 3:
        AnimatedRN.timing(aniInboxValue, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            AnimatedRN.timing(aniInboxValue, {
              toValue: 1,
              duration: 500,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start();
          }
        });
        break;
      case 4:
        AnimatedRN.timing(aniProfileValue, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            AnimatedRN.timing(aniProfileValue, {
              toValue: 1,
              duration: 500,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start();
          }
        });
        break;
      default:
        break;
    }
  }, [state.index]);

  return (
    <Block
      style={{
        height: BOTTOM_BAR_HEIGHT,
        width,
        flexDirection: 'row',
        zIndex: 99,
        backgroundColor: '#010101',
        borderTopColor: '#6F7681',
        borderTopWidth: 0.5,
      }}>
      <Block block style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const {
            options: { title, tabBarLabel },
          } = descriptors[route.key];
          let label: LabelProps = '';
          if (tabBarLabel !== undefined) {
            label = tabBarLabel;
          } else if (title !== undefined) {
            label = title;
          } else {
            label = route.name;
          }

          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, { merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const color = isFocused ? 'white' : '#ccc';
          const opacity = isFocused ? 1 : 0.5;
          let icon: VectorIconIcon = 'home';
          let reverseIcon: VectorIconIcon = 'home';
          let scaleAni = scaleVideo;
          let opacityAni = opacityVideo;
          switch (route.name) {
            case 'VIDEO':
              icon = 'bx_home1';
              reverseIcon = 'home';
              scaleAni = scaleVideo;
              opacityAni = opacityVideo;
              break;
            case 'FRIEND':
              icon = 'bx_book';
              reverseIcon = 'multi_user';
              scaleAni = scaleFriend;
              opacityAni = opacityFriend;
              break;
            case 'INBOX':
              icon = 'bx_message_alt_check';
              reverseIcon = 'bx_message';
              scaleAni = scaleInbox;
              opacityAni = opacityInbox;
              break;
            case 'PROFILE':
              icon = 'bx_user_pin';
              reverseIcon = 'bx_user';
              scaleAni = scaleProfile;
              opacityAni = opacityProfile;
              break;
            default:
              break;
          }

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}>
              {route.name === 'RECORD' ? (
                <Block
                  style={{
                    height: BOTTOM_ICON_HEIGHT,
                    width: width / 5,
                    alignItems: 'center',
                    paddingTop: 6,
                  }}>
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
                </Block>
              ) : (
                <Block
                  style={{
                    height: BOTTOM_ICON_HEIGHT,
                    width: width / 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 6,
                  }}>
                  <AnimatedRN.View
                    style={{
                      opacity: opacityAni,
                      alignItems: 'center',
                      transform: [
                        {
                          scaleX: scaleAni,
                        },
                        {
                          scaleY: scaleAni,
                        },
                      ],
                    }}>
                    {isFocused ? (
                      <VectorIcon icon={icon} color={color} />
                    ) : (
                      <VectorIcon icon={reverseIcon} color={color} />
                    )}
                    <AnimatedRN.Text
                      style={{
                        marginTop: 3,
                        color,
                        fontSize: 12,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        opacity,
                      }}>
                      {label}
                    </AnimatedRN.Text>
                  </AnimatedRN.View>
                </Block>
              )}
            </TouchableOpacity>
          );
        })}
      </Block>
    </Block>
  );
};

const TabNavigator = () => {
  return (
    <HomeTab.Navigator
      initialRouteName={APP_SCREEN.VIDEO}
      tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
      screenOptions={() => ({
        headerShown: false,
      })}>
      <HomeTab.Screen
        name={APP_SCREEN.VIDEO}
        component={Video}
        options={{
          title: 'Home',
        }}
      />
      <HomeTab.Screen
        name={APP_SCREEN.FRIEND}
        component={Friend}
        options={{
          title: 'Friends',
        }}
      />
      <HomeTab.Screen name={APP_SCREEN.RECORD} component={Record} />
      <HomeTab.Screen
        name={APP_SCREEN.INBOX}
        component={Inbox}
        options={{
          title: 'Inbox',
        }}
      />
      <HomeTab.Screen
        name={APP_SCREEN.PROFILE}
        component={Profile}
        options={{
          title: 'Profile',
        }}
      />
    </HomeTab.Navigator>
  );
};

export const HomeTabNavigator = memo(TabNavigator, isEqual);

// https://reactnavigation.org/docs/bottom-tab-navigator/
