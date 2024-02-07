// React and React Native
import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

// Styles
import { Container, InnerContainer } from './styles';

type SwitchProps = {
  initialValue: boolean;
  shouldChangeValue: boolean;
  onPress: () => void;
};

const Switch = ({
  initialValue,
  shouldChangeValue,
  onPress,
}: SwitchProps): JSX.Element => {
  const [isToggle, setIsToggle] = useState<boolean>(initialValue);
  const translateAnimate = useRef(new Animated.Value(0)).current;

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
    <Container
      activeOpacity={1}
      isEnabled={isToggle}
      onPress={() => {
        if (shouldChangeValue) {
          animateElement();
          setIsToggle(prevState => !prevState);
        }
        onPress();
      }}>
      <InnerContainer style={animationStyle} isEnabled={isToggle} />
    </Container>
  );
};

export default Switch;
