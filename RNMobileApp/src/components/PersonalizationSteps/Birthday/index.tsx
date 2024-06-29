import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

import { getStyles } from '../styles';
import { Birthday as BirthdayType, StepProps } from '../types';
import Input from '@components/Input';
import Label from '@components/Label';

import useTheme from '@hooks/theme/useTheme';

const Birthday = ({ onPress }: StepProps) => {
  const dayRef = useRef<TextInput>(null);
  const monthRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);

  const { theme } = useTheme();

  const styles = getStyles(theme);

  const [selectedAge, setSelectedAge] = useState<BirthdayType>({ day: '', month: '', year: '' });

  useEffect(() => {
    onPress(!!(selectedAge.day && selectedAge.month && selectedAge.year));
  }, [onPress, selectedAge]);

  return (
    <>
      <View style={styles.simpleContainer}>
        <Input
          ref={dayRef}
          value={selectedAge.day}
          placeholder="00"
          keyboardType="number-pad"
          onChangeText={(value) => {
            setSelectedAge((prevState) => ({ ...prevState, day: value }));
            if (value.length === 2) {
              monthRef.current?.focus();
            }
          }}
          style={styles.birthdayInput}
          textStyle={styles.textInput}
          textAlign="center"
          maxLength={2}
          autoFocus
        />
        <Label text="/" color={theme.colors.white} type="h2" style={styles.slashLabel} />
        <Input
          ref={monthRef}
          value={selectedAge.month}
          placeholder="00"
          keyboardType="number-pad"
          onChangeText={(value) => {
            setSelectedAge((prevState) => ({ ...prevState, month: value }));
            if (value.length === 2) {
              yearRef.current?.focus();
            }
          }}
          style={styles.birthdayInput}
          textStyle={styles.textInput}
          textAlign="center"
          maxLength={2}
        />
        <Label text="/" color={theme.colors.white} type="h2" style={styles.slashLabel} />
        <Input
          ref={yearRef}
          value={selectedAge.year}
          placeholder="0000"
          keyboardType="number-pad"
          onChangeText={(value) => {
            setSelectedAge((prevState) => ({ ...prevState, year: value }));
            if (value.length === 4) {
              yearRef.current?.blur();
            }
          }}
          style={styles.input}
          textStyle={styles.textInput}
          textAlign="center"
          maxLength={4}
        />
      </View>
      <Label
        text="DAY / MONTH / YEAR"
        color={theme.colors.white}
        type="footnote"
        textAlign="center"
        style={styles.bottomLabel}
      />
    </>
  );
};

export default Birthday;
