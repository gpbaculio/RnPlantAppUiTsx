import React, {useState} from 'react';
import {Text, View, Animated, Dimensions, Modal, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {css} from 'styled-components';

import Block from '../components/Block';
import TextTypography from '../components/TextTypography';
import {sizes} from '../constants/theme';

const {width, height} = Dimensions.get('window');
const Welcome = () => {
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
      <Block
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
            <Block
              animated
              key={`step-${index}`}
              color="gray"
              defaultStyle={css`
                width: 5px;
                height: 5px;
                border-radius: 5px;
                margin-horizontal: 2.5px;
              `}
              animatedStyle={{opacity}}
            />
          );
        })}
      </Block>
    );
  };
  return (
    <Block>
      <Block center bot flex={0.4}>
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
      </Block>
      <Block center middle>
        {renderIllustrations()}
        {renderSteps()}
      </Block>
    </Block>
  );
};

export default Welcome;
