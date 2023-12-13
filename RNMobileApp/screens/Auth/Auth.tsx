import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {supabase} from '@utils/supabase';
import {Button, Input} from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import {useNavigation} from '@react-navigation/native';
import {NoneAuthenticatedStackScreenPropsGeneric} from '../../types';
import {useFeatureFlag} from '@utils/contexts';
import InAppReview from 'react-native-in-app-review';

export const Auth = function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const {t} = useTranslation();
  const gitHubSignInFeatureFlag = useFeatureFlag({
    featureFlagKey: 'GITHUB_SIGN_IN',
  });

  const navigation =
    useNavigation<
      NoneAuthenticatedStackScreenPropsGeneric<'Auth'>['navigation']
    >();

  async function signInWithEmail() {
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {error} = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'mw://signup',
        data: {
          email,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  async function forgotPassword() {
    setLoading(true);

    const {error} = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'mw://recoverpassword',
    });

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  async function gitHubSignIn() {
    const {error, data} = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'mw://signin/github',
      },
    });

    if (data.url) {
      WebBrowser.openBrowserAsync(data.url);
    }

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  async function googleSignIn() {
    const {error, data} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'mw://signin/google',
      },
    });

    if (data.url) {
      WebBrowser.openBrowserAsync(data.url);
    }

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }
  const askInAppReview = () => {
    InAppReview.RequestInAppReview()
      .then(hasFlowFinishedSuccessfully => {
        console.log('InAppReview in android', hasFlowFinishedSuccessfully);
        console.log(
          'InAppReview in ios has launched successfully',
          hasFlowFinishedSuccessfully,
        );

        if (hasFlowFinishedSuccessfully) {
          console.log('user finished or close review flow');
        }

        // for android:
        // The flow has finished. The API does not indicate whether the user
        // reviewed or not, or even whether the review dialog was shown. Thus, no
        // matter the result, we continue our app flow.

        // for ios
        // the flow lanuched successfully, The API does not indicate whether the user
        // reviewed or not, or he/she closed flow yet as android, Thus, no
        // matter the result, we continue our app flow.
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label={t('common.email_label')}
          leftIcon={{type: 'font-awesome', name: 'envelope'}}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label={t('common.password_label')}
          leftIcon={{type: 'font-awesome', name: 'lock'}}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder={t('common.password_label')}
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={t('auth.sign_in')}
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title={t('auth.sign_up')}
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
      {gitHubSignInFeatureFlag.isActive && (
        <View style={styles.verticallySpaced}>
          <Button
            title={t('auth.sign_in_github')}
            disabled={loading}
            onPress={() => gitHubSignIn()}
          />
        </View>
      )}
      <View style={styles.verticallySpaced}>
        <Button
          title={t('auth.sign_in_google')}
          disabled={loading}
          onPress={() => googleSignIn()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title={t('auth.forgot_password')}
          disabled={loading}
          onPress={() => forgotPassword()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title={t('auth.terms_and_conditions')}
          disabled={loading}
          onPress={() => navigation.navigate('TermsAndConditions')}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title={t('auth.privacy_policy')}
          disabled={loading}
          onPress={() => navigation.navigate('PrivacyPolicy')}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title={t('auth.rating_popup')}
          disabled={loading}
          onPress={() => askInAppReview()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title={t('auth.tutorial')}
          disabled={loading}
          onPress={() => navigation.navigate('Tutorial')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
