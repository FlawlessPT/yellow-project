// React and React Native
import React from 'react';
import { StyleSheet } from 'react-native';

// Theme
import { Theme } from '@theme';

// Components
import Label from '@components/Label';

// Assets
import { LoadingLottie } from '@assets';

// External Libs
import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';

// Hooks
import useTheme from '@hooks/theme/useTheme';

export type LoadingProps = {
  message?: string;
};

export const Loading = ({ message }: LoadingProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <Modal isVisible style={styles.container} animationIn="zoomIn">
      <Lottie autoPlay source={LoadingLottie} style={styles.lottie} />
      {/* <Label text={message} color={theme.colors.white} medium textAlign="center" /> */}
    </Modal>
  );
};

export default Loading;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
      margin: 0,
    },
    lottie: {
      flex: 1,
      width: 150,
    },
  });
