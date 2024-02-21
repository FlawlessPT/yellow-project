// React and React Native
import React from 'react';

// Components
import Label from '../Label';

// Styles
import { MainContainer } from './styles';

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

  return (
    <MainContainer>
      <Label
        text={currentStep + ' ' + t(separatorText) + ' ' + totalSteps}
        textAlign="right"
      />
      <ProgressBar
        progress={currentStep / totalSteps}
        color={theme.colors.primary}
      />
    </MainContainer>
  );
};

export default Progress;
