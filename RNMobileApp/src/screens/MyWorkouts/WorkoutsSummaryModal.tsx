import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { CloseIcon } from '@assets';
import Modal from 'react-native-modal';
import { DataTable } from 'react-native-paper';

import { Button, Label } from '@components';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

type WorkoutsSummaryModalProps = {
  data: { name: string; series: number }[];
  isVisible: boolean;
  onProceed: (value: boolean) => void;
};

const WorkoutsSummaryModal = ({ data, isVisible, onProceed }: WorkoutsSummaryModalProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Label type="h3" text="summary.week_title" color={theme.colors.white} bold />
          <TouchableOpacity onPress={() => onProceed(false)}>
            <Image source={CloseIcon} />
          </TouchableOpacity>
        </View>
        {data.map((item, index) => (
          <DataTable.Row key={index} style={styles.noBorder}>
            <DataTable.Cell>
              <Label text={item.name} color={theme.colors.white} bold />
            </DataTable.Cell>
            <DataTable.Cell>
              <Label text="•" color={theme.colors.white} style={styles.separator} />
            </DataTable.Cell>
            <DataTable.Cell>
              <Label text={`${item.series} series`} color={theme.colors.white} type="footnote" />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
        <Button text="continue.button" onPressButton={() => onProceed(false)} style={styles.continueButton} />
      </View>
    </Modal>
  );
};

export default WorkoutsSummaryModal;

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
    continueButton: {
      marginTop: 24,
    },
  });
