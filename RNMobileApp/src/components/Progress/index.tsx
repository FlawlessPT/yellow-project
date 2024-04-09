// React and React Native
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import Label from '../Label';

// Theme
import useTheme from '@hooks/theme/useTheme';

// External Libs
import { t } from 'i18next';
import { ProgressBar } from 'react-native-paper';

export type ProgressProps = {
  currentStep: number;
  totalSteps: number;
  separatorText?: string;
};

export const Progress = ({
  currentStep,
  totalSteps,
  separatorText = 'common.of',
}: ProgressProps) => {
  const { theme } = useTheme();

  const styles = getStyles();

  return (
    <View style={styles.container}>
      <Label
        text={currentStep + ' ' + t(separatorText) + ' ' + totalSteps}
        textAlign="right"
      />
      <ProgressBar
        progress={currentStep / totalSteps}
        color={theme.colors.primary}
      />
    </View>
  );
};

export default Progress;

const getStyles = () =>
  StyleSheet.create({
    container: {
      height: 40,
      gap: 8,
      justifyContent: 'center',
    },
  });
