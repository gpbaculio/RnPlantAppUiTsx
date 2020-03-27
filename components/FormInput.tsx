import React from 'react';
import {StyleSheet} from 'react-native';
import styled, {css} from 'styled-components/native';

import {colors} from '../constants/theme';
import TextTypography from './TextTypography';

export const StyledFormInputContainer = styled.View`
  margin-bottom: 8px;
`;

interface StyledTextInputProps {
  error?: boolean;
}

export const StyledTextInput = styled.TextInput<StyledTextInputProps>`
  border-radius: 0;
  border-width: 0;
  border-bottom-color: ${colors.gray2};
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  ${(props) =>
    css`
      ${props.error && `border-bottom-color: ${colors.accent}`}
    `}
`;

interface FormInputProps {
  touched: boolean;
  error: string;
  handleChange: (e: string | React.ChangeEvent<any>) => void;
  handleBlur: (e: any) => void;
  value: string;
  label: string;
  children?: React.ReactNode;
  visiblePassword?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  touched,
  error,
  label,
  handleChange,
  handleBlur,
  value,
  children,
  visiblePassword,
}) => (
  <StyledFormInputContainer>
    <TextTypography gray={!error} error={touched && Boolean(error)}>
      {label}
    </TextTypography>
    <StyledTextInput
      secureTextEntry={visiblePassword}
      error={touched && Boolean(error)}
      onChangeText={handleChange}
      onBlur={handleBlur}
      value={value}
    />
    {children && children}
    {touched && Boolean(error) && (
      <TextTypography error>{error}</TextTypography>
    )}
  </StyledFormInputContainer>
);
export default FormInput;
