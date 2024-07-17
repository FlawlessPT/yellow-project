// React and React Native
import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';

// Assets
import { Logout } from '@assets';

// Utils
import { supabase } from '@utils/supabase';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// External Libs
import { Session } from '@supabase/supabase-js';

// Data
import { profileButtons, profileDetailsData } from './data';

// Components
import { Button, ButtonCard, Label, Page, ProfileDetailCard } from '@components';
import { useNavigation } from '@react-navigation/native';

const Settings = ({ session }: { session?: Session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [password, setPassword] = useState('');

  const { theme } = useTheme();

  const navigation = useNavigation();

  const getProfile = useCallback(
    async function getProfile() {
      try {
        setLoading(true);
        if (!session?.user) {
          throw new Error('No user on the session!');
        }

        const { data, error, status } = await supabase
          .from('profiles')
          .select('username, first_name, last_name, avatar_url')
          .eq('id', session?.user.id)
          .single();
        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUsername(data.username);
          setFullname(`${data.first_name} ${data.last_name}`);
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
    [session?.user]
  );

  useEffect(() => {
    if (session) {
      getProfile();
    }
  }, [session, getProfile]);

  async function updateProfile({
    newUsername,
    newFirstName,
    newLastName,
    avatar_url,
    newPassword,
  }: {
    newUsername: string;
    newFirstName: string;
    newLastName: string;
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
        first_name: newFirstName,
        last_name: newLastName,
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
    <Page title="profile.title">
      <Image
        source={{
          uri: 'https://vanderluiz.com.br/wp-content/uploads/2017/08/Fundo-amarelo.jpg',
        }}
        style={styles.profileImage}
      />
      <Label
        text={'Bernardo'}
        type="h4"
        color={theme.colors.neutral300}
        semibold
        textAlign="center"
        style={styles.name}
      />
      <Label
        text={'bernardo123@hotmail.com'}
        type="footnote"
        color={theme.colors.neutral300}
        textAlign="center"
        style={styles.email}
      />
      <View style={styles.detailsContainer}>
        {profileDetailsData.map((item, index) => (
          <ProfileDetailCard key={index} {...item} />
        ))}
      </View>
      {profileButtons(navigation).map((item, index) => (
        <ButtonCard key={index} {...item} style={styles.settingsCard} />
      ))}
      <Button
        text="profile.logout_button"
        leftIcon={Logout}
        hasBorder
        borderColor={theme.colors.disabled}
        textColor={theme.colors.disabled}
        style={styles.logoutButton}
      />
    </Page>
  );
};

export default Settings;

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  settingsCard: {
    marginTop: 18,
  },
  profileImage: {
    alignSelf: 'center',
    marginBottom: 16,
    borderRadius: 62,
    width: 124,
    height: 124,
  },
  name: {
    marginBottom: 8,
  },
  email: {
    marginBottom: 32,
  },
  logoutButton: {
    marginTop: 18,
  },
});
