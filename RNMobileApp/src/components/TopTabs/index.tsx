import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '@components/Button';

import useTheme from '@hooks/theme/useTheme';

import { TabEnum } from '@types';

type TopTabsProps = {
  tabs: string[];
  onChangeTab: (index: number) => void;
};

const TopTabs = ({ tabs, onChangeTab }: TopTabsProps) => {
  const { theme } = useTheme();

  const [selectedTab, setSelectedTab] = useState<TabEnum>(TabEnum.Meals);

  const renderTabs = () =>
    tabs.map((tab, index) => {
      const isSelected = selectedTab === index;

      return (
        <Button
          key={`${tab}${index}`}
          text={tab}
          style={[
            styles.button,
            {
              borderBottomColor: isSelected ? theme.colors.primary : 'transparent',
            },
          ]}
          color={isSelected ? theme.colors.primary : theme.colors.neutral400}
          onPressButton={() => {
            setSelectedTab(index);
            onChangeTab(index);
          }}
          activeOpacity={1}
        />
      );
    });

  return <View style={styles.container}>{renderTabs()}</View>;
};

export default TopTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderRadius: 0,
  },
});
