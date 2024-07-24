import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { InfoCircleIcon, NoWorkoutsImage } from '@assets';

import { WorkoutCalendar, Label, Page, MealCard, Tab } from '@components';

import MealHeader from './MealHeader';
import meals from './stub.json';
import useTheme from '@hooks/theme/useTheme';

import { TabEnum } from '@types';

import { Theme } from '@theme';

const MyMeals = () => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

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
        <Tab onChangeTab={setSelectedTab} />
        {selectedTab === 0 ? (
          meals.length ? (
            meals?.map((meal, index) => <MealCard key={index} item={meal} />)
          ) : (
            <View style={styles.noWorkoutsContainer}>
              <Label
                type="h3"
                text="enjoy.restday_title"
                color={theme.colors.neutral500}
                semibold
                textAlign="center"
                style={styles.noWorkoutsLabel}
              />
              <Image source={NoWorkoutsImage} />
            </View>
          )
        ) : (
          <></>
        )}
      </Page>
      {/* <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Label type="h3" text="summary.week_title" color={theme.colors.white} bold />
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Image source={CloseIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Label text="ABS" color={theme.colors.white} bold />
            <Label text="•" color={theme.colors.white} style={styles.separator} />
            <Label text="6 séries" color={theme.colors.white} type="footnote" />
          </View>
        </View>
      </Modal> */}
    </>
  );
};

export default MyMeals;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    workoutTitle: {
      marginBottom: 16,
    },
    noWorkoutsLabel: {
      marginVertical: 16,
    },
    noWorkoutsContainer: {
      alignItems: 'center',
      marginHorizontal: 38,
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
  });
