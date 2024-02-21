// React and React Native
import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

// Helpers
import { supabase } from '@utils/supabase';

// Components
import NameStep from './Steps/NameStep';
import EmailStep from './Steps/EmailStep';
import { Button, Header } from '@components';
import ContactStep from './Steps/ContactStep';
import PasswordStep from './Steps/PasswordStep';

// Styles
import { ContentContainer, Container, FooterContainer } from './styles';

// External Libs
import { t } from 'i18next';
import { format } from 'date-fns/format';
import { SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CreateAccount = () => {
  const totalSteps = 4;

  const [currentStep, setCurrentStep] = useState<number>(1);
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
  }> = data => {
    if (currentStep === 4) {
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
    <Container>
      <Header
        title={currentStep + ' ' + t('common.of') + ' ' + totalSteps}
        hasBack
      />
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ContentContainer>{renderSteps(currentStep)}</ContentContainer>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <FooterContainer>
        <Button
          text={
            currentStep === 4
              ? 'signup_page.create_account.button'
              : 'common.next'
          }
          onPressButton={handleSubmit(onSubmit)}
        />
      </FooterContainer>
    </Container>
  );
};

export default CreateAccount;
