import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Label } from '@components';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

const WorkoutHeader = () => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <View style={styles.notesContainer}>
      <View style={styles.container}>
        <Label text="Cardio" type="footnote" color={theme.colors.neutral400} />
        <View style={styles.timeContainer}>
          <Label text="30" type="h2" color={theme.colors.neutral200} bold />
          <Label text="min" medium type="footnote" color={theme.colors.neutral200} style={styles.minLabel} />
        </View>
        <Label text="Pós treino" type="footnote" color={theme.colors.neutral200} medium />
      </View>
      <View style={[styles.container, { flex: 1 }]}>
        <Label text="Notas importantes" type="footnote" color={theme.colors.neutral400} />
        <Label
          text="Fazer sempre aquecimento no 1º exercicio de cada treino"
          type="footnote"
          color={theme.colors.neutral200}
          medium
          style={styles.notesLabel}
        />
      </View>
    </View>
  );
};

export default WorkoutHeader;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
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
