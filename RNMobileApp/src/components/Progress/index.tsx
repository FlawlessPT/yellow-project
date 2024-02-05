// React and React Native
import React from 'react';

// Components
import Label from '../Label';

// Theme
import useTheme from '@hooks/theme/useTheme';

// External Libs
import { ProgressBar } from 'react-native-paper';

// Styles
import { LabelContainer, MainContainer, progressBarStyle } from './styles';

export interface ProgressProps {
  currentStep: number;
  totalSteps: number;
  separatorText: string;
}

export const Progress = ({
  currentStep,
  totalSteps,
  separatorText,
}: ProgressProps) => {
  const { theme } = useTheme();

  return (
    <MainContainer>
      <LabelContainer>
        <Label text={currentStep + ' ' + separatorText + ' ' + totalSteps} />
      </LabelContainer>
      <ProgressBar
        progress={currentStep / totalSteps}
        color={theme.colors.primary}
        style={progressBarStyle}
      />
    </MainContainer>
  );
};

export default Progress;
