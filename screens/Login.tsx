import {NavigationStackParamList} from 'navigation';

import {StackNavigationProp} from '@react-navigation/stack';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import styled, {css} from 'styled-components/native';
import * as Yup from 'yup';

import BlockView from '../components/BlockView';
import ButtonTouchableOpacity from '../components/ButtonTouchableOpacity';
import FormInput from '../components/FormInput';
import TextTypography from '../components/TextTypography';
import {sizes, colors} from '../constants/theme';
import {StyledKeyboardAvoidingView, StyledTogglePasswordBtn} from './Signup';

type LoginScreenNavigationProp = StackNavigationProp<
  NavigationStackParamList,
  'Login'
>;

interface LoginProps {
  navigation: LoginScreenNavigationProp;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login: React.FC<LoginProps> = ({navigation}) => {
  const [visiblePassword, setVisiblePassword] = useState(true);
  return (
    <StyledKeyboardAvoidingView behavior="padding">
      <TextTypography h1 bold>
        Login
      </TextTypography>
      <BlockView middle>
        <Formik
          validationSchema={LoginSchema}
          initialValues={{email: 'gpbaculio@gmail.com', password: 'abcd123'}}
          onSubmit={() => {
            Keyboard.dismiss();
            navigation.navigate('Browse');
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => {
            return (
              <>
                <FormInput
                  error={(touched.email && errors.email) as string}
                  handleChange={handleChange('email')}
                  handleBlur={handleBlur('email')}
                  value={values.email}
                  touched={touched.email as boolean}
                  label="Email"
                />
                <FormInput
                  error={(touched.password && errors.password) as string}
                  handleChange={handleChange('password')}
                  handleBlur={handleBlur('password')}
                  value={values.password}
                  visiblePassword={visiblePassword}
                  touched={touched.password as boolean}
                  label="Password">
                  <StyledTogglePasswordBtn
                    onPress={() => setVisiblePassword(!visiblePassword)}>
                    <IonIcons
                      color={colors.gray}
                      size={sizes.font * 1.35}
                      name={visiblePassword ? 'md-eye' : 'md-eye-off'}
                    />
                  </StyledTogglePasswordBtn>
                </FormInput>
                <ButtonTouchableOpacity onPress={handleSubmit} gradient>
                  <TextTypography center semiBold white>
                    Login
                  </TextTypography>
                </ButtonTouchableOpacity>
              </>
            );
          }}
        </Formik>
        <TextTypography center caption gray>
          Don't have an Account?&nbsp;
          <TextTypography
            center
            caption
            gray
            defaultStyle={css`
              text-decoration: underline;
            `}>
            Signup
          </TextTypography>
        </TextTypography>
      </BlockView>
    </StyledKeyboardAvoidingView>
  );
};

export default Login;
