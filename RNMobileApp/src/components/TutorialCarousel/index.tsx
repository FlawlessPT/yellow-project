import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, ImageBackground, ImageSourcePropType } from 'react-native';

import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import RenderHTML from 'react-native-render-html';

import { AuthStackEnum, RootStackEnum } from '../../navigation/types';
import { Button, Label, LabelButton, Pagination } from '@components';

import useTheme from '@hooks/theme';

import { Theme } from '@theme';

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

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

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
            <>
              <View style={styles.pricesContainer}>
                <Label
                  text="paid_subscriptions"
                  color={theme.colors.neutral400}
                  type="footnote"
                  style={styles.subscriptionsLabel}
                />
                <LabelButton
                  text="see_prices"
                  isUnderline
                  color={theme.colors.primary}
                  type="footnote"
                  bold
                  onPress={() => navigation.navigate(AuthStackEnum.BILLING, { withBack: true })}
                />
              </View>
              <RenderHTML
                source={{ html: t('terms.conditions.title') }}
                baseStyle={styles.termsAndConditions}
                tagsStyles={{ a: styles.underline }}
                contentWidth={Dimensions.get('screen').width}
              />
            </>
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
      color: theme.colors.neutral400,
      fontSize: 12,
      textAlign: 'center',
    },
    underline: {
      color: theme.colors.primary,
      textDecorationColor: theme.colors.primary,
      fontWeight: 'bold',
    },
    pricesContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    subscriptionsLabel: {
      marginRight: 4,
    },
  });
