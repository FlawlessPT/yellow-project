// React and React Native
import React from 'react';
import { StyleSheet } from 'react-native';

// Theme
import { Theme } from '@theme';

// Stub
import stub from './stub.json';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// Components
import WorkoutHeader from './WorkoutHeader';
import { WorkoutCalendar, Label, Page, WorkoutCard } from '@components';

const AllWorkouts = () => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <Page withoutHorizontalMargin title="all_workouts.title">
      <WorkoutCalendar />
      <WorkoutHeader />
      <Label
        type="h2"
        text="Leg workout"
        textAlign="center"
        color={theme.colors.white}
        semibold
        style={styles.workoutTitle}
      />
      {stub.map((item, index) => (
        <WorkoutCard key={index} item={item} />
      ))}
    </Page>
  );
};

export default AllWorkouts;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    workoutTitle: {
      marginBottom: 16,
    },
    workoutContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
      marginHorizontal: 16,
    },
    image: {
      width: 64,
      height: 64,
      marginRight: 16,
    },
    firstColumn: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    playContainer: {
      width: 40,
      height: 40,
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.25,
    },
    repsLabel: {
      marginVertical: 4,
    },
    container: {
      backgroundColor: theme.colors.neutral800,
      padding: 18,
      borderRadius: 18,
      alignItems: 'center',
    },
    minLabel: {
      marginLeft: 4,
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    notesLabel: {
      marginTop: 10,
    },
    notesContainer: {
      marginHorizontal: 16,
      flexDirection: 'row',
      gap: 8,
      marginBottom: 16,
    },
  });
