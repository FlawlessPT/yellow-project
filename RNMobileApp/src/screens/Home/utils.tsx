import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { RightPrimaryArrow } from '@assets';
import { Icon } from 'react-native-paper';

import { Label } from '@components';

import { Theme } from '@theme';

export const renderTitle = (title: string, onPress: () => void, theme: Theme) => {
  return (
    <View style={styles.titleRow}>
      <Label text={title} type="h4" color={theme.colors.neutral300} medium />
      <TouchableOpacity style={styles.seeAllContainer} onPress={onPress}>
        <Label text="see.all" type="footnote" color={theme.colors.primary} style={styles.seeAllLabel} />
        <Icon source={RightPrimaryArrow} size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleRow: {
    marginTop: 40,
    marginBottom: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAllLabel: {
    marginRight: 8,
  },
  seeAllContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
});
