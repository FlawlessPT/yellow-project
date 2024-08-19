import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Label } from '@components';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

type MealHeaderProps = {
  water: number;
  notes: string;
};

const MealHeader = ({ water, notes }: MealHeaderProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <View style={styles.notesContainer}>
      <View style={styles.container}>
        <Label text="water" color={theme.colors.white} semibold />
        <View style={styles.timeContainer}>
          <Label text={String(water)} color={theme.colors.neutral100} bold />
          <Label text="l" medium type="footnote" color={theme.colors.neutral100} style={styles.minLabel} />
        </View>
        <Label text="per day" type="footnote" color={theme.colors.neutral300} />
      </View>
      <View style={[styles.container, { flex: 1 }]}>
        <Label text="observations" color={theme.colors.white} semibold />
        <Label text={notes} type="footnote" color={theme.colors.neutral300} style={styles.notesLabel} />
      </View>
    </View>
  );
};

export default MealHeader;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.neutral800,
      padding: 18,
      borderRadius: 18,
    },
    minLabel: {
      marginLeft: 4,
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 2,
    },
    notesLabel: {
      marginTop: 8,
    },
    notesContainer: {
      marginHorizontal: 16,
      flexDirection: 'row',
      gap: 8,
      marginBottom: 16,
    },
  });
