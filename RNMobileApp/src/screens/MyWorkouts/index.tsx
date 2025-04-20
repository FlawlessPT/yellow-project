import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { InfoCircleIcon, NoWorkoutsImage } from '@assets';

import { Label, Page, WorkoutCard, CalendarHeader } from '@components';

import workouts from './stub.json';
import WorkoutHeader from './WorkoutHeader';
import WorkoutsSummaryModal from './WorkoutsSummaryModal';
import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

const MyWorkouts = () => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <>
      <Page
        withHorizontalMargin={false}
        title="my_workouts"
        right={
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Image source={InfoCircleIcon} />
          </TouchableOpacity>
        }
      >
        <CalendarHeader />
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
              text="enjoy.restday_title"
              color={theme.colors.neutral500}
              semibold
              textAlign="center"
              style={styles.noWorkoutsLabel}
            />
            <Image source={NoWorkoutsImage} />
          </View>
        )}
      </Page>
      <WorkoutsSummaryModal
        data={[
          { name: 'ABS', series: 6 },
          { name: 'Pernas', series: 3 },
          { name: 'Costas', series: 3 },
          { name: 'Peito', series: 2 },
          { name: 'Ombro', series: 4 },
        ]}
        isVisible={isModalVisible}
        onProceed={setIsModalVisible}
      />
    </>
  );
};

export default MyWorkouts;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    workoutTitle: {
      marginBottom: 16,
    },
    noWorkoutsLabel: {
      marginVertical: 16,
    },
    noWorkoutsContainer: {
      alignItems: 'center',
      marginHorizontal: 38,
    },
    modalContainer: {
      backgroundColor: theme.colors.neutral800,
      borderRadius: 12,
      padding: 20,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
      alignItems: 'center',
    },
    separator: {
      marginHorizontal: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
