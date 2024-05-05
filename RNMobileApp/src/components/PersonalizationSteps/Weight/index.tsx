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

const Weight = ({ onPress }: StepProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  const [selectedWeight, setSelectedWeight] = useState<string>();

  useEffect(() => {
    onPress(!!selectedWeight);
  }, [onPress, selectedWeight]);

  return (
    <View style={styles.simpleContainer}>
      <Input
        value={selectedWeight}
        placeholder="0"
        keyboardType="decimal-pad"
        onChangeText={setSelectedWeight}
        style={styles.input}
        textStyle={styles.textInput}
        textAlign="center"
        maxLength={6}
        autoFocus
      />
      <Label text="kg" color={theme.colors.neutral300} style={styles.label} />
    </View>
  );
};

export default Weight;
