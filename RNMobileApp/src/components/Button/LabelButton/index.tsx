// React and React Native
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native';

// Components
import { Label } from '@components/Label';
import { LabelProps } from '@components/Label/types';

export type LabelButtonProps = {
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  leftIconColor?: string;
  rightIconColor?: string;
  onPress: () => void;
};

const LabelButton = ({
  leftIcon,
  rightIcon,
  leftIconColor,
  rightIconColor,
  style,
  onPress,
  ...props
}: LabelButtonProps & LabelProps) => {
  const styles = getStyles(leftIconColor ?? '', rightIconColor ?? '');

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View style={styles.container}>
        {leftIcon && <Image source={leftIcon} style={styles.icon} />}
        <Label {...props} />
        {rightIcon && <Image style={[styles.icon, styles.rightIcon]} source={rightIcon} />}
      </View>
    </TouchableOpacity>
  );
};

export default LabelButton;

const getStyles = (leftIconColor: string, rightIconColor: string) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 6,
    },
    icon: {
      height: 20,
      width: 20,
      tintColor: leftIconColor,
      marginRight: 10,
    },
    rightIcon: {
      tintColor: rightIconColor,
      marginRight: 0,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
