import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {supabase} from '../lib/supabase';
import {Button, Input} from 'react-native-elements';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
      /* TODO: this can not be hard coded -- should be configurable */
      /* Here we are using a route configured at BackofficeCMS App -- but for a mobile app a deep link could for more sense */
      /* TO BE TESTED in the future */
      redirectTo: '/account/update-password',
    });

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{type: 'font-awesome', name: 'envelope'}}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{type: 'font-awesome', name: 'lock'}}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Forgot password"
          disabled={loading}
          onPress={() => forgotPassword()}
        />
      </View>
    </View>
  );
}

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
