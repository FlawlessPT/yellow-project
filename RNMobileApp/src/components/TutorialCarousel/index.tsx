// React and React Native
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, ImageBackground, ImageSourcePropType } from 'react-native';

// Components
import { Button, Label } from '@components';

// Theme
import useTheme from '@hooks/theme/useTheme';

// Types
import { AuthStackEnum, RootStackEnum } from '../../navigation/types';

// External Libs
import { useNavigation } from '@react-navigation/native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

type TutorialData = {
  image: ImageSourcePropType;
  title: string;
};

type TutorialCarouselProps = {
  autoPlay?: boolean;
  loop?: boolean;
  data: TutorialData[];
};

export const TutorialCarousel: React.FC<TutorialCarouselProps> = ({ autoPlay = false, loop = false, data }) => {
  const { theme } = useTheme();

  const styles = getStyles();

  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(true);
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(0);

  const screenWidth = Dimensions.get('window').width;

  const navigation = useNavigation();

  let ref = React.useRef<ICarouselInstance>(null);
  ref = React.createRef();

  const moveToLogin = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: RootStackEnum.AUTH as never,
          params: { screen: AuthStackEnum.LOGIN },
        },
      ],
    });
  };

  useEffect(() => {
    if (ref.current?.getCurrentIndex() === 0) {
      setIsFirst(true);
    } else {
      setIsFirst(false);
    }

    if (ref.current?.getCurrentIndex() === data.length - 1) {
      setIsLast(true);
    } else {
      setIsLast(false);
    }
    setCurrentIndex(ref.current?.getCurrentIndex() || 0);
  }, [currentIndex, data.length]);

  const renderItem = ({ item, index }: { item: TutorialData; index: number }) => {
    return (
      <ImageBackground source={item.image} style={styles.backgroundImage} key={index}>
        <View style={styles.container}>
          <View style={styles.topBar} />
          <Label text={item.title} type="h1" color={theme.colors.neutral200} style={styles.title} />
          <View style={styles.paginationContainer}>
            {Array(data.length)
              .fill(0)
              .map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.pagination,
                    { backgroundColor: currentIndex === i ? theme.colors.primary : theme.colors.neutral700 },
                  ]}
                />
              ))}
          </View>
          <Button
            text={isLast ? 'Start now ->' : ''}
            backgroundColor={isLast ? undefined : 'transparent'}
            onPressButton={isLast ? moveToLogin : undefined}
          />
        </View>
      </ImageBackground>
    );
  };

  return (
    <Carousel
      key={data.length}
      width={screenWidth}
      autoPlay={autoPlay}
      loop={loop}
      data={data}
      scrollAnimationDuration={100}
      ref={ref}
      onSnapToItem={() => setCurrentIndex(ref.current?.getCurrentIndex())}
      renderItem={renderItem}
    />
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 30,
    },
    topBar: {
      flex: 1,
    },
    skipButton: {
      alignSelf: 'flex-end',
    },
    backgroundImage: {
      flex: 1,
    },
    title: {
      paddingBottom: 80,
    },
    paginationContainer: { flexDirection: 'row', justifyContent: 'center', gap: 12, paddingVertical: 20 },
    pagination: {
      height: 6,
      width: 32,
      borderRadius: 6,
    },
  });
