import React from 'react';
import { StyleSheet, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome6';

import useTheme from '../../hooks/theme/useTheme';
import Label from '@components/Label';
import { LabelProps } from '@components/Label/types';

import { Theme } from '@theme';

type CheckContainerProps = {
  label?: string;
} & LabelProps;

const CheckContainer = ({ label, ...props }: CheckContainerProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Icon name="check" size={24} color={theme.colors.primary} />
      </View>
      {label && <Label text={label} color={theme.colors.neutral200} semibold {...props} />}
    </View>
  );
};

export default CheckContainer;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    contentContainer: {
      width: 40,
      height: 40,
      backgroundColor: theme.colors.primary,
      opacity: 0.1,
      borderRadius: 47,
      marginRight: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
