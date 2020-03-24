import React from 'react';
import {Animated} from 'react-native';
import {FlattenSimpleInterpolation} from 'styled-components';
import styled, {css} from 'styled-components/native';

import {colors} from '../constants/theme';

interface BlockViewProps {
  center?: boolean;
  bot?: boolean;
  flex?: number;
  middle?: boolean;
  row?: boolean;
  animated?: boolean;
  defaultStyle?: FlattenSimpleInterpolation;
  color?: 'gray';
  animatedStyle?: {[animatedKey: string]: Animated.AnimatedInterpolation};
}

const BlockView = styled.View<BlockViewProps>`
  flex: 1;
  ${(props) =>
    css` 
      ${props.center && 'align-items: center;'}
      ${props.bot && 'justify-content: flex-end;'}
      ${props.flex && `flex:${props.flex}`}
      ${props.middle && 'justify-content: center'}
      ${props.row && 'flex-direction: row'}
      ${props.defaultStyle && props.defaultStyle}
      ${props.color && `background-color: ${colors[props.color]}`}
    `}
`;

interface BlockProps extends BlockViewProps {
  children?: React.ReactNode;
}

const Block: React.FC<BlockProps> = ({
  children,
  center,
  bot,
  flex,
  middle,
  row,
  defaultStyle,
  animated,
  color,
  animatedStyle,
}) => {
  const blockViewStyles = {center, bot, flex, middle, row, defaultStyle, color};
  if (animated) {
    const AnimatedBlockView = Animated.createAnimatedComponent(BlockView);
    return children ? (
      <AnimatedBlockView {...blockViewStyles} style={animatedStyle}>
        {children}
      </AnimatedBlockView>
    ) : (
      <AnimatedBlockView {...blockViewStyles} style={animatedStyle} />
    );
  }
  return <BlockView {...blockViewStyles}>{children}</BlockView>;
};

export default Block;
