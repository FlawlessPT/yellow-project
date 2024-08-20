import React from 'react';
import { StyleSheet, View } from 'react-native';

import Modal from 'react-native-modal';
import { DataTable } from 'react-native-paper';

import { Label, Button } from '@components';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

type MealsSummaryModalProps = {
  data: {
    objective: number[]; //pro //fat //carbs //kcal
    total: number[]; //pro //fat //carbs //kcal
    missing: number[]; //pro //fat //carbs //kcal
  };
  isVisible: boolean;
  onProceed: (value: boolean) => void;
};

const MealsSummaryModal = ({ data, isVisible, onProceed }: MealsSummaryModalProps) => {
  const { objective, total, missing } = data;

  const { theme } = useTheme();

  const styles = getStyles(theme);

  const renderTitle = (title: string) => (
    <Label text={title} type="footnote" color={theme.colors.neutral100} semibold />
  );

  const renderNutrients = (name: string, array: number[]) => (
    <DataTable.Row style={styles.noBorder}>
      <DataTable.Cell style={styles.cell}>
        <Label text={name} color={theme.colors.neutral100} semibold />
      </DataTable.Cell>
      {array.map((element, index) => (
        <DataTable.Cell key={index}>
          <View style={styles.row}>
            <Label text={String(element)} type="size10" color={theme.colors.neutral300} bold />
            {index < array.length - 1 && (
              <Label text="•" type="footnote" color={theme.colors.neutral500} style={styles.circle} />
            )}
          </View>
        </DataTable.Cell>
      ))}
    </DataTable.Row>
  );

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <Label type="h3" text="summary.week_title" color={theme.colors.white} bold textAlign="center" />
        <DataTable>
          <DataTable.Header style={styles.noBorder}>
            <DataTable.Title style={styles.title}>
              <View />
            </DataTable.Title>
            <DataTable.Title>{renderTitle('pro')}</DataTable.Title>
            <DataTable.Title>{renderTitle('fat')}</DataTable.Title>
            <DataTable.Title>{renderTitle('carbs')}</DataTable.Title>
            <DataTable.Title>{renderTitle('kcal')}</DataTable.Title>
          </DataTable.Header>
          {renderNutrients('objective', objective)}
          {renderNutrients('total', total)}
          {renderNutrients('missing', missing)}
        </DataTable>
        <Button text="continue.button" onPressButton={() => onProceed(false)} />
      </View>
    </Modal>
  );
};

export default MealsSummaryModal;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    noBorder: {
      borderBottomWidth: 0,
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: theme.colors.neutral800,
      borderRadius: 12,
      padding: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cell: {
      flex: 2,
    },
    circle: {
      marginLeft: 12,
    },
    title: {
      flex: 2,
    },
  });
