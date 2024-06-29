import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { getStyles } from '../styles';
import { DietType, StepProps, HandleSetTypeResult } from '../types';
import Input from '@components/Input';
import SmallCard from '@components/SmallCard';

const Diet = ({ onPress }: StepProps) => {
  const [selectedDiet, setSelectedDiet] = useState<DietType>();
  const [dietDescription, setDietDescription] = useState<string>();

  const styles = getStyles();

  useEffect(() => {
    onPress(!!selectedDiet && !!dietDescription);
  }, [dietDescription, onPress, selectedDiet]);

  const handleSetDietType = (dietType: DietType): HandleSetTypeResult => {
    return {
      isSelected: selectedDiet === dietType,
      onPress: () => setSelectedDiet(dietType),
    };
  };

  return (
    <KeyboardAwareScrollView style={styles.scrollview}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <SmallCard image="leaf" title="vegan" {...handleSetDietType(DietType.VEGAN)} />
          <SmallCard image="egg" title="vegetarian" {...handleSetDietType(DietType.VEGETARIAN)} />
        </View>
        <View style={styles.contentContainer}>
          <SmallCard image="burger" title="traditional" {...handleSetDietType(DietType.TRADITIONAL)} />
          <SmallCard image="bread-slice" title="other" {...handleSetDietType(DietType.OTHER)} />
        </View>
        <Input
          value={dietDescription}
          multiline
          textStyle={styles.inputHeight}
          style={styles.inputContainer}
          placeholder="your_diet.input"
          onChangeText={setDietDescription}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Diet;
