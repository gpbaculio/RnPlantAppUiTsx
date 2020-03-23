import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Image} from 'react-native';

import {theme} from '../constants';
import {Welcome} from '../screens';

const NavigationStack = createStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <NavigationStack.Navigator
      screenOptions={{
        headerStyle: {
          height: theme.sizes.base * 4,
          backgroundColor: theme.colors.white, // or 'white
          borderBottomColor: 'transparent',
          elevation: 0, // for android
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
          marginLeft: theme.sizes.base * 2,
          paddingRight: theme.sizes.base,
        },
      }}>
      <NavigationStack.Screen
        name="Welcome"
        options={{header: () => null}}
        component={Welcome}
      />
    </NavigationStack.Navigator>
  </NavigationContainer>
);

export default Navigation;
