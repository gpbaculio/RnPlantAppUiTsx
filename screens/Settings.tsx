import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackParamList} from 'navigation';
import React, {useState} from 'react';
import {View, Slider, Dimensions, Text} from 'react-native';
import {TextInput, Switch} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import {mocks} from '../constants';
import {sizes, colors} from '../constants/theme';
import {ProfileProps} from './Browse';
import {Divider} from './Product';

type SettingsScreenNavigationProp = StackNavigationProp<
  NavigationStackParamList,
  'Settings'
>;

interface SettingsProps {
  navigation: SettingsScreenNavigationProp;
  settingsProfile: ProfileProps;
}

const {width} = Dimensions.get('window');
const fullWidth = Math.round(width - sizes.padding * 2);
const budgetMaxValue = 1000;
const monthlyCapMaxValue = 5000;

const getSliderBackgroundWidth = (currentValue: number, maxValue: number) => {
  const sliderWidth = (currentValue * fullWidth) / maxValue;
  if (currentValue >= maxValue * 0.75) return sliderWidth - 15;
  else if (currentValue >= maxValue * 0.5) return sliderWidth - 10;
  else return sliderWidth;
};

const Settings: React.FC<SettingsProps> = ({navigation, settingsProfile}) => {
  const [editing, setEditing] = useState('');
  const [userProfile, setUserProfile] = useState(settingsProfile);
  const [budget, setBudget] = useState(budgetMaxValue);
  const [monthlyCap, setMonthlyCap] = useState(monthlyCapMaxValue);
  const [newsLetterSwitch, setNewsLetterSwitch] = useState(false);
  const [notificationsSwitch, setNotificationsSwitch] = useState(false);
  const renderEdit = (name: keyof ProfileProps) => {
    if (editing === name)
      return (
        <TextInput
          defaultValue={userProfile[name]}
          onChangeText={(newText) =>
            setUserProfile({...userProfile, [name]: newText})
          }
        />
      );
    return <InputValue>{userProfile[name]}</InputValue>;
  };

  const getCurrentEditing = (toEdit: string) => editing === toEdit;

  return (
    <SettingsContainer>
      <SettingsHeadearContainer>
        <SettingsHeader>Settings</SettingsHeader>
        <SettingsAvatar source={settingsProfile.avatar} />
      </SettingsHeadearContainer>
      <SettingsScrollView showsVerticalScrollIndicator={false}>
        <InputsContainer>
          <View>
            <Label>Username</Label>
            {renderEdit('username')}
          </View>
          <InputToggle
            onPress={() =>
              getCurrentEditing('username')
                ? setEditing('')
                : setEditing('username')
            }>
            {getCurrentEditing('username') ? 'Save' : 'Edit'}
          </InputToggle>
        </InputsContainer>
        <InputsContainer>
          <View>
            <Label>Location</Label>
            {renderEdit('location')}
          </View>
          <InputToggle
            onPress={() =>
              getCurrentEditing('location')
                ? setEditing('')
                : setEditing('location')
            }>
            {getCurrentEditing('location') ? 'Save' : 'Edit'}
          </InputToggle>
        </InputsContainer>
        <InputsContainer>
          <View>
            <Label>Email</Label>
            <InputValue>{userProfile.email}</InputValue>
          </View>
        </InputsContainer>
        <Divider />
        <Sliders>
          <SliderContainer>
            <Label>Budget</Label>
            <View
              style={{
                borderRadius: 10,
                overflow: 'hidden',
                paddingVertical: 12,
                marginTop: -6,
              }}>
              <FakeSliderContainer>
                <FakeMaximumTintColor />
                <FakeMinimumTintColor
                  width={getSliderBackgroundWidth(budget, budgetMaxValue)}
                />
              </FakeSliderContainer>
              <StyledSlider
                minimumValue={1}
                maximumValue={budgetMaxValue}
                value={budget}
                thumbTintColor={colors.secondary}
                onValueChange={(newValue) => setBudget(newValue)}
                maximumTrackTintColor="transparent"
                minimumTrackTintColor="transparent"
              />
            </View>
            <AmountSliderValue>${Math.round(budget)}</AmountSliderValue>
          </SliderContainer>
          <SliderContainer>
            <Label>Monthly Cap</Label>
            <View
              style={{
                borderRadius: 10,
                overflow: 'hidden',
                paddingVertical: 12,
                marginTop: -6,
              }}>
              <FakeSliderContainer>
                <FakeMaximumTintColor />
                <FakeMinimumTintColor
                  width={getSliderBackgroundWidth(
                    monthlyCap,
                    monthlyCapMaxValue,
                  )}
                />
              </FakeSliderContainer>
              <StyledSlider
                minimumValue={1}
                maximumValue={monthlyCapMaxValue}
                value={monthlyCap}
                thumbTintColor={colors.secondary}
                onValueChange={(newValue) => setMonthlyCap(newValue)}
                maximumTrackTintColor="transparent"
                minimumTrackTintColor="transparent"
              />
            </View>
            <AmountSliderValue>${Math.round(monthlyCap)}</AmountSliderValue>
          </SliderContainer>
        </Sliders>
        <Divider />
        <SwitchContainer>
          <SwitchText>Notifications</SwitchText>
          <Switch
            ios_backgroundColor="rgba(168, 182, 200, 0.30)"
            value={notificationsSwitch}
            onValueChange={(newValue) => setNotificationsSwitch(newValue)}
          />
        </SwitchContainer>
        <SwitchContainer>
          <SwitchText>Newsletter</SwitchText>
          <Switch
            ios_backgroundColor="rgba(168, 182, 200, 0.30)"
            value={newsLetterSwitch}
            onValueChange={(newValue) => setNewsLetterSwitch(newValue)}
          />
        </SwitchContainer>
      </SettingsScrollView>
    </SettingsContainer>
  );
};

Settings.defaultProps = {
  settingsProfile: mocks.profile,
};

export default Settings;

const SettingsContainer = styled.View`
  flex: 1;
  padding-horizontal: ${sizes.base * 2}px;
  padding-top: ${(sizes.base * 2) / 2}px;
  background-color: #fff;
`;

const SettingsHeadearContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SettingsHeader = styled.Text`
  font-size: ${sizes.h1}px;
  font-weight: bold;
`;

const SettingsAvatar = styled.Image`
  height: ${sizes.base * 2.2}px;
  width: ${sizes.base * 2.2}px;
`;

const SettingsScrollView = styled.ScrollView`
  margin-top: ${sizes.base * 1.7}px;
`;

const InputsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 10px;
  align-items: flex-end;
`;

const Label = styled.Text`
  color: ${colors.gray2};
  margin-bottom: 10px;
`;

const InputValue = styled.Text`
  font-weight: 700;
`;

const InputToggle = styled.Text`
  font-weight: 700;
  color: ${colors.secondary};
`;

const Sliders = styled.View`
  margin-top: ${sizes.base * 0.7}px;
  margin-bottom: ${sizes.base * 0.7}px;
`;

const SliderContainer = styled.View`
  margin-bottom: 5px;
`;

const StyledSlider = styled(Slider)`
  height: 14px;
  border-radius: 10px;
  margin-top: -2px;
  margin-left: -10px;
  margin-right: -10px;
`;

const FakeSliderContainer = styled.View`
  flex-direction: row;
  position: absolute;
  margin-top: 14px;
`;

interface FakeMinimumTintColorProps {
  width: number;
}

const FakeMinimumTintColor = styled.View<FakeMinimumTintColorProps>`
  background-color: ${colors.secondary};
  height: 5px;
  border-radius: 5px;
  ${(props) => `width: ${props.width}px;`}
`;

const FakeMaximumTintColor = styled.View`
  background-color: #f6f5f8;
  width: ${fullWidth}px;
  height: 5px;
  border-radius: 5px;
  position: absolute;
`;

const AmountSliderValue = styled.Text`
  color: ${colors.gray};
  font-size: 12px;
  text-align: right;
`;

const SwitchContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${sizes.base * 2}px;
  justify-content: space-between;
`;

const SwitchText = styled.Text`
  color: ${colors.gray2};
`;
