import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

type SwitchProps = {
  initialValue: boolean;
  shouldChangeValue: boolean;
  onPress: () => void;
};

const Switch = ({ initialValue, shouldChangeValue, onPress }: SwitchProps): JSX.Element => {
  const [isToggle, setIsToggle] = useState<boolean>(initialValue);
  const translateAnimate = useRef(new Animated.Value(0)).current;

  const styles = getStyles();

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
      duration: 400,
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
        onPress();
      }}
    >
      <Animated.View style={[styles.contentContainer, animationStyle]} />
    </TouchableOpacity>
  );
};

export default Switch;

const getStyles = () =>
  StyleSheet.create({
    container: {
      height: 24,
      width: 40,
      borderRadius: 48,
      justifyContent: 'center',
      padding: 2,
    },
    contentContainer: {
      height: 20,
      width: 20,
      borderRadius: 48,
      position: 'absolute',
      left: 4,
    },
  });
