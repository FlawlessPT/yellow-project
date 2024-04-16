// React and React Native
import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

// Theme
import { Theme } from '@theme';

// Components
import { Label } from '@components';

// Assets
import { RightArrow } from '@assets';

// External Libs
import { Icon } from 'react-native-paper';

// Hooks
import useTheme from '@hooks/theme/useTheme';

type ButtonCardProps = {
  label: string;
  icon: any;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

const ButtonCard = ({ label, icon, style, onPress }: ButtonCardProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon source={icon} size={24} />
        </View>
        <Label text={label} color={theme.colors.white} />
      </View>
      <Icon source={RightArrow} size={6} />
    </TouchableOpacity>
  );
};

export default ButtonCard;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      height: 64,
      borderRadius: 18,
      backgroundColor: theme.colors.neutral800,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 8,
      paddingRight: 20,
      alignItems: 'center',
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      backgroundColor: theme.colors.neutral700,
      width: 48,
      height: 48,
      borderRadius: 8,
      marginRight: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
