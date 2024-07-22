import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { InfoCircleIcon, NoWorkoutsImage } from '@assets';

import { WorkoutCalendar, Label, Page, WorkoutCard } from '@components';

import workouts from './stub.json';
import WorkoutHeader from './WorkoutHeader';
import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

const MyWorkouts = () => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <Page
      withoutHorizontalMargin
      title="my_workouts"
      right={
        <TouchableOpacity onPress={() => console.log('oiii')}>
          <Image source={InfoCircleIcon} />
        </TouchableOpacity>
      }
    >
      <WorkoutCalendar />
      {workouts.length ? (
        <>
          <WorkoutHeader />
          <Label
            type="h2"
            text="Leg workout"
            textAlign="center"
            color={theme.colors.white}
            semibold
            style={styles.workoutTitle}
          />
          {workouts?.map((item, index) => <WorkoutCard key={index} item={item} />)}
        </>
      ) : (
        <View style={styles.noWorkoutsContainer}>
          <Label
            type="h3"
            text="Enjoy your rest day and get ready for a new challenge"
            color={theme.colors.neutral500}
            semibold
            textAlign="center"
            style={styles.noWorkoutsLabel}
          />
          <Image source={NoWorkoutsImage} />
        </View>
      )}
    </Page>
  );
};

export default MyWorkouts;

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
    noWorkoutsLabel: {
      marginVertical: 16,
    },
    noWorkoutsContainer: {
      alignItems: 'center',
      marginHorizontal: 38,
    },
  });
