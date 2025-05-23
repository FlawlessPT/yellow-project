import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { InfoCircleIcon, NoWorkoutsImage } from '@assets';

import { CalendarHeader, Label, Page, MealCard, TopTabs } from '@components';

import MealHeader from './MealHeader';
import MealsSummaryModal from './MealsSummaryModal';
import stub from './stub.json';
import Supplements from './Supplements';
import useTheme from '@hooks/theme/useTheme';

import { TabEnum } from '@types';

const MyMeals = () => {
  const { theme } = useTheme();

  const styles = getStyles();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [selectedTab, setSelectedTab] = useState<TabEnum>(TabEnum.Meals);

  const { meals, supplements } = stub;

  return (
    <>
      <Page
        withHorizontalMargin={false}
        title="diet_nutrition.title"
        right={
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Image source={InfoCircleIcon} />
          </TouchableOpacity>
        }
      >
        <CalendarHeader />
        <MealHeader water={3.5} notes="Zero drinks and sauces in moderation" />
        <TopTabs tabs={['Meals', 'Supplements']} onChangeTab={setSelectedTab} />
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
          <Supplements supplements={supplements} />
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
