// React and React Native
import React from 'react';
import { View, StyleSheet, ImageBackground, Image, KeyboardAvoidingView, Platform } from 'react-native';

import { LoginImage, SplashImage } from '@assets';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import Label from '@components/Label';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

// Assets

type LoginContainerProps = {
  title: string;
  children?: JSX.Element;
};

const LoginContainer = ({ title, children }: LoginContainerProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 300], [220, 80], Extrapolate.CLAMP),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <ImageBackground source={LoginImage} style={styles.imageBackgroundContainer}>
          <Image source={SplashImage} style={styles.logoImage} resizeMode="contain" />
          <Label text={title} type="h3" bold color={theme.colors.neutral200} style={styles.loginTitle} />
          <Label text="login_page.subtitle" type="h5" color={theme.colors.light_grey} />
        </ImageBackground>
      </Animated.View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardContainer}>
        <Animated.ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          bounces={false}
        >
          {children}
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginContainer;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.black,
    },
    imageBackgroundContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoImage: {
      height: 50,
    },
    loginTitle: {
      marginBottom: 8,
      marginTop: 16,
    },
    contentContainer: { flex: 1, paddingHorizontal: 20, paddingVertical: 20, backgroundColor: theme.colors.background },
    keyboardContainer: {
      flex: 1,
    },
  });
