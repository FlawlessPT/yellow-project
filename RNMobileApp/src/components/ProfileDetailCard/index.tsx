import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ProfileDetail } from '@screens/Settings/types';

import Label from '@components/Label';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

const ProfileDetailCard = ({ label, description: { unit, value } }: ProfileDetail) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <View style={styles.card}>
      <Label style={styles.title} text={label} type="footnote" color={theme.colors.outline} />
      <Label text={String(value)} type="h3" medium color={theme.colors.neutral200} />
    </View>
  );
};

export default ProfileDetailCard;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      flex: 1,
      height: 82,
      borderRadius: 18,
      backgroundColor: theme.colors.neutral800,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      marginBottom: 10,
    },
  });
