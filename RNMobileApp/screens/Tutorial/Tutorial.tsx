import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  TutorialCarousel,
  TutorialData,
} from '../../components/TutorialCarousel';
import {useNavigation} from '@react-navigation/native';

export const Tutorial = function Tutorial() {
  const navigation = useNavigation();

  const data: TutorialData[] = [
    {
      title: 'Lorem ipsum 1',
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus malesuada viverra commodo ut. Consequat, risus proin elit eleifend sed tellus et malesuada. Sed ut id ac venenatis sed blandit. Tellus.',
      source: require('../../assets/mobiweb-logo.png'),
    },
    {
      title: 'Lorem ipsum 2',
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus malesuada viverra commodo ut. Consequat, risus proin elit eleifend sed tellus et malesuada. Sed ut id ac venenatis sed blandit. Tellus.',
      source: 'https://mobiweb.pt/public/images/work/mvq-1.jpg',
    },
    {
      title: 'Lorem ipsum 3',
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus malesuada viverra commodo ut. Consequat, risus proin elit eleifend sed tellus et malesuada. Sed ut id ac venenatis sed blandit. Tellus.',
      source: 'https://mobiweb.pt/public/images/work/moomenti-2@2x.jpg',
    },
    {
      title: 'Lorem ipsum 4',
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus malesuada viverra commodo ut. Consequat, risus proin elit eleifend sed tellus et malesuada. Sed ut id ac venenatis sed blandit. Tellus.',
      source: 'https://mobiweb.pt/public/images/work/sky-7@2x.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      <TutorialCarousel
        data={data}
        getStartedButtonAction={navigation.goBack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
