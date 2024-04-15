// React and React Native
import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';

// Theme
import { Theme } from '@theme';

// External Libs
import { Icon } from 'react-native-paper';

// Utils
import { supabase } from '@utils/supabase';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// External Libs
import { Session } from '@supabase/supabase-js';

// Assets
import { Logout, NotificationsHeader } from '@assets';

// Data
import { profileButtons, profileDetailsData } from './data';

// Components
import { Button, ButtonCard, Label, ProfileDetailCard } from '@components';

const Account = ({ session }: { session?: Session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [password, setPassword] = useState('');

  const { theme } = useTheme();

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
    [session?.user]
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
      <View style={styles.header}>
        <Label text="profile.title" type="h2" color={theme.colors.neutral200} />
        <Icon source={NotificationsHeader} size={20} />
      </View>
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
        {profileDetailsData.map((item) => (
          <ProfileDetailCard {...item} />
        ))}
      </View>
      {profileButtons.map((item) => (
        <ButtonCard {...item} style={styles.settingsCard} />
      ))}
      <Button
        text="profile.logout_button"
        leftIcon={Logout}
        hasBorder
        borderColor={theme.colors.disabled}
        textColor={theme.colors.disabled}
        style={styles.logoutButton}
      />
    </View>
    // <View style={styles.container}>
    //   <View style={[styles.verticallySpaced, styles.mt20]}>
    //     <Input
    //       label={'common.email_label'}
    //       value={session?.user?.email}
    //       disabled
    //     />
    //   </View>
    //   <View style={styles.verticallySpaced}>
    //     <Input
    //       label={'common.username_label'}
    //       value={username || ''}
    //       onChangeText={text => setUsername(text)}
    //     />
    //   </View>
    //   <View style={styles.verticallySpaced}>
    //     <Input
    //       label={'common.fullname_label'}
    //       value={fullname || ''}
    //       onChangeText={text => setFullname(text)}
    //     />
    //   </View>
    //   <View style={styles.verticallySpaced}>
    //     <Input
    //       label={'common.password_label'}
    //       leftIcon={{ type: 'font-awesome', name: 'lock' }}
    //       onChangeText={text => setPassword(text)}
    //       value={password}
    //       secureTextEntry={true}
    //       placeholder={'common.password_label'}
    //       autoCapitalize={'none'}
    //     />
    //   </View>

    //   <View style={[styles.verticallySpaced, styles.mt20]}>
    //     <Button
    //       title={loading ? 'Loading ...' : 'common.update'}
    //       onPress={() => {
    //         updateProfile({
    //           newUsername: username,
    //           newFullname: fullname,
    //           avatar_url: avatarUrl,
    //           newPassword: password,
    //         });
    //       }}
    //       disabled={loading}
    //     />
    //   </View>
    //   <View style={styles.verticallySpaced}>
    //     <Button
    //       title={'auth.sign_out'}
    //       onPress={() => supabase.auth.signOut()}
    //     />
    //   </View>
    // </View>
  );
};

export default Account;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 24,
    },
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
      marginBottom: 28,
    },
  });
