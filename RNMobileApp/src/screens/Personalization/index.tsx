// React and React Native
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

// Theme
import { Theme } from '@theme';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// External Libs
import { t } from 'i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { Age, ChooseGender, Height, Header, Label, Button, Weight, Diet, Workout } from '@components';

const Personalization = () => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [isContinueDisabled, setIsContinueDisabled] = useState<boolean>(true);

  const steps = [
    {
      title: 'choose_gender.title',
      component: <ChooseGender onPress={(isSelected) => setIsContinueDisabled(!isSelected)} />,
    },
    {
      title: 'select_age.title',
      component: <Age onPress={(isSelected) => setIsContinueDisabled(!isSelected)} />,
    },
    {
      title: 'select_height.title',
      component: <Height onPress={(isSelected) => setIsContinueDisabled(!isSelected)} />,
    },
    {
      title: 'select_weight.title',
      component: <Weight onPress={(isSelected) => setIsContinueDisabled(!isSelected)} />,
    },
    {
      title: 'specific_diet.title',
      component: <Diet onPress={(isSelected) => setIsContinueDisabled(!isSelected)} />,
    },
    {
      title: 'specific_workout.title',
      component: <Workout onPress={(isSelected) => setIsContinueDisabled(!isSelected)} />,
    },
  ];

  const handleMoveToNextStep = () => {
    if (selectedStep < steps.length - 1) {
      setSelectedStep(selectedStep + 1);
    }

    return;
  };

  const handleMoveToPreviousStep = () => {
    if (selectedStep > 0) {
      setSelectedStep(selectedStep - 1);
    }

    return;
  };

  const renderSteps = () => {
    return (
      <>
        <Label
          text={steps[selectedStep].title}
          type="h1"
          semibold
          color={theme.colors.neutral300}
          style={styles.title}
          textAlign="center"
        />
        {steps[selectedStep].component}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={`${t('step')} ${selectedStep + 1} ${t('of')} ${steps.length}`}
        hasBack={selectedStep > 0}
        onBack={handleMoveToPreviousStep}
      />
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView bounces={false} style={styles.contentContainer}>
          {renderSteps()}
        </ScrollView>
        <Button
          text="continue.button"
          isDisabled={isContinueDisabled}
          style={styles.continueButton}
          onPressButton={handleMoveToNextStep}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Personalization;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    keyboardView: { flex: 1 },
    title: {
      marginTop: 32,
      marginBottom: 50,
      padding: 16,
      paddingBottom: 50,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
    },
    contentContainer: { flex: 1 },
    continueButton: {
      marginBottom: 20,
    },
  });
