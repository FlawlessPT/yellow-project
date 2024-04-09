// React and React Native
import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

// Assets
import { SelectedCheckbox } from '@assets';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// External Libs
import { Icon } from 'react-native-paper';
import { DefaultTheme } from 'styled-components/native';

type CheckboxProps = {
  bgColor?: string;
  borderColor?: string;
  borderWidth?: number;
  isChecked?: boolean;
  rightElement?: React.ReactElement;
  reverseOrder?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

const Checkbox = ({
  bgColor,
  borderColor,
  borderWidth = 1,
  isChecked,
  rightElement,
  reverseOrder = false,
  style,
  onPress,
}: CheckboxProps) => {
  const { theme } = useTheme();

  const styles = getStyles(
    theme,
    reverseOrder,
    bgColor ?? theme.colors.white,
    borderWidth,
    borderColor ?? 'transparent',
  );

  return (
    <View style={styles.container}>
      {isChecked ? (
        <Pressable
          style={[styles.activeCheckboxContainer, style]}
          onPress={onPress}>
          <Icon source={SelectedCheckbox} size={9} color={theme.colors.white} />
        </Pressable>
      ) : (
        <Pressable
          style={[styles.checkboxContainer, style]}
          onPress={onPress}
        />
      )}
      {rightElement && (
        <Pressable
          style={[styles.rightElementContainer, style]}
          onPress={onPress}>
          {rightElement}
        </Pressable>
      )}
    </View>
  );
};

export default Checkbox;

const getStyles = (
  theme: DefaultTheme,
  reverseOrder: boolean,
  bgColor: string,
  borderWidth: number,
  borderColor: string,
) =>
  StyleSheet.create({
    container: {
      flexDirection: reverseOrder ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    rightElementContainer: { flex: 1 },
    activeCheckboxContainer: {
      height: 19,
      width: 19,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: 2,
      borderWidth: 0,
      marginRight: reverseOrder ? 0 : 8,
      marginLeft: reverseOrder ? 8 : 0,
    },
    checkboxContainer: {
      height: 19,
      width: 19,
      backgroundColor: bgColor,
      borderWidth,
      borderColor,
      borderRadius: 2,
      marginRight: reverseOrder ? 0 : 8,
      marginLeft: reverseOrder ? 8 : 0,
    },
  });
