import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Image, Linking, StyleSheet, View } from 'react-native';

import { Logout, MessagesIcon } from '@assets';
import { useNavigation } from '@react-navigation/native';
import { Session } from '@supabase/supabase-js';

import { Button, ButtonCard, Label, Page, ProfileDetailCard } from '@components';

import { profileButtons, profileDetailsData } from './data';
import useTheme from '@hooks/theme/useTheme';

import { supabase } from '@utils/supabase';

import { Theme } from '@theme';

const Settings = ({ session }: { session?: Session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [password, setPassword] = useState('');

  const { theme } = useTheme();

  const navigation = useNavigation();

  const styles = getStyles(theme);

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
          uri: 'https://yt3.googleusercontent.com/FGt4GTQg6dLcG3LNdNkA7nrZclWW4ygQ3VIMAseGZcaZsA-bZG85T_D-OszmgM0mztduC4RQpA=s900-c-k-c0x00ffffff-no-rj',
        }}
        style={styles.profileImage}
      />
      <Label
        text={'PINGO DOCE'}
        type="h4"
        color={theme.colors.neutral300}
        semibold
        textAlign="center"
        style={styles.name}
      />
      <Label
        text={'pingodoce123@hotmail.com'}
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
        text="Need Something?"
        activeOpacity={0.8}
        leftIcon={MessagesIcon}
        backgroundColor={theme.colors.primary}
        textColor={theme.colors.black}
        style={styles.messageButton}
        onPress={() => Linking.openURL('whatsapp://send?text=hello&phone=+351918254361')}
      />
      <Button
        text="Logout"
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

const getStyles = (theme: Theme) =>
  StyleSheet.create({
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
      width: 202,
      alignSelf: 'center',
    },
    messageButton: {
      marginVertical: 18,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      width: 258,
      alignSelf: 'center',
    },
  });
