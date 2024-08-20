import React from 'react';
import { StyleSheet, View } from 'react-native';

import { DataTable } from 'react-native-paper';

import { Label } from '@components';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

type Supplement = {
  name: string;
  description: string;
};

type SupplementsProps = {
  supplements: {
    before?: Supplement[];
    intra?: Supplement[];
    after?: Supplement[];
  };
};

const Supplements = ({ supplements }: SupplementsProps) => {
  const { after, before, intra } = supplements;

  const { theme } = useTheme();

  const styles = getStyles(theme);

  const renderSupplementCard = (title: string, array?: Supplement[]) => (
    <View style={styles.card}>
      <DataTable>
        <DataTable.Header style={styles.noBorder}>
          <Label text={title} bold color={theme.colors.white} style={styles.title} />
        </DataTable.Header>
        {array ? (
          array.map((element, index) => (
            <DataTable.Row style={styles.noBorder} key={index}>
              <DataTable.Cell>
                <Label text={element.name} color={theme.colors.neutral300} type="footnote" />
              </DataTable.Cell>
              <DataTable.Cell>
                <View style={styles.row}>
                  <Label text="•" type="footnote" color={theme.colors.neutral500} style={styles.circle} />
                  <Label text={element.description} type="footnote" color={theme.colors.neutral300} />
                </View>
              </DataTable.Cell>
            </DataTable.Row>
          ))
        ) : (
          <Label text="no_info" type="size10" color={theme.colors.neutral500} style={styles.noInfoLabel} />
        )}
      </DataTable>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderSupplementCard('before_workout', before)}
      {renderSupplementCard('intra_workout', intra)}
      {renderSupplementCard('after_workout', after)}
    </View>
  );
};

export default Supplements;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: { gap: 12 },
    card: {
      backgroundColor: theme.colors.neutral800,
      marginHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 16,
      borderRadius: 12,
    },
    row: {
      flexDirection: 'row',
    },
    noBorder: {
      borderBottomWidth: 0,
      marginBottom: -22,
    },
    circle: {
      marginRight: 8,
    },
    noInfoLabel: {
      marginHorizontal: 15,
      marginTop: 14,
    },
    title: {
      marginBottom: 16,
    },
  });
