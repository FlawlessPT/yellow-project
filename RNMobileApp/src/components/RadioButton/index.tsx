import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

type RadioButtonProps = {
  isSelected: boolean;
  handleOnPress: () => void;
};

const RadioButton = ({ isSelected, handleOnPress }: RadioButtonProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme, isSelected);

  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress} activeOpacity={0.6}>
      <View style={styles.border} />
      <View style={styles.contentContainer} />
    </TouchableOpacity>
  );
};

export default RadioButton;

const getStyles = (theme: Theme, isSelected: boolean) =>
  StyleSheet.create({
    container: { justifyContent: 'center', alignItems: 'center' },
    border: {
      borderWidth: 2,
      borderRadius: 12,
      width: 24,
      height: 24,
      borderColor: isSelected ? theme.colors.primary : theme.colors.neutral400,
    },
    contentContainer: {
      borderRadius: 10,
      width: 16,
      height: 16,
      position: 'absolute',
      backgroundColor: isSelected ? theme.colors.primary : 'transparent',
    },
  });
