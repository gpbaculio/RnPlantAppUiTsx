import {NavigationStackParamList} from 'navigation';

import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  Text,
  View,
  Animated,
  Dimensions,
  Modal,
  Image,
  Platform,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {css} from 'styled-components';

import BlockView from '../components/BlockView';
import ButtonTouchableOpacity from '../components/ButtonTouchableOpacity';
import TextTypography from '../components/TextTypography';
import {sizes} from '../constants/theme';

type WelcomeScreenNavigationProp = StackNavigationProp<
  NavigationStackParamList,
  'Welcome'
>;

interface WelcomeProps {
  navigation: WelcomeScreenNavigationProp;
}

const {width, height} = Dimensions.get('window');
const Welcome: React.FC<WelcomeProps> = ({navigation}) => {
  const [showTerms, setShowTerms] = useState(false);
  const illustrations = [
    {id: 1, source: require('../assets/images/illustration_1.png')},
    {id: 2, source: require('../assets/images/illustration_2.png')},
    {id: 3, source: require('../assets/images/illustration_3.png')},
  ];
  const scrollX = new Animated.Value(0);
  const renderIllustrations = () => (
    <FlatList
      horizontal
      pagingEnabled
      scrollEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      snapToAlignment="center"
      data={illustrations}
      extraData={showTerms}
      keyExtractor={(item, index) => `${item.id}`}
      renderItem={({item}) => (
        <Image
          source={item.source}
          resizeMode="contain"
          style={{width, height: height / 2, overflow: 'visible'}}
        />
      )}
      onScroll={Animated.event([
        {
          nativeEvent: {contentOffset: {x: scrollX}},
        },
      ])}
    />
  );
  const renderSteps = () => {
    const stepPosition = Animated.divide(scrollX, width);
    return (
      <BlockView
        row
        center
        middle
        defaultStyle={css`
          position: absolute;
          bottom: ${sizes.base * 3}px;
          right: 0;
          left: 0;
        `}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });
          return (
            <BlockView
              animated
              key={`step-${item.id}-${index}`}
              color="gray"
              defaultStyle={css`
                flex: 0;
                flex-basis: 5.5px;
                height: 5.5px;
                border-radius: 5.5px;
                align-items: center;
                margin-horizontal: 2.5px;
              `}
              animatedStyle={{opacity}}
            />
          );
        })}
      </BlockView>
    );
  };
  return (
    <BlockView
      defaultStyle={css`
        margin-top: ${Platform.OS === 'android' ? 24 : 0}px;
      `}>
      <BlockView center bot flex={0.4}>
        <TextTypography h1 center bold>
          Your Home.
          <TextTypography h1 primary>
            {' '}
            Greener.
          </TextTypography>
        </TextTypography>
        <TextTypography
          h3
          gray2
          defaultStyle={css`
            margin-top: ${sizes.padding / 2}px;
          `}>
          Enjoy the experience.
        </TextTypography>
      </BlockView>
      <BlockView center middle>
        {renderIllustrations()}
        {renderSteps()}
      </BlockView>
      <BlockView middle flex={0.5} blockMargin={[0, sizes.padding * 2]}>
        <ButtonTouchableOpacity gradient>
          <TextTypography center semiBold white>
            Login
          </TextTypography>
        </ButtonTouchableOpacity>
        <ButtonTouchableOpacity
          shadow
          onPress={() => navigation.navigate('Signup')}>
          <TextTypography center semiBold>
            Signup
          </TextTypography>
        </ButtonTouchableOpacity>
        <ButtonTouchableOpacity>
          <TextTypography center caption gray>
            Enjoy the experience.
          </TextTypography>
        </ButtonTouchableOpacity>
      </BlockView>
    </BlockView>
  );
};

export default Welcome;
