import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Image} from 'react-native';

import {theme} from '../constants';
import {Welcome, Signup, Login} from '../screens';

/* @noflow */
export type NavigationStackParamList = {
  Welcome: undefined;
  Signup: undefined;
  Login: undefined;
};

const NavigationStack = createStackNavigator<NavigationStackParamList>();

const Navigation = () => (
  <NavigationContainer>
    <NavigationStack.Navigator
      screenOptions={{
        headerStyle: {
          height: theme.sizes.base * 4,
          backgroundColor: theme.colors.white,
          borderBottomColor: 'transparent',
          elevation: 0,
        },
        headerRightContainerStyle: {
          alignItems: 'center',
          paddingRight: theme.sizes.base,
        },
        headerBackImage: () => (
          <Image source={require('../assets/icons/back.png')} />
        ),
        headerLeftContainerStyle: {
          alignItems: 'center',
          marginLeft: theme.sizes.base * 1.4,
          paddingRight: theme.sizes.base,
          marginTop: 8,
        },
      }}>
      <NavigationStack.Screen
        name="Welcome"
        options={{header: () => null}}
        component={Welcome}
      />
      <NavigationStack.Screen
        name="Signup"
        options={{headerTitle: () => null}}
        component={Signup}
      />
      <NavigationStack.Screen
        name="Login"
        options={{headerTitle: () => null}}
        component={Login}
      />
    </NavigationStack.Navigator>
  </NavigationContainer>
);

export default Navigation;
