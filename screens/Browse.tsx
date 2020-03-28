import {NavigationStackParamList} from 'navigation';

import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StyleSheet, Dimensions, Image} from 'react-native';
import styled, {css} from 'styled-components/native';

import ButtonTouchableOpacity from '../components/ButtonTouchableOpacity';
import TextTypography from '../components/TextTypography';
import {mocks} from '../constants';
import {sizes, colors} from '../constants/theme';

type BrowseScreenNavigationProp = StackNavigationProp<
  NavigationStackParamList,
  'Browse'
>;

interface ProfileProps {
  username: string;
  location: string;
  email: string;
  avatar: any;
  budget: number;
  monthly_cap: number;
  notifications: boolean;
  newsletter: boolean;
}

interface CategoryProps {
  id: string;
  name: string;
  tags: string[];
  count: number;
  image: any;
}

interface BrowseProps {
  navigation: BrowseScreenNavigationProp;
  profile: ProfileProps;
  categories: CategoryProps[];
  tabs: string[];
}

const {width, height} = Dimensions.get('window');
const Browse: React.FC<BrowseProps> = ({
  navigation,
  profile,
  categories,
  tabs,
}) => {
  const [activeTab, setActiveTab] = useState('Products');
  return (
    <BrowseContainer>
      <BrowseHeadear>
        <TextTypography h1 bold>
          Browse
        </TextTypography>
        <ButtonTouchableOpacity
          onPress={() => {
            //navigation.navigate("Settings")
          }}>
          <BrowseHeaderProfileAvatar source={profile.avatar} />
        </ButtonTouchableOpacity>
      </BrowseHeadear>
      <BrowseTabs>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <BrowseTab active={isActive} key={`tab-${tab}`}>
              <BrowseTabText active={isActive}>{tab}</BrowseTabText>
            </BrowseTab>
          );
        })}
      </BrowseTabs>
      <BrowseScrollView showsVerticalScrollIndicator={false}>
        <BrowseCategories>
          {categories.map((category) => {
            //add touchable opacity to navigate on explore route
            return (
              <BrowseCard>
                <BrowseBadge>
                  <Image source={category.image} />
                </BrowseBadge>
              </BrowseCard>
            );
          })}
        </BrowseCategories>
      </BrowseScrollView>
    </BrowseContainer>
  );
};

Browse.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories,
  tabs: ['Products', 'Inspirations', 'Shop'],
};

export default Browse;

const BrowseContainer = styled.View`
  flex: 1;
  padding-horizontal: ${sizes.base * 2}px;
  padding-top: ${(sizes.base * 2) / 2}px;
  background-color: #fff;
`;

const BrowseHeadear = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BrowseHeaderProfileAvatar = styled.Image`
  height: ${sizes.base * 2.2}px;
  width: ${sizes.base * 2.2}px;
`;

const BrowseTabs = styled.View`
  flex-direction: row;
  border-bottom-color: ${colors.gray2};
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  margin-vertical: ${sizes.base}px;
`;

type BrowseTabProps = {
  active?: boolean;
};

const BrowseTab = styled.TouchableOpacity<BrowseTabProps>`
  flex: 1;
  align-items: center;
  padding-vertical: ${sizes.base / 2}px;
  ${(props) => css`
    ${props.active &&
    `border-bottom-color: ${colors.secondary};
      border-bottom-width: 3px;`}
  `}
`;

const BrowseTabText = styled.Text<BrowseTabProps>`
  font-weight: 500;
  font-size: 16px;
  ${(props) => css`
    ${`color: ${props.active ? colors.secondary : colors.gray};`}
  `}
`;

const BrowseScrollView = styled.ScrollView`
  padding-vertical: ${sizes.base * 2}px;
`;

const BrowseCategories = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: ${sizes.base * 3.5}px;
  padding: 1px;
`;

const BrowseCard = styled.View`
  border-radius: ${sizes.radius}px;
  padding: ${sizes.base + 4}px;
  margin-bottom: ${sizes.base - 2}px;
  color: ${colors.white};
  min-width: ${(width - sizes.padding * 2.5 - sizes.base) / 2}px;
  max-width: ${(width - sizes.padding * 2.5 - sizes.base) / 2}px;
  max-height: ${(width - sizes.padding * 2.5 - sizes.base) / 2}px;
  shadow-color: ${colors.black};
  shadow-offset: 2px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 3;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;
const BrowseBadge = styled.View`
  height: 50px;
  width: 50px;
  border-radius: 50px;
`;
