import {NavigationStackParamList} from 'navigation';

import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';

type ProductScreenNavigationProp = StackNavigationProp<
  NavigationStackParamList,
  'Product'
>;

interface SignupProps {
  navigation: ProductScreenNavigationProp;
}

const Product: React.FC<SignupProps> = ({navigation}) => {
  return (
    <View>
      <Text>Product</Text>
    </View>
  );
};

export default Product;
