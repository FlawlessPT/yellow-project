// React and React Native
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

// Types
import { Theme } from '@theme';

// Components
import { Label } from '@components';

// External Libs
import { Icon } from 'react-native-paper';

// Assets
import { RightPrimaryArrow } from '@assets';

export const renderTitle = (title: string, theme: Theme) => {
  return (
    <View style={styles.titleRow}>
      <Label text={title} type="h4" color={theme.colors.neutral300} medium />
      <TouchableOpacity style={styles.seeAllContainer}>
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
