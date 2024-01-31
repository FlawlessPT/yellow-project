import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@utils/supabase';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { Session } from '@supabase/supabase-js';

export const Account = function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [password, setPassword] = useState('');

  const { t } = useTranslation();

  const getProfile = useCallback(
    async function getProfile() {
      try {
        setLoading(true);
        if (!session?.user) {
          throw new Error('No user on the session!');
        }

        const { data, error, status } = await supabase
          .from('profiles')
          .select('username, full_name, avatar_url')
          .eq('id', session?.user.id)
          .single();
        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUsername(data.username);
          setFullname(data.full_name);
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [session?.user],
  );

  useEffect(() => {
    if (session) {
      getProfile();
    }
  }, [session, getProfile]);

  async function updateProfile({
    newUsername,
    newFullname,
    avatar_url,
    newPassword,
  }: {
    newUsername: string;
    newFullname: string;
    avatar_url: string;
    newPassword: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) {
        throw new Error('No user on the session!');
      }

      const updates = {
        id: session?.user.id,
        username: newUsername,
        full_name: newFullname,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) {
        throw error;
      }

      if (password) {
        await supabase.auth.updateUser({
          password: newPassword,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label={t('common.email_label')}
          value={session?.user?.email}
          disabled
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label={t('common.username_label')}
          value={username || ''}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label={t('common.fullname_label')}
          value={fullname || ''}
          onChangeText={text => setFullname(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label={t('common.password_label')}
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder={t('common.password_label')}
          autoCapitalize={'none'}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : t('common.update')}
          onPress={() => {
            updateProfile({
              newUsername: username,
              newFullname: fullname,
              avatar_url: avatarUrl,
              newPassword: password,
            });
          }}
          disabled={loading}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title={t('auth.sign_out')}
          onPress={() => supabase.auth.signOut()}
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
