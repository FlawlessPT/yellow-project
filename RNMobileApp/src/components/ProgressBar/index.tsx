import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import Label from '@components/Label';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

type ProgressBarProps = {
  title?: string;
  progress: number;
  style?: StyleProp<ViewStyle>;
};

const ProgressBar = ({ title, progress, style }: ProgressBarProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme, progress);

  return (
    <View style={style}>
      <Label text={title} type="footnote" color={theme.colors.neutral300} medium />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={[styles.progressBar, styles.completedBar]} />
          <View style={[styles.progressBar, styles.primaryBar]} />
        </View>
        <Label text={progress.toString()} type="h2" color={theme.colors.neutral300} bold style={styles.progressLabel} />
        <Label text={'%'} type="footnote" color={theme.colors.neutral300} medium style={styles.percentageLabel} />
      </View>
    </View>
  );
};

export default ProgressBar;

const getStyles = (theme: Theme, progressWidth: number) =>
  StyleSheet.create({
    contentContainer: {
      height: 14,
      flex: 1,
    },
    progressBar: {
      height: '100%',
      position: 'absolute',
      borderRadius: 100,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    progressLabel: {
      marginLeft: 24,
    },
    percentageLabel: { marginLeft: 4 },
    completedBar: {
      backgroundColor: theme.colors.neutral700,
      width: '100%',
    },
    primaryBar: {
      width: `${progressWidth}%`,
      backgroundColor: theme.colors.primary,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.43,
      shadowRadius: 100,
      elevation: 15,
    },
  });
