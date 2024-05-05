// React and React Native
import React from 'react';
import { StyleSheet } from 'react-native';

// Theme
import { Theme } from '@theme';

// Components
import Button from '@components/Button';

// Assets
import { SuccessLottie } from '@assets';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// External Libs
import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Types
import { AuthNavProps } from '../../navigation/AuthStack/types';
import { AppStackEnum, RootStackEnum } from '../../navigation/types';

export const Success = ({ navigation }: AuthNavProps<'Success'>) => {
  const { bottom } = useSafeAreaInsets();

  const { theme } = useTheme();

  const styles = getStyles(theme, bottom);

  const onNavigateToHome = () => {
    navigation.reset({
      routes: [
        {
          name: RootStackEnum.APP as never,
          params: { screen: AppStackEnum.HOME },
        },
      ],
    });
  };

  return (
    <Modal isVisible style={styles.container} animationIn="zoomIn">
      <Lottie autoPlay source={SuccessLottie} style={styles.lottie} />
      <Button text="continue.button" style={styles.button} onPressButton={onNavigateToHome} />
    </Modal>
  );
};

export default Success;

const getStyles = (theme: Theme, marginBottom: number) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
      margin: 0,
      paddingHorizontal: 16,
    },
    lottie: {
      flex: 1,
      width: 150,
    },
    button: {
      width: '100%',
      marginBottom,
    },
  });
