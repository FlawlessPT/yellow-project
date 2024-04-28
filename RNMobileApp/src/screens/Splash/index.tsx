// React and React Native
import React, { useEffect } from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';

// Theme
import { Theme } from '@theme';

// Assets
import { SplashImage } from '@assets';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// Types
import { AuthNavProps } from '../../navigation/AuthStack/types';
import { AuthStackEnum, RootStackEnum } from '../../navigation/types';

const Splash = ({ navigation }: AuthNavProps<'Splash'>) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: RootStackEnum.AUTH as never,
            params: { screen: AuthStackEnum.TUTORIAL },
          },
        ],
      });
    }, 2000);
  }, [navigation]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.background}>
        <Image source={SplashImage} />
      </View>
    </>
  );
};

export default Splash;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.black,
    },
  });
