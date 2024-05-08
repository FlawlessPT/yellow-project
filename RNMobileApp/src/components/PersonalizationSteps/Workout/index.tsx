// React and React Native
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

// Styles
import { getStyles } from '../styles';

// Components
import { Input, SmallCard } from '@components';

// Types
import { StepProps, HandleSetTypeResult, WorkoutType } from '../types';

const Workout = ({ onPress }: StepProps) => {
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutType>();
  const [workoutDescription, setWorkoutDescription] = useState<string>();

  const styles = getStyles();

  useEffect(() => {
    onPress(!!selectedWorkout && !!workoutDescription);
  }, [onPress, selectedWorkout, workoutDescription]);

  const handleSetWorkoutType = (workoutType: WorkoutType): HandleSetTypeResult => {
    return {
      isSelected: selectedWorkout === workoutType,
      onPress: () => setSelectedWorkout(workoutType),
    };
  };

  return (
    <ScrollView bounces={false} style={styles.scrollview}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <SmallCard image="leaf" title="Start training" {...handleSetWorkoutType(WorkoutType.BEGINNER)} />
          <SmallCard image="egg" title="1/2 times a week" {...handleSetWorkoutType(WorkoutType.IRREGULAR)} />
        </View>
        <View style={styles.contentContainer}>
          <SmallCard image="burger" title="3/5 times a week" {...handleSetWorkoutType(WorkoutType.MEDIUM)} />
          <SmallCard
            image="bread-slice"
            title="More than 5 times a week"
            {...handleSetWorkoutType(WorkoutType.ADVANCED)}
          />
        </View>
        <Input
          multiline
          value={workoutDescription}
          textStyle={styles.inputHeight}
          style={styles.inputContainer}
          placeholder="your_workout.input"
          onChangeText={setWorkoutDescription}
        />
      </View>
    </ScrollView>
  );
};

export default Workout;
