// React and React Native
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

// Styles
import { getStyles } from '../styles';

// Components
import { Input, SmallCard } from '@components';

// Types
import { DietType, StepProps, HandleSetTypeResult } from '../types';

// External Libs
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
