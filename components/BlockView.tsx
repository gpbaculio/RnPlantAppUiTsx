import React from 'react';
import {Animated} from 'react-native';
import {FlattenSimpleInterpolation} from 'styled-components';
import styled, {css} from 'styled-components/native';

import {colors} from '../constants/theme';

interface StyledBlockViewProps {
  center?: boolean;
  bot?: boolean;
  flex?: number;
  middle?: boolean;
  blockMargin?: number | number[];
  row?: boolean;
  animated?: boolean;
  defaultStyle?: FlattenSimpleInterpolation;
  color?: 'gray';
  animatedStyle?: {[animatedKey: string]: Animated.AnimatedInterpolation};
}

const StyledBlockView = styled.View<StyledBlockViewProps>`
  flex: 1;
  ${(props) => {
    const handleMargins = (blockMargin: number | number[]) => {
      if (typeof blockMargin === 'number') {
        return css`
          margin-top: ${blockMargin};
          margin-right: ${blockMargin};
          margin-bottom: ${blockMargin};
          margin-left: ${blockMargin};
        `;
      }

      if (Array.isArray(blockMargin)) {
        const marginLength = blockMargin.length;
        switch (marginLength) {
          case 1:
            return css`
              margin-top: ${blockMargin[0]}px;
              margin-right: ${blockMargin[0]}px;
              margin-bottom: ${blockMargin[0]}px;
              margin-left: ${blockMargin[0]}px;
            `;
          case 2:
            return css`
              margin-top: ${blockMargin[0]}px;
              margin-right: ${blockMargin[1]}px;
              margin-bottom: ${blockMargin[0]}px;
              margin-left: ${blockMargin[1]}px;
            `;
          case 3:
            return css`
              margin-top: ${blockMargin[0]}px;
              margin-right: ${blockMargin[1]}px;
              margin-bottom: ${blockMargin[2]}px;
              margin-left: ${blockMargin[1]}px;
            `;
          default:
            return css`
              margin-top: ${blockMargin[0]}px;
              margin-right: ${blockMargin[1]}px;
              margin-bottom: ${blockMargin[2]}px;
              margin-left: ${blockMargin[3]}px;
            `;
        }
      }
    };
    return css` 
      ${props.center && 'align-items: center;'}
      ${props.bot && 'justify-content: flex-end;'}
      ${props.flex && `flex:${props.flex}`}
      ${props.middle && 'justify-content: center'}
      ${props.row && 'flex-direction: row'}
      ${props.defaultStyle && props.defaultStyle}
      ${props.color && `background-color: ${colors[props.color]}`}
      ${props.blockMargin && handleMargins(props.blockMargin)}
    `;
  }}
`;

interface BlockViewProps extends StyledBlockViewProps {
  children?: React.ReactNode;
}

const BlockView: React.FC<BlockViewProps> = ({
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
  blockMargin,
}) => {
  const blockViewStyles = {
    center,
    bot,
    flex,
    middle,
    row,
    defaultStyle,
    color,
    blockMargin,
  };
  if (animated) {
    const AnimatedBlockView = Animated.createAnimatedComponent(StyledBlockView);
    return children ? (
      <AnimatedBlockView {...blockViewStyles} style={animatedStyle}>
        {children}
      </AnimatedBlockView>
    ) : (
      <AnimatedBlockView {...blockViewStyles} style={animatedStyle} />
    );
  }
  return <StyledBlockView {...blockViewStyles}>{children}</StyledBlockView>;
};

export default BlockView;
