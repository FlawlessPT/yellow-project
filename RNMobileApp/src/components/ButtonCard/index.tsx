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
  withNoArrow?: boolean;
  isSelected?: boolean;
  label: string;
  icon?: any;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

const ButtonCard = ({ withNoArrow = false, isSelected = false, label, icon, style, onPress }: ButtonCardProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme, isSelected);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, style]} activeOpacity={1}>
      <View style={styles.container}>
        {icon && (
          <View style={styles.iconContainer}>
            <Icon source={icon} size={24} />
          </View>
        )}
        <Label text={label} color={theme.colors.white} style={styles.title} />
      </View>
      {!withNoArrow && <Icon source={RightArrow} size={6} />}
    </TouchableOpacity>
  );
};

export default ButtonCard;

const getStyles = (theme: Theme, isSelected: boolean) =>
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
      borderWidth: isSelected ? 2 : 0,
      borderColor: theme.colors.primary,
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

      alignItems: 'center',
      justifyContent: 'center',
    },
    title: { marginLeft: 24 },
  });
