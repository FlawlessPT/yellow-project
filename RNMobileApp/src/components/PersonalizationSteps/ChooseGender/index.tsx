// React and React Native
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

// Types
import { genderCards } from '../types';
import { StepProps } from '../types';

// Components
import { ButtonCard } from '@components';

const ChooseGender = ({ onPress }: StepProps) => {
  const [selectedCard, setSelectedCard] = useState<number>();

  useEffect(() => {
    onPress(!!selectedCard);
  }, [onPress, selectedCard]);

  return (
    <>
      {genderCards.map((item, index) => (
        <ButtonCard
          key={index}
          {...item}
          withNoArrow
          onPress={() => setSelectedCard(index + 1)}
          isSelected={selectedCard === index + 1}
          style={styles.card}
        />
      ))}
    </>
  );
};

export default ChooseGender;

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
});
