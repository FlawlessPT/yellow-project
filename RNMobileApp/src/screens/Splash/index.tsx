// React and React Native
import React, { useEffect } from 'react';
import { Image, StatusBar } from 'react-native';

// Assets
import { LogoImage } from '@assets';

// Styles
import { BackgroundImage, Container } from './styles';

// Types
import { AuthNavProps } from '../../navigation/AuthStack/types';
import { AuthStackEnum, RootStackEnum } from '../../navigation/types';

const Splash = ({ navigation }: AuthNavProps<'Splash'>) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: RootStackEnum.AUTH as never,
            params: { screen: AuthStackEnum.LOGIN },
          },
        ],
      });
    }, 2000);
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Container>
        <BackgroundImage source={LogoImage}>
          <Image source={LogoImage} />
        </BackgroundImage>
      </Container>
    </>
  );
};

export default Splash;
