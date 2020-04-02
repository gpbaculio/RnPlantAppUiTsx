import {NavigationStackParamList} from 'navigation';

import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';

type SettingsScreenNavigationProp = StackNavigationProp<
  NavigationStackParamList,
  'Settings'
>;

interface SettingsProps {
  navigation: SettingsScreenNavigationProp;
}

const Settings: React.FC<SettingsProps> = ({navigation}) => {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;
