import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {LinearGradient} from 'expo-linear-gradient';
import React, {useState} from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  ImageSourcePropType,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled, {css} from 'styled-components/native';

import ButtonTouchableOpacity from '../components/ButtonTouchableOpacity';
import TextTypography from '../components/TextTypography';
import {explore as exploreImages} from '../constants/mocks';
import {sizes, colors} from '../constants/theme';
import {NavigationStackParamList} from '../navigation';

type ExploreScreenNavigationProp = StackNavigationProp<
  NavigationStackParamList,
  'Explore'
>;

type ExploreScreenRouteProp = RouteProp<NavigationStackParamList, 'Explore'>;

const {width, height} = Dimensions.get('window');

interface ExploreProps {
  navigation: ExploreScreenNavigationProp;
  route: ExploreScreenRouteProp;
  exploreImages: ImageSourcePropType[];
}

const Explore: React.FC<ExploreProps> = ({
  navigation,
  route,
  exploreImages,
}) => {
  const [searchFocus, setSearchFocus] = useState(new Animated.Value(0.6));
  const [searchString, setSearchString] = useState('');
  const handleSearchFocus = (status: boolean) => {
    const animationValue = status ? 0.8 : 0.6;
    const animation = Animated.timing(searchFocus, {
      toValue: animationValue, // status === true, increase flex size
      duration: 150, // ms
    });
    setSearchFocus(new Animated.Value(animationValue));
    animation.start();
  };

  const isEditing = searchFocus && searchString;

  const mainImage = exploreImages[0];

  const renderImage = (img: ImageSourcePropType, index: number) => {
    const imgResolveSizes = Image.resolveAssetSource(img);
    const fullWidth = width - sizes.padding * 2;
    const resize = (imgResolveSizes.width * 100) / fullWidth;
    const imgWidth =
      resize > 75
        ? fullWidth - sizes.padding / 1.5
        : imgResolveSizes.width * 1.1;

    return (
      <TouchableOpacity
        key={`img-${index}`}
        onPress={() => {
          navigation.navigate('Product');
        }}>
        <ProductImg source={img} imgWidth={imgWidth} />
      </TouchableOpacity>
    );
  };
  return (
    <ExploreContainer>
      <ExploreHeader>
        <TextTypography h1 bold>
          Browse
        </TextTypography>
        <AnimatedSearchInputContainer flex={searchFocus}>
          <SearchTextInput
            placeholder="Search"
            placeholderTextColor={colors.gray2}
            onFocus={() => handleSearchFocus(true)}
            onBlur={() => handleSearchFocus(false)}
            onChangeText={(newText) => setSearchString(newText)}
            value={searchString}
          />
          <SearchIconButton onPress={() => setSearchString('')}>
            <FontAwesome
              name={isEditing ? 'close' : 'search'}
              size={sizes.base / 1.6}
              color={colors.gray2}
              style={{position: 'absolute', right: sizes.base / 1.333}}
            />
          </SearchIconButton>
        </AnimatedSearchInputContainer>
      </ExploreHeader>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollExploreContainer>
          <ProductButton
            onPress={() => {
              navigation.navigate('Product');
            }}>
            <ProductButtonImg source={mainImage} />
          </ProductButton>
          <ExploreImages>
            {exploreImages
              .slice(1)
              .map((img, index) => renderImage(img, index))}
          </ExploreImages>
        </ScrollExploreContainer>
      </ScrollView>
      <ExploreFooter
        locations={[0.5, 1]}
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.6)']}>
        <ButtonTouchableOpacity gradient>
          <TextTypography
            bold
            white
            center
            defaultStyle={css`
              width: ${width / 2.5}px;
            `}>
            Filters
          </TextTypography>
        </ButtonTouchableOpacity>
      </ExploreFooter>
    </ExploreContainer>
  );
};

Explore.defaultProps = {
  exploreImages,
};

export default Explore;

const ExploreContainer = styled.View`
  flex: 1;
  padding-horizontal: ${sizes.base * 2}px;
  padding-top: ${(sizes.base * 2) / 2}px;
  background-color: #fff;
`;

const ExploreHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(sizes.base * 2) / 2}px;
`;

interface SearchInputContainerProps {
  flex: Animated.Value;
}

const SearchInputContainer = styled.View<SearchInputContainerProps>`
  height: ${sizes.base * 2}px;
  width: ${width - sizes.base * 2}px;
  ${(props) => css`
    ${props.flex && `flex: ${props.flex}`}
  `};
`;

const AnimatedSearchInputContainer = Animated.createAnimatedComponent(
  SearchInputContainer,
);

const SearchTextInput = styled.TextInput`
  font-size: ${sizes.caption}px;
  height: ${sizes.base * 2}px;
  background-color: rgba(142, 142, 147, 0.06);
  border-color: rgba(142, 142, 147, 0.06);
  padding-left: ${sizes.base / 1.333}px;
  padding-right: ${sizes.base * 1.5}px;
`;

const SearchIconButton = styled.TouchableOpacity`
  top: 0;
  margin-vertical: 0;
  background-color: transparent;
  position: absolute;
  align-items: flex-end;
  width: ${sizes.base * 2}px;
  height: ${sizes.base * 2}px;
  top: ${sizes.base / 1.6}px;
  right: 0;
`;

const ScrollExploreContainer = styled.View`
  margin-bottom: ${height / 3}px;
`;

const ProductButton = styled.TouchableOpacity`
  min-height: 100px;
  max-height: 130px;
  max-width: ${width - sizes.padding * 2}px;
  margin-bottom: ${sizes.base}px;
  border-radius: 4px;
  min-width: ${width - sizes.padding * 2}px;
  min-height: ${width - sizes.padding * 2}px;
  background-color: red;
`;

const ProductButtonImg = styled.Image`
  min-width: ${width - sizes.padding * 2}px;
  min-height: ${width - sizes.padding * 2}px;
  border-radius: 4px;
`;

const ExploreImages = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 1px;
`;

interface ProductImgProps {
  imgWidth: number;
}

const ProductImg = styled.Image<ProductImgProps>`
  min-height: 100px;
  max-height: 130px;
  max-width: ${width - sizes.padding * 2.5}px;
  margin-bottom: ${sizes.base}px;
  border-radius: 4px;
  ${(props) => css`
    ${props.imgWidth && `min-width:${props.imgWidth}px;`}
  `}
`;

const ExploreFooter = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: visible;
  align-items: center;
  justify-content: center;
  height: ${height * 0.1}px;
  width: ${width}px;
  padding-bottom: ${sizes.base * 2.1}px;
`;
