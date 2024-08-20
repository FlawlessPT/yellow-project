import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

type SwitchProps = {
  initialValue: boolean;
  shouldChangeValue: boolean;
  onPress?: () => void;
};

const Switch = ({ initialValue, shouldChangeValue, onPress }: SwitchProps): JSX.Element => {
  const [isToggle, setIsToggle] = useState<boolean>(initialValue);
  const translateAnimate = useRef(new Animated.Value(0)).current;

  const { theme } = useTheme();

  const styles = getStyles(theme, isToggle);

  useEffect(() => {
    setIsToggle(initialValue);
  }, [initialValue]);

  const animateInterpolate = translateAnimate.interpolate({
    inputRange: [0, 1],
    outputRange: [initialValue ? 14 : 0, initialValue ? 0 : 14],
  });

  const animateElement = () => {
    const toValue = isToggle ? 0 : 1;

    Animated.timing(translateAnimate, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsToggle(!isToggle);
    });
  };

  const animationStyle = {
    transform: [
      {
        translateX: animateInterpolate,
      },
    ],
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => {
        if (shouldChangeValue) {
          animateElement();
          setIsToggle((prevState) => !prevState);
        }

        if (onPress) onPress();
      }}
    >
      <Animated.View style={[styles.contentContainer, animationStyle]} />
    </TouchableOpacity>
  );
};

export default Switch;

const getStyles = (theme: Theme, isToggle: boolean) =>
  StyleSheet.create({
    container: {
      height: 14,
      width: 34,
      borderRadius: 48,
      justifyContent: 'center',
      backgroundColor: theme.colors.mediumBlack,
      padding: 2,
    },
    contentContainer: {
      height: 20,
      width: 20,
      borderRadius: 48,
      position: 'absolute',
      backgroundColor: isToggle ? theme.colors.primary : theme.colors.black,
      left: 4,
      borderWidth: 0.5,
      borderColor: theme.colors.mediumBlack,
    },
  });
