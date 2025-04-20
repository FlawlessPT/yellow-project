import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import { AuthNavProps } from '../../navigation/AuthStack/types';
import { AuthStackEnum, RootStackEnum } from '../../navigation/types';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

const Splash = ({ navigation }: AuthNavProps) => {
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
      <View style={styles.background} />
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
