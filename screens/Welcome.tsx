import React, {useState} from 'react';
import {Text, View, Animated, Modal} from 'react-native';
import {css} from 'styled-components';

import Block from '../components/Block';
import TextTypography from '../components/TextTypography';
import {sizes} from '../constants/theme';

const Welcome = () => {
  const [showTerms, setShowTerms] = useState(false);
  const scrollX = new Animated.Value(0);
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
    </Block>
  );
};

export default Welcome;
