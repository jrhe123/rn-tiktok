import React, { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';

import { HomeTabNavigator } from '@features/authentication/tab-navigator';
import { FindFriend } from '@features/un-authentication/find-friend';
import { HelpCenter } from '@features/un-authentication/help';
import { Info } from '@features/un-authentication/info';
import { LiveStream } from '@features/un-authentication/live-stream';
import { Login } from '@features/un-authentication/login';
import { PhoneEmail } from '@features/un-authentication/phone-email';
import { Policy } from '@features/un-authentication/policy';
import { QRShare } from '@features/un-authentication/qr-share';
import { Register } from '@features/un-authentication/register';
import { Scanner } from '@features/un-authentication/scanner';
import { Search } from '@features/un-authentication/search';
import { SearchResult } from '@features/un-authentication/search-result';
import { Settings } from '@features/un-authentication/settings';
import { Terms } from '@features/un-authentication/terms';
import { UserVideo } from '@features/un-authentication/user-videoo';
import { Welcome } from '@features/un-authentication/welcome';
import { useSelector } from '@hooks';
import { AppModule } from '@native-module';
import { APP_SCREEN, RootStackParamList } from '@navigation/screen-types';
import { createStackNavigator } from '@react-navigation/stack';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  // state
  const { token, welcomeComplete } = useSelector(state => state.app);

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
    <RootStack.Navigator
      initialRouteName={welcomeComplete ? APP_SCREEN.HOME : APP_SCREEN.WELCOME}
      screenOptions={{ headerShown: false }}>
      {token === undefined ? (
        <RootStack.Group
          screenOptions={{
            animationTypeForReplace: 'pop',
            gestureEnabled: false,
          }}>
          <RootStack.Screen name={APP_SCREEN.WELCOME} component={Welcome} />
          <RootStack.Screen
            name={APP_SCREEN.PHONE_EMAIL}
            component={PhoneEmail}
          />
          <RootStack.Screen name={APP_SCREEN.REGISTER} component={Register} />
          <RootStack.Screen name={APP_SCREEN.LOGIN} component={Login} />
          <RootStack.Screen name={APP_SCREEN.SEARCH} component={Search} />
          <RootStack.Screen
            name={APP_SCREEN.SEARCH_RESULT}
            component={SearchResult}
          />
          <RootStack.Screen
            name={APP_SCREEN.FIND_FRIEND}
            component={FindFriend}
          />
          <RootStack.Screen name={APP_SCREEN.SCANNER} component={Scanner} />
          <RootStack.Screen name={APP_SCREEN.QR_SHARE} component={QRShare} />
          <RootStack.Screen
            name={APP_SCREEN.LIVE_STREAM}
            component={LiveStream}
          />
          <RootStack.Screen name={APP_SCREEN.HELP} component={HelpCenter} />
          <RootStack.Screen name={APP_SCREEN.INFO} component={Info} />
          <RootStack.Screen
            name={APP_SCREEN.TERMS_OF_SERVICE}
            component={Terms}
          />
          <RootStack.Screen
            name={APP_SCREEN.PRIVACY_POLICY}
            component={Policy}
          />
          <RootStack.Screen name={APP_SCREEN.SETTINGS} component={Settings} />
          <RootStack.Screen
            name={APP_SCREEN.USER_VIDEO}
            component={UserVideo}
          />
          <RootStack.Screen
            name={APP_SCREEN.HOME}
            component={HomeTabNavigator}
          />
        </RootStack.Group>
      ) : (
        <RootStack.Group
          screenOptions={{
            gestureEnabled: false,
          }}>
          <RootStack.Screen
            name={APP_SCREEN.HOME}
            component={HomeTabNavigator}
          />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};
