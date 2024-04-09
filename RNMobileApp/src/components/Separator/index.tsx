// React and React Native
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import Label from '@components/Label';

// Theme
import useTheme from '@hooks/theme/useTheme';

type SeparatorProps = {
  text?: string;
};

export const Separator = ({ text }: SeparatorProps) => {
  const { theme } = useTheme();

  const styles = getStyles();

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Label text={text} color={theme.colors.disabled} />
      <View style={styles.line} />
    </View>
  );
};

export default Separator;

const getStyles = () =>
  StyleSheet.create({
    line: {
      flex: 1,
      height: 1,
    },
    container: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
  });
