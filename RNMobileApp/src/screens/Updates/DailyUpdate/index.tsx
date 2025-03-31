import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Controller, FieldValues, useForm } from 'react-hook-form';

import { FormInput, Label, SelectableValueCard } from '@components';

import useTheme from '@hooks/theme/useTheme';

const DailyUpdate = () => {
  const { theme } = useTheme();

  const styles = getStyles();

  const { control, handleSubmit, trigger, setValue, watch } = useForm<FieldValues>({
    mode: 'onChange',
  });

  const trainingRecoverySelected = watch('trainingRecovery');
  const dayEnergySelected = watch('dayEnergy');
  const trainingPerformanceSelected = watch('trainingPerformance');

  const array = [1, 2, 3, 4, 5];

  const renderValueCards = (valueSelected: number, valueKey: string) => {
    return (
      <View style={styles.buttonContainer}>
        {array.map((value) => {
          return (
            <SelectableValueCard
              key={value}
              value={value}
              isSelected={valueSelected === value}
              onPress={() => setValue(valueKey, value)}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Label text="Perception of training recovery" type="h3" semibold color={theme.colors.white} />
      <Controller
        control={control}
        name="trainingRecovery"
        render={() => renderValueCards(trainingRecoverySelected, 'trainingRecovery')}
      />
      <Label text="Energy during the day" type="h3" semibold color={theme.colors.white} />
      <Controller control={control} name="dayEnergy" render={() => renderValueCards(dayEnergySelected, 'dayEnergy')} />
      <Label text="Training performance" type="h3" semibold color={theme.colors.white} />
      <Controller
        control={control}
        name="trainingPerformance"
        render={() => renderValueCards(trainingPerformanceSelected, 'trainingPerformance')}
      />
      <FormInput
        control={control}
        controllerName="trainedMuscle"
        label="Trained muscle"
        placeholder="Write the muscle"
      />
      <FormInput
        control={control}
        controllerName="observations"
        label="Observations"
        placeholder="Write something"
        multiline
      />
    </View>
  );
};

export default DailyUpdate;

const getStyles = () =>
  StyleSheet.create({
    container: {
      gap: 24,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
