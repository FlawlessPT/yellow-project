import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { t } from 'i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthNavProps } from '../../navigation/AuthStack/types';
import {
  ChooseGender,
  Height,
  Header,
  Label,
  Button,
  Weight,
  Diet,
  Workout,
  UploadPhotos,
  Birthday,
} from '@components';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

const Personalization = ({ navigation }: AuthNavProps<'Personalization'>) => {
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
      title: 'your_birthday.title',
      component: <Birthday onPress={(isSelected) => setIsContinueDisabled(!isSelected)} />,
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
      title: 'upload_appearance.title',
      component: <UploadPhotos onPress={(isSelected) => setIsContinueDisabled(!isSelected)} />,
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
    } else {
      return;
      // navigation.reset({
      //   routes: [
      //     {
      //       name: RootStackEnum.APP as never,
      //       params: { screen: AppStackEnum.HOME },
      //     },
      //   ],
      // });
    }
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
          type="h2"
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
        <View style={styles.contentContainer}>{renderSteps()}</View>
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
      marginTop: 8,
      marginBottom: 12,
      padding: 16,
      paddingBottom: 20,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
    },
    contentContainer: { flex: 1 },
    continueButton: {
      marginVertical: 16,
    },
  });
