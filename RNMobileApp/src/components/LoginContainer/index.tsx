// React and React Native
import React from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';

// Theme
import { Theme } from '@theme';

// Components
import { Label } from '@components';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// Assets
import { LoginImage, SplashImage } from '@assets';

type LoginContainerProps = {
  title: string;
  children?: JSX.Element;
};

const LoginContainer = ({ title, children }: LoginContainerProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <ImageBackground source={LoginImage} style={styles.imageBackgroundContainer}>
        <Image source={SplashImage} style={styles.logoImage} resizeMode="contain" />
        <Label text={title} type="h3" bold color={theme.colors.neutral200} style={styles.loginTitle} />
        <Label text="login_page.subtitle" type="h5" color={theme.colors.light_grey} />
      </ImageBackground>
      {children}
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
  });
