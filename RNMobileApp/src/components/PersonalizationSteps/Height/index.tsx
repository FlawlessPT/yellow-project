// React and React Native
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

// Types
import { StepProps } from '../types';

// Styles
import { getStyles } from '../styles';

// Components
import Input from '@components/Input';
import Label from '@components/Label';

// Hooks
import useTheme from '@hooks/theme/useTheme';

const Height = ({ onPress }: StepProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  const [selectedHeight, setSelectedHeight] = useState<string>();

  useEffect(() => {
    onPress(!!selectedHeight);
  }, [onPress, selectedHeight]);

  return (
    <View style={styles.simpleContainer}>
      <Input
        value={selectedHeight}
        placeholder="0"
        keyboardType="number-pad"
        onChangeText={setSelectedHeight}
        style={styles.input}
        textStyle={styles.textInput}
        textAlign="center"
        maxLength={3}
        autoFocus
      />
      <Label text="cm" color={theme.colors.neutral300} style={styles.label} />
    </View>
  );
};

export default Height;
