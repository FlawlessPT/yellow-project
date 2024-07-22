import React from 'react';
import { StyleSheet } from 'react-native';

import { LoadingLottie } from '@assets';
import Lottie from 'lottie-react-native';
import Modal from 'react-native-modal';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

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
