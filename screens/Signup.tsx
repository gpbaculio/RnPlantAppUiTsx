import {NavigationStackParamList} from 'navigation';

import {StackNavigationProp} from '@react-navigation/stack';
import {Formik} from 'formik';
import React, {useState} from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import styled, {css} from 'styled-components/native';
import * as Yup from 'yup';

import BlockView from '../components/BlockView';
import ButtonTouchableOpacity from '../components/ButtonTouchableOpacity';
import FormInput from '../components/FormInput';
import TextTypography from '../components/TextTypography';
import {sizes, colors} from '../constants/theme';

type SignupScreenNavigationProp = StackNavigationProp<
  NavigationStackParamList,
  'Welcome'
>;

interface SignupProps {
  navigation: SignupScreenNavigationProp;
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const Signup: React.FC<SignupProps> = ({navigation}) => {
  const [visiblePassword, setVisiblePassword] = useState(true);
  return (
    <StyledKeyboardAvoidingView behavior="padding">
      <TextTypography h1 bold>
        Signup
      </TextTypography>
      <BlockView middle>
        <Formik
          validationSchema={SignupSchema}
          initialValues={{email: '', username: '', password: ''}}
          onSubmit={() => console.log('asdasd')}>
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
                  error={(touched.username && errors.username) as string}
                  handleChange={handleChange('username')}
                  handleBlur={handleBlur('username')}
                  value={values.username}
                  touched={touched.username as boolean}
                  label="Username"
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
                    Signup
                  </TextTypography>
                </ButtonTouchableOpacity>
              </>
            );
          }}
        </Formik>
        <TextTypography center caption gray>
          Already have an Account?&nbsp;
          <TextTypography
            center
            caption
            gray
            defaultStyle={css`
              text-decoration: underline;
            `}>
            Login
          </TextTypography>
        </TextTypography>
      </BlockView>
    </StyledKeyboardAvoidingView>
  );
};

export default Signup;

export const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  padding-top: 12px;
  justify-content: center;
  background-color: #fff;
  padding-horizontal: ${sizes.base * 2}px;
`;

export const StyledTogglePasswordBtn = styled.TouchableOpacity`
  position: absolute;
  align-items: flex-end;
  width: ${sizes.base * 2}px;
  height: ${sizes.base * 2}px;
  top: ${sizes.base}px;
  right: 0;
`;
