import React from 'react';
import {FlattenSimpleInterpolation} from 'styled-components';
import styled, {css} from 'styled-components/native';

import {sizes, colors, fonts} from '../constants/theme';

interface StyledTextTypographyProps {
  h1?: boolean;
  h3?: boolean;
  bold?: boolean;
  center?: boolean;
  primary?: boolean;
  gray2?: boolean;
  gray?: boolean;
  semiBold?: boolean;
  white?: boolean;
  caption?: boolean;
  error?: boolean;
  accent?: boolean;
  defaultStyle?: FlattenSimpleInterpolation;
}

const StyledTextTypography = styled.Text<StyledTextTypographyProps>`
  font-size: ${sizes.font}px;
  color: ${colors.black};
  ${(props) =>
    css`
    ${props.error && `color: ${colors.accent}`}
      ${props.h1 && `font-size: ${sizes.h1}px`}
      ${props.h3 && `font-size: ${sizes.h3}px`}
      ${props.accent && `color: ${colors.accent}`}
      ${props.center && 'text-align:center; text-align-vertical:center;'}
      ${props.bold && 'font-weight: bold'}
      ${props.primary && `color: ${colors.primary}`}
      ${props.gray2 && `color: ${colors.gray2}`}
      ${props.gray && `color: ${colors.gray}`}
      ${props.defaultStyle && props.defaultStyle}
      ${props.semiBold && 'font-weight: 500'}
      ${props.white && `color: ${colors.white}`}
      ${props.caption && `font-size: ${sizes.caption}px`}
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
  semiBold,
  white,
  caption,
  gray,
  accent,
  error,
}) => {
  const textTypographyStyleProps = {
    error,
    accent,
    h1,
    center,
    bold,
    primary,
    h3,
    gray2,
    defaultStyle,
    semiBold,
    white,
    caption,
    gray,
  };
  return (
    <StyledTextTypography {...textTypographyStyleProps}>
      {children}
    </StyledTextTypography>
  );
};

export default TextTypography;
