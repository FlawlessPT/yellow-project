import React from 'react';
import { StyleSheet, View } from 'react-native';

import Label from '@components/Label';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

type ProfileDetailCardProps = {
  label: string;
  value: string;
};

const ProfileDetailCard = ({ label, value }: ProfileDetailCardProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <View style={styles.card}>
      <Label style={styles.title} text={label} type="footnote" color={theme.colors.outline} />
      <Label text={value} type="h3" medium color={theme.colors.neutral200} />
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
