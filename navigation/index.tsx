import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Image} from 'react-native';

import {theme} from '../constants';
import {
  Welcome,
  Signup,
  Login,
  Browse,
  Explore,
  Product,
  Settings,
} from '../screens';
import {CategoryProps} from '../screens/Browse';

/* @noflow */
export type NavigationStackParamList = {
  Welcome: undefined;
  Signup: undefined;
  Login: undefined;
  Browse: undefined;
  Product: undefined;
  Settings: undefined;
  Explore: {category: CategoryProps};
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
      <NavigationStack.Screen
        name="Browse"
        options={{headerTitle: () => null}}
        component={Browse}
      />
      <NavigationStack.Screen
        name="Product"
        options={{headerTitle: () => null}}
        component={Product}
      />
      <NavigationStack.Screen
        name="Explore"
        options={{headerTitle: () => null}}
        component={Explore}
      />
      <NavigationStack.Screen
        name="Settings"
        options={{headerTitle: () => null}}
        component={Settings}
      />
    </NavigationStack.Navigator>
  </NavigationContainer>
);

export default Navigation;
