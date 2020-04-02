import {NavigationStackParamList} from 'navigation';

import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import {mocks} from '../constants';
import {sizes, colors} from '../constants/theme';

type ProductScreenNavigationProp = StackNavigationProp<
  NavigationStackParamList,
  'Product'
>;

interface ProductProps {
  id: number;
  name: string;
  description: string;
  tags: string[];
  images: any[];
}

interface SignupProps {
  navigation: ProductScreenNavigationProp;
  product: ProductProps;
}

const {width, height} = Dimensions.get('window');

const Product: React.FC<SignupProps> = ({navigation, product}) => {
  return (
    <ProductScrollView showsVerticalScrollIndicator={false}>
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        data={product.images}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}) => (
          <ProductImage source={item} resizeMode="cover" />
        )}
      />
      <ProductDataContainer>
        <ProductName>{product.name}</ProductName>
        <ProductTags>
          {product.tags.map((tag) => (
            <ProductTag key={`tag-${tag}`}>{tag}</ProductTag>
          ))}
        </ProductTags>
        <ProductDescription>{product.description}</ProductDescription>
        <Divider />
        <GalleryHeader>Gallery</GalleryHeader>
        <GalleryImages>
          {product.images.slice(1, 3).map((image, index) => (
            <GalleryImage key={`gallery-${index}`} source={image} />
          ))}
          <GalleryMoreContainer>
            <GalleryMoreCount>
              +{product.images.slice(3).length}
            </GalleryMoreCount>
          </GalleryMoreContainer>
        </GalleryImages>
      </ProductDataContainer>
    </ProductScrollView>
  );
};

Product.defaultProps = {
  product: mocks.products[0],
};

export default Product;

const ProductScrollView = styled.ScrollView`
  flex: 1;
  padding-top: ${sizes.base / 2}px;
  background-color: #fff;
`;

const ProductImage = styled.Image`
  width: ${width}px;
  height: ${height / 2.8}px;
`;

const ProductDataContainer = styled.View`
  padding-horizontal: ${sizes.base * 2}px;
  padding-vertical: ${sizes.padding}px;
`;

const ProductName = styled.Text`
  font-weight: bold;
  font-size: ${sizes.h2}px;
`;

const ProductTags = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-vertical: ${sizes.base / 2}px;
  margin-right: ${sizes.base}px;
`;

const ProductTag = styled.Text`
  border-color: ${colors.gray2};
  border-width: ${StyleSheet.hairlineWidth}px;
  border-radius: ${sizes.base}px;
  padding-horizontal: ${sizes.base}px;
  padding-vertical: ${sizes.base / 2.5}px;
  margin-right: ${sizes.base * 0.625}px;
  font-size: ${sizes.caption}px;
  color: ${colors.gray};
`;

const ProductDescription = styled.Text`
  line-height: 22px;
  color: ${colors.gray};
  font-weight: 200;
`;

const Divider = styled.View`
  height: 0;
  margin-vertical: ${sizes.base * 1.1}px;
  border-bottom-color: ${colors.gray2};
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  background-color: ${colors.gray2};
`;

const GalleryHeader = styled.Text`
  font-weight: 700;
  margin-bottom: ${sizes.base * 1.1}px;
  font-size: 16px;
`;

const GalleryImages = styled.View`
  flex-direction: row;
`;

const GalleryImage = styled.Image`
  width: ${width / 3.26}px;
  height: ${width / 3.26}px;
  margin-right: ${sizes.base}px;
`;

const GalleryMoreContainer = styled.View`
  border-radius: ${sizes.radius}px;
  justify-content: center;
  align-items: center;
  background-color: rgba(197, 204, 214, 0.2);
  width: 55px;
  height: 55px;
`;

const GalleryMoreCount = styled.Text`
  color: ${colors.gray};
`;
