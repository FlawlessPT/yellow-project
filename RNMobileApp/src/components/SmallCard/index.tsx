import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome6';

import Label from '@components/Label';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

type SmallCardProps = {
  image: string;
  title: string;
  isSelected?: boolean;
  onPress: () => void;
};

const SmallCard = ({ image, title, isSelected = false, onPress }: SmallCardProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme, isSelected);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={1} onPress={onPress}>
      <View style={styles.container}>
        <Icon name={image} color={theme.colors.primary} size={24} />
      </View>
      <Label text={title} type="h5" medium color={theme.colors.neutral300} style={styles.label} />
    </TouchableOpacity>
  );
};

export default SmallCard;

const getStyles = (theme: Theme, isSelected: boolean) =>
  StyleSheet.create({
    card: {
      height: 170,
      width: 155,
      borderRadius: 12,
      backgroundColor: theme.colors.neutral800,
      paddingVertical: 24,
      paddingHorizontal: 16,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: isSelected ? theme.colors.primary : theme.colors.neutral800,
    },
    container: {
      width: 56,
      height: 56,
      backgroundColor: theme.colors.neutral700,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      marginTop: 24,
    },
  });
