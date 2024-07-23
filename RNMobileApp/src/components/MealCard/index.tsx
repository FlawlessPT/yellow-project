import React from 'react';
import { StyleSheet, View } from 'react-native';

import { t } from 'i18next';

import Label from '@components/Label';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

type Consumable = {
  name: string;
  quantity: string;
  protein: string;
  carbs: string;
  fat: string;
  kcal: string;
};

type Meal = {
  id: number;
  consumables: Consumable[];
  notes?: string;
};

type MealCardProps = {
  item: Meal;
};

const MealCard = ({ item }: MealCardProps) => {
  const { id, consumables, notes } = item;

  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Label text={`${t('meal')} ${id}`} bold color={theme.colors.white} />
      {consumables.map((consumable, index) => (
        <View key={index} style={styles.contentContainer}>
          <Label text={consumable.name} type="footnote" color={theme.colors.neutral300} />
          <Label text="•" type="footnote" color={theme.colors.neutral500} />
          <Label text={consumable.quantity} type="footnote" color={theme.colors.neutral300} />
          <Label text={consumable.protein} type="size10" color={theme.colors.neutral400} />
          <Label text={consumable.carbs} type="size10" color={theme.colors.neutral400} />
          <Label text={consumable.fat} type="size10" color={theme.colors.neutral400} />
        </View>
      ))}
      <Label text={notes} type="footnote" color={theme.colors.neutral500} style={styles.notesLabel} />
    </View>
  );
};

export default MealCard;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.neutral800,
      marginBottom: 12,
      marginHorizontal: 16,
      padding: 12,
      borderRadius: 12,
    },
    notesLabel: {
      marginTop: 8,
    },
    contentContainer: {
      flexDirection: 'row',
      marginTop: 8,
      justifyContent: 'space-between',
    },
  });
