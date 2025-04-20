import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Label from '@components/Label';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

type SelectableValueCardProps = {
  key: number;
  value: number;
  isSelected: boolean;
  onPress: () => void;
};

const SelectableValueCard = ({ key, value, isSelected, onPress }: SelectableValueCardProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <TouchableOpacity key={key} style={[styles.button, isSelected && styles.selectedButton]} onPress={onPress}>
      <Label color={isSelected ? theme.colors.neutral900 : theme.colors.neutral400}>{value}</Label>
    </TouchableOpacity>
  );
};

export default SelectableValueCard;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '#333',
    },
    selectedButton: {
      backgroundColor: theme.colors.primary,
    },
  });
