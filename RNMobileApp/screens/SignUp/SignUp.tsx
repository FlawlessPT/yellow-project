// React and React Native
import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

// Components
import Button from '@components/Button';
import Header from '@components/Header';
import Progress from '@components/Progress';
import EmailStep from './Steps/EmailStep';
import PasswordStep from './Steps/PasswordStep';
import NameStep from './Steps/NameStep';
import DobStep from './Steps/DobStep';
import ContactStep from './Steps/ContactStep';

// Styles
import {
  ContentContainer,
  MainContainer,
  SafeArea,
  FooterContainer,
} from './styles';

// External Libs
import { useNavigation } from '@react-navigation/native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { t } from 'i18next';
import { format } from 'date-fns/format';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Helpers
import { supabase } from '@utils/supabase';

export const SignUp = function SignUp() {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const { control, handleSubmit } = useForm({});

  async function signUpWithEmail(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dob: string,
    contact: string,
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

  const renderSteps = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return <EmailStep control={control} />;
      case 2:
        return <PasswordStep control={control} />;
      case 3:
        return <NameStep control={control} />;
      case 4:
        return <DobStep control={control} />;
      case 5:
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
  }> = data => {
    if (currentStep === 5) {
      signUpWithEmail(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        format(new Date(data.dob), 'dd/MM/yyyy'),
        data.contact,
      );
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <SafeArea>
      <MainContainer>
        <Header
          pageName={t('signup_page.title')}
          onPressChevron={navigation.goBack}
        />
        <KeyboardAwareScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ContentContainer>{renderSteps(currentStep)}</ContentContainer>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>

        <FooterContainer>
          <Progress
            currentStep={currentStep}
            totalSteps={5}
            separatorText={t('common.of')}
          />
          <Button
            text={
              currentStep == 5
                ? t('signup_page.create_account.button')
                : t('common.next')
            }
            onPressButton={handleSubmit(onSubmit)}
          />
        </FooterContainer>
      </MainContainer>
    </SafeArea>
  );
};
