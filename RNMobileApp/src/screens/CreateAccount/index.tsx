// React and React Native
import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, Alert, StyleSheet, View } from 'react-native';

// Theme
import { Theme } from '@theme';

// Helpers
import { supabase } from '@utils/supabase';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// Components
import NameStep from './Steps/NameStep';
import EmailStep from './Steps/EmailStep';
import { Button, Header } from '@components';
import ContactStep from './Steps/ContactStep';
import PasswordStep from './Steps/PasswordStep';

// External Libs
import { t } from 'i18next';
import { format } from 'date-fns/format';
import { SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CreateAccount = () => {
  const totalSteps = 4;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const { control, handleSubmit } = useForm({});

  const { theme } = useTheme();

  const styles = getStyles(theme);

  async function signUpWithEmail(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dob: string,
    contact: string
  ) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'mw://signup',
        data: {
          email,
          first_name: firstName,
          last_name: lastName,
          dob,
          contact,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
    }
  }

  const renderSteps = (stepIndex: number) => {
    switch (stepIndex) {
      case 1:
        return <EmailStep control={control} />;
      case 2:
        return <PasswordStep control={control} />;
      case 3:
        return <NameStep control={control} />;
      case 4:
        return <ContactStep control={control} />;
      default:
        return <></>;
    }
  };

  const onSubmit: SubmitHandler<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    contact: string;
  }> = (data) => {
    if (currentStep === 4) {
      signUpWithEmail(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        format(new Date(data.dob), 'dd/MM/yyyy'),
        data.contact
      );
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={currentStep + ' ' + t('common.of') + ' ' + totalSteps} hasBack />
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.contentContainer}>{renderSteps(currentStep)}</View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <View style={styles.footer}>
        <Button
          text={currentStep === 4 ? 'signup_page.create_account.button' : 'common.next'}
          onPressButton={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default CreateAccount;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.neutral900,
      paddingHorizontal: 20,
      paddingVertical: 40,
    },
    contentContainer: {
      paddingTop: 8,
    },
    footer: {
      gap: 32,
    },
  });
