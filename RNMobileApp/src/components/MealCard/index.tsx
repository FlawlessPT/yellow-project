import React from 'react';
import { StyleSheet, View } from 'react-native';

import { t } from 'i18next';
import { DataTable } from 'react-native-paper';

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

  const renderNutrientsValue = (value: string) => <Label text={value} type="size10" color={theme.colors.neutral400} />;

  const renderNutrients = (nutrient: string) => (
    <Label text={nutrient} type="size10" color={theme.colors.neutral300} medium />
  );

  return (
    <View style={styles.container}>
      <DataTable style={styles.contentContainer}>
        <DataTable.Header style={styles.noBorder}>
          <DataTable.Title style={styles.mealTitle}>
            <Label text={`${t('meal')} ${id}`} bold color={theme.colors.white} />
          </DataTable.Title>
          <DataTable.Title style={styles.noTitle}>
            <View />
          </DataTable.Title>
          <DataTable.Title style={styles.centeredTitle}>{renderNutrients('pro')}</DataTable.Title>
          <DataTable.Title style={styles.centeredTitle}>{renderNutrients('fat')}</DataTable.Title>
          <DataTable.Title style={styles.centeredTitle}>{renderNutrients('carbs')}</DataTable.Title>
          <DataTable.Title style={styles.centeredTitle}>{renderNutrients('kcal')}</DataTable.Title>
        </DataTable.Header>
        {consumables.map((consumable, index) => (
          <DataTable.Row key={index} style={[styles.noBorder]}>
            <DataTable.Cell style={styles.flex5}>
              <Label text={consumable.name} type="footnote" color={theme.colors.neutral300} />
            </DataTable.Cell>
            <DataTable.Cell style={styles.flex2}>
              <View style={styles.row}>
                <Label text="•" type="footnote" color={theme.colors.neutral500} />
                <Label
                  text={consumable.quantity}
                  type="footnote"
                  color={theme.colors.neutral300}
                  style={styles.quantityLabel}
                />
              </View>
            </DataTable.Cell>
            <DataTable.Cell style={styles.centeredTitle}>{renderNutrientsValue(consumable.protein)}</DataTable.Cell>
            <DataTable.Cell style={styles.centeredTitle}>{renderNutrientsValue(consumable.fat)}</DataTable.Cell>
            <DataTable.Cell style={styles.centeredTitle}>{renderNutrientsValue(consumable.carbs)}</DataTable.Cell>
            <DataTable.Cell style={styles.centeredTitle}>{renderNutrientsValue(consumable.kcal)}</DataTable.Cell>
          </DataTable.Row>
        ))}
        {notes && (
          <Label
            text={`${t('notes')}: ${notes}`}
            type="footnote"
            color={theme.colors.neutral500}
            style={styles.notesLabel}
          />
        )}
      </DataTable>
    </View>
  );
};

export default MealCard;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16,
    },
    contentContainer: {
      backgroundColor: theme.colors.neutral800,
      marginBottom: 12,
      padding: 0,
      borderRadius: 12,
    },
    notesLabel: {
      marginLeft: 12,
      marginBottom: 14,
    },
    noBorder: {
      borderBottomWidth: 0,
      alignItems: 'center',
    },
    mealTitle: {
      flex: 5,
    },
    noTitle: {
      flex: 2,
    },
    centeredTitle: {
      justifyContent: 'center',
    },
    quantityLabel: {
      marginLeft: 12,
    },
    row: {
      flexDirection: 'row',
    },
    flex5: {
      flex: 5,
    },
    flex2: {
      flex: 2,
    },
  });
