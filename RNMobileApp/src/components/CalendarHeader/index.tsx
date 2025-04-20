import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import moment from 'moment';

import Label from '@components/Label';

import useTheme from '@hooks/theme/useTheme';

import { getWeekdaysStrings, today } from '@utils/weekdays';

const CalendarHeader = () => {
  const [selectedDay, setSelectedDay] = useState<number>(today);
  const { theme } = useTheme();

  const styles = getStyles();

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
              style={[
                styles.dayContainer,
                { backgroundColor: isSelected ? theme.colors.primary : theme.colors.neutral800 },
              ]}
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

export default CalendarHeader;

const getStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: 24,
      paddingHorizontal: 16,
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dayContainer: {
      paddingVertical: 15,
      borderRadius: 12,
      alignItems: 'center',
      width: 45,
    },
  });
