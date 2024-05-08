// React and React Native
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, ImageBackground, ImageSourcePropType } from 'react-native';

// Theme
import { Theme } from '@theme';

// Theme
import useTheme from '@hooks/theme/useTheme';

// Components
import { Button, Label, Pagination } from '@components';

// Types
import { AuthStackEnum, RootStackEnum } from '../../navigation/types';

// External Libs
import { t } from 'i18next';
import RenderHTML from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

type TutorialData = {
  image: ImageSourcePropType;
  title: string;
  subtitle?: string;
};

type TutorialCarouselProps = {
  autoPlay?: boolean;
  loop?: boolean;
  data: TutorialData[];
};

export const TutorialCarousel = ({ autoPlay = false, loop = false, data }: TutorialCarouselProps) => {
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { theme } = useTheme();

  const styles = getStyles(theme);

  const screenWidth = Dimensions.get('window').width;

  const navigation = useNavigation();

  const ref = React.createRef<ICarouselInstance>();

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
  }, [currentIndex, data.length, ref]);

  const renderItem = ({ item, index }: { item: TutorialData; index: number }) => {
    return (
      <ImageBackground source={item.image} style={styles.backgroundImage} key={index}>
        <View style={styles.container}>
          <View style={styles.topBar} />
          <Label
            text={item.title}
            type="h1"
            color={theme.colors.neutral200}
            style={styles.title}
            textAlign="center"
            bold
          />
          {item.subtitle && (
            <Label
              text={item.subtitle}
              type="h5"
              color={theme.colors.neutral200}
              style={styles.title}
              textAlign="center"
            />
          )}
          {isLast && (
            <Button
              text="Start now ->"
              textColor={theme.colors.neutral900}
              bold
              onPressButton={moveToLogin}
              style={styles.startNowButton}
            />
          )}
          <Pagination length={data.length} currentIndex={currentIndex} />
          {isLast && (
            <RenderHTML
              source={{ html: t('terms.conditions.title') }}
              baseStyle={styles.termsAndConditions}
              tagsStyles={{ a: styles.underline }}
              contentWidth={Dimensions.get('screen').width}
            />
          )}
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
      onSnapToItem={() => setCurrentIndex(ref.current?.getCurrentIndex() ?? 0)}
      renderItem={renderItem}
    />
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    contentContainer: {
      width: 56,
      height: 56,
      backgroundColor: theme.colors.neutral700,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
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
      paddingBottom: 24,
    },
    startNowButton: {
      width: 189,
      alignSelf: 'center',
    },
    termsAndConditions: {
      marginTop: 32,
      paddingBottom: 24,
      fontFamily: theme.fonts.regular,
      color: theme.colors.white,
      fontSize: 12,
      textAlign: 'center',
    },
    underline: {
      color: theme.colors.primary,
      textDecorationColor: theme.colors.primary,
      fontWeight: 'bold',
    },
  });
