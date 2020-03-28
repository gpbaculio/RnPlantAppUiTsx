import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {View, Text} from 'react-native';
import {FlattenSimpleInterpolation} from 'styled-components';
import styled, {css} from 'styled-components/native';

import {sizes, colors} from '../constants/theme';

interface StyledButtonTouchableOpacity {
  gradient?: boolean;
  shadow?: boolean;
  defaultStyle?: FlattenSimpleInterpolation;
}

const StyledButtonTouchableOpacity = styled.TouchableOpacity<
  StyledButtonTouchableOpacity
>`
  border-radius: ${sizes.radius}px;
  height: ${sizes.base * 3}px;
  justify-content: center;
  margin-vertical: ${sizes.padding / 3}px;
  ${(props) => css`
    ${props.shadow &&
    `shadow-color: ${colors.black};
    elevation: 1;
    shadow-offset: 0 2px;
    shadow-opacity: 0.1;
    shadow-radius: 2px;
    background-color: #fff;`}
    ${props.defaultStyle && props.defaultStyle}
  `}
`;

const StyledButtonLinearGradient = styled(LinearGradient)`
  border-radius: ${sizes.radius}px;
  height: ${sizes.base * 3}px;
  justify-content: center;
  margin-vertical: ${sizes.padding / 3}px;
`;

interface ButtonTouchableOpacityProps extends StyledButtonTouchableOpacity {
  children?: React.ReactNode;
  onPress?: () => void;
  title?: string;
}

const ButtonTouchableOpacity: React.FC<ButtonTouchableOpacityProps> = ({
  gradient,
  children,
  shadow,
  onPress,
  defaultStyle,
  title,
}) => {
  const defaultButtonStyle = {
    startColor: colors.primary,
    endColor: colors.secondary,
    start: {x: 0, y: 0},
    end: {x: 1, y: 1},
    locations: [0.1, 0.9],
    opacity: 0.8,
    color: colors.white,
    shadow,
  };
  const styledButtonStyleProps = {
    shadow,
    defaultStyle,
    title,
  };
  if (gradient) {
    return (
      <StyledButtonTouchableOpacity
        onPress={onPress}
        activeOpacity={defaultButtonStyle.opacity}>
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
    <StyledButtonTouchableOpacity
      onPress={onPress}
      {...styledButtonStyleProps}
      activeOpacity={defaultButtonStyle.opacity}>
      {children}
    </StyledButtonTouchableOpacity>
  );
};

export default ButtonTouchableOpacity;
