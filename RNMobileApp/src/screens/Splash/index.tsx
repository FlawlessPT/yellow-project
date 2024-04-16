// React and React Native
import React, { useEffect } from 'react';
import { Image, ImageBackground, StatusBar, StyleSheet, View } from 'react-native';

// Assets
import { LogoImage } from '@assets';

// Types
import { AuthNavProps } from '../../navigation/AuthStack/types';
import { AuthStackEnum, RootStackEnum } from '../../navigation/types';

const Splash = ({ navigation }: AuthNavProps<'Splash'>) => {
  const styles = getStyles();

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
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <ImageBackground source={LogoImage} style={styles.background}>
          <Image source={LogoImage} />
        </ImageBackground>
      </View>
    </>
  );
};

export default Splash;

const getStyles = () =>
  StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
    },
  });
