import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {View, Text} from 'react-native';
import styled, {css} from 'styled-components/native';

import {sizes, colors} from '../constants/theme';

interface StyledButtonTouchableOpacity {
  gradient?: boolean;
}

const StyledButtonTouchableOpacity = styled.TouchableOpacity`
  border-radius: ${sizes.radius}px;
  height: ${sizes.base * 3}px;
  justify-content: center;
  margin-vertical: ${sizes.padding / 3}px;
`;

const StyledButtonLinearGradient = styled(LinearGradient)`
  border-radius: ${sizes.radius}px;
  height: ${sizes.base * 3}px;
  justify-content: center;
  margin-vertical: ${sizes.padding / 3}px;
`;

interface ButtonTouchableOpacityProps extends StyledButtonTouchableOpacity {
  children?: React.ReactNode;
}

const ButtonTouchableOpacity: React.FC<ButtonTouchableOpacityProps> = ({
  gradient,
  children,
}) => {
  const defaultButtonStyle = {
    startColor: colors.primary,
    endColor: colors.secondary,
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
    locations: [0.1, 0.9],
    opacity: 0.8,
    color: colors.white,
  };
  if (gradient) {
    return (
      <StyledButtonTouchableOpacity activeOpacity={defaultButtonStyle.opacity}>
        <StyledButtonLinearGradient
          start={defaultButtonStyle.start}
          end={defaultButtonStyle.end}
          locations={defaultButtonStyle.locations}
          colors={[defaultButtonStyle.startColor, defaultButtonStyle.endColor]}>
          {children}
        </StyledButtonLinearGradient>
      </StyledButtonTouchableOpacity>
    );
  }
  return (
    <StyledButtonTouchableOpacity activeOpacity={defaultButtonStyle.opacity}>
      {children}
    </StyledButtonTouchableOpacity>
  );
};

export default ButtonTouchableOpacity;
