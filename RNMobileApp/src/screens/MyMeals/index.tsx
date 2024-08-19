import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { InfoCircleIcon, NoWorkoutsImage } from '@assets';

import { WorkoutCalendar, Label, Page, MealCard, TopTabs } from '@components';

import MealHeader from './MealHeader';
import MealsSummaryModal from './MealsSummaryModal';
import meals from './stub.json';
import useTheme from '@hooks/theme/useTheme';

import { TabEnum } from '@types';

const MyMeals = () => {
  const { theme } = useTheme();

  const styles = getStyles();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [selectedTab, setSelectedTab] = useState<TabEnum>(TabEnum.Meals);

  return (
    <>
      <Page
        withoutHorizontalMargin
        title="diet_nutrition.title"
        right={
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Image source={InfoCircleIcon} />
          </TouchableOpacity>
        }
      >
        <WorkoutCalendar />
        <MealHeader />
        <TopTabs onChangeTab={setSelectedTab} />
        {selectedTab === 0 ? (
          meals.length ? (
            meals?.map((meal, index) => <MealCard key={index} item={meal} />)
          ) : (
            <View style={styles.container}>
              <Label
                type="h3"
                text="enjoy.restday_title"
                color={theme.colors.neutral500}
                semibold
                textAlign="center"
                style={styles.label}
              />
              <Image source={NoWorkoutsImage} />
            </View>
          )
        ) : (
          <></>
        )}
      </Page>
      <MealsSummaryModal
        data={{ objective: [12, 24, 56, 123], missing: [22, 45, 22, 123], total: [95, 44, 22, 123] }}
        isVisible={isModalVisible}
        onProceed={setIsModalVisible}
      />
    </>
  );
};

export default MyMeals;

const getStyles = () =>
  StyleSheet.create({
    label: {
      marginVertical: 16,
    },
    container: {
      alignItems: 'center',
      marginHorizontal: 38,
    },
  });
