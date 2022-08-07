import React, { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';

import { Home } from '@features/authentication/home';
import { Detail } from '@features/un-authentication/detail';
import { Login } from '@features/un-authentication/login';
import { Welcome } from '@features/un-authentication/welcome';
import { useSelector } from '@hooks';
import { AppModule } from '@native-module';
import { APP_SCREEN, RootStackParamList } from '@navigation/screen-types';
import { createStackNavigator } from '@react-navigation/stack';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  // state
  const { token, loadingApp } = useSelector(state => state.app);

  // effect
  useEffect(() => {
    const id = setTimeout(() => {
      BootSplash.hide({ fade: true });
    }, 3000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!token) {
      // clean cache when logout
      AppModule.clearCache();
    }
  }, [token]);

  // render
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {token === undefined ? (
        <RootStack.Group
          screenOptions={{
            animationTypeForReplace: 'pop',
            gestureEnabled: false,
          }}>
          <RootStack.Screen name={APP_SCREEN.WELCOME} component={Welcome} />
          <RootStack.Screen name={APP_SCREEN.LOGIN} component={Login} />
          <RootStack.Screen name={APP_SCREEN.DETAIL} component={Detail} />
        </RootStack.Group>
      ) : (
        <RootStack.Group
          screenOptions={{
            gestureEnabled: false,
          }}>
          <RootStack.Screen name={APP_SCREEN.HOME} component={Home} />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};
