// React and React Native
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

// Types
import { StepProps } from '../types';

// Components
import Input from '@components/Input';
import Label from '@components/Label';

// Styles
import { getStyles } from '../styles';

// Hooks
import useTheme from '@hooks/theme/useTheme';

const Age = ({ onPress }: StepProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  const [selectedAge, setSelectedAge] = useState<string>();

  useEffect(() => {
    onPress(!!selectedAge);
  }, [onPress, selectedAge]);

  return (
    <View style={styles.simpleContainer}>
      <Input
        value={selectedAge}
        placeholder="0"
        keyboardType="number-pad"
        onChangeText={setSelectedAge}
        style={styles.input}
        textStyle={styles.textInput}
        textAlign="center"
        maxLength={3}
        autoFocus
      />
      <Label text="years" color={theme.colors.neutral300} style={styles.label} />
    </View>
  );
};

export default Age;
