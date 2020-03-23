import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import React, {useState} from 'react';

import Block from './components/Block';
import Navigation from './navigation';

// import all used images
const images = [
  require('./assets/icons/back.png'),
  require('./assets/icons/fertilizers.png'),
  require('./assets/icons/flowers.png'),
  require('./assets/icons/plants.png'),
  require('./assets/icons/pots.png'),
  require('./assets/icons/seeds.png'),
  require('./assets/icons/sprayers.png'),
  require('./assets/images/avatar.png'),
  require('./assets/images/explore_1.png'),
  require('./assets/images/explore_2.png'),
  require('./assets/images/explore_3.png'),
  require('./assets/images/explore_4.png'),
  require('./assets/images/explore_5.png'),
  require('./assets/images/explore_6.png'),
  require('./assets/images/illustration_1.png'),
  require('./assets/images/illustration_2.png'),
  require('./assets/images/illustration_3.png'),
  require('./assets/images/plants_1.png'),
  require('./assets/images/plants_2.png'),
  require('./assets/images/plants_3.png'),
];

const App = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const handleResourcesAsync = async () => {
    await Promise.all(
      images.map(async (image) => {
        const cacheImage = await Asset.fromModule(image).downloadAsync();
        return cacheImage;
      }),
    );
  };
  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={handleResourcesAsync}
        onError={(error) => console.warn(error)}
        onFinish={() => setIsLoadingComplete(true)}
      />
    );
  }

  return (
    <Block>
      <Navigation />
    </Block>
  );
};
export default App;
