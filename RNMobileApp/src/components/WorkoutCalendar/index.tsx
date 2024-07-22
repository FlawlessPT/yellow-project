import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import moment from 'moment';

import Label from '@components/Label';

import useTheme from '@hooks/theme/useTheme';

import { getWeekdaysStrings, today } from '@utils/weekdays';

import { Theme } from '@theme';

const WorkoutCalendar = () => {
  const [selectedDay, setSelectedDay] = useState<number>(today);
  const { theme } = useTheme();

  const styles = getStyles(theme);

  const getDayLabel = (index: number) => {
    if (index > today) {
      return moment()
        .add(index - today, 'd')
        .format('D');
    } else {
      return moment()
        .subtract(today - index, 'd')
        .format('D');
    }
  };

  return (
    <View style={styles.container}>
      {Array(7)
        .fill(0)
        .map((_, index) => {
          const isSelected = selectedDay === index;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedDay(index)}
              style={isSelected ? styles.selectedDayContainer : styles.dayContainer}
            >
              <Label
                text={getDayLabel(index)}
                bold
                type="h4"
                color={isSelected ? theme.colors.neutral900 : theme.colors.white}
              />
              <Label
                text={getWeekdaysStrings(index.toString()).substring(0, 3)}
                color={isSelected ? theme.colors.neutral900 : theme.colors.neutral500}
              />
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default WorkoutCalendar;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: 24,
      paddingHorizontal: 16,
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    selectedDayContainer: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 15,
      paddingHorizontal: 9,
      borderRadius: 24,
      alignItems: 'center',
    },
    dayContainer: {
      alignItems: 'center',
    },
  });
