import React from 'react';
import {FlattenSimpleInterpolation} from 'styled-components';
import styled, {css} from 'styled-components/native';

import {sizes, colors} from '../constants/theme';

interface StyledTextTypographyProps {
  h1?: boolean;
  h3?: boolean;
  bold?: boolean;
  center?: boolean;
  primary?: boolean;
  gray2?: boolean;
  defaultStyle?: FlattenSimpleInterpolation;
}

const StyledTextTypography = styled.Text<StyledTextTypographyProps>`
  flex: 1;
  ${(props) =>
    css`
      ${props.h1 && `font-size: ${sizes.h1}px`}
      ${props.h3 && `font-size: ${sizes.h3}px`}
      ${props.center && 'text-align: center'}
      ${props.bold && 'font-weight: bold'}
      ${props.primary && `color: ${colors.primary}`}
      ${props.gray2 && `color: ${colors.gray2}`}
      ${props.defaultStyle && props.defaultStyle}
    `}
`;

interface TextTypographyProps extends StyledTextTypographyProps {
  children: React.ReactNode;
}

const TextTypography: React.FC<TextTypographyProps> = ({
  children,
  h1,
  center,
  bold,
  primary,
  h3,
  gray2,
  defaultStyle,
}) => {
  return (
    <StyledTextTypography
      {...{h1, center, bold, primary, h3, gray2, defaultStyle}}>
      {children}
    </StyledTextTypography>
  );
};

export default TextTypography;
