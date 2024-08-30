import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

import { LogoImage } from '@assets';
import { AppStackEnum } from '@navigation/types';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import { Label, Page, Card, ProgressCard, LabelButton } from '@components';

import { meals, workouts } from './stub';
import { renderTitle } from './utils';
import useTheme from '@hooks/theme/useTheme';

import { getWeekdaysStrings, today } from '@utils/weekdays';

import { Theme } from '@theme';

const Home = () => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const [selectedDay, setSelectedDay] = useState<number>(today);

  return (
    <Page
      withHorizontalMargin={false}
      header={
        <View style={styles.paddingHorizontal}>
          <Image source={LogoImage} style={styles.profileImage} />
          <Label text="Hi, (nome)" type="h4" color={'rgba(255,255,255,0.5)'} medium style={styles.helloLabel} />
        </View>
      }
      title="home.title"
    >
      <View style={styles.paddingHorizontal}>
        <ProgressCard progress={45} />
      </View>
      {renderTitle('my_workouts', () => navigation.navigate(AppStackEnum.WORKOUT_STACK), theme)}
      <FlatList
        data={workouts}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Card {...item} />}
        contentContainerStyle={styles.row}
      />
      {renderTitle('my_meals', () => navigation.navigate(AppStackEnum.MEAL_STACK), theme)}
      <View style={styles.weekdaysContainer}>
        <FlatList
          data={Array(7).fill(0)}
          horizontal
          onScrollToIndexFailed={() => undefined}
          initialScrollIndex={today - 2}
          showsHorizontalScrollIndicator={false}
          renderItem={({ index }) => (
            <LabelButton
              key={index}
              text={getWeekdaysStrings(index === today ? 'today' : index === today + 1 ? 'tomorrow' : index.toString())}
              color={theme.colors.white}
              textStyle={{ color: selectedDay === index ? theme.colors.neutral700 : theme.colors.neutral400 }}
              style={{
                ...styles.weekdaysLabel,
                backgroundColor: selectedDay === index ? theme.colors.primary : theme.colors.neutral800,
              }}
              onPress={() => setSelectedDay(index)}
            />
          )}
        />
      </View>
      <FlatList
        data={meals}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Card {...item} />}
        contentContainerStyle={styles.row}
      />
    </Page>
  );
};

export default Home;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    row: {
      gap: 24,
    },
    helloLabel: {
      marginTop: 10,
    },
    profileImage: {
      borderRadius: 20,
      width: 40,
      height: 40,
    },
    weekdaysContainer: {
      marginBottom: 18,
    },
    weekdaysLabel: {
      backgroundColor: theme.colors.neutral800,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      marginRight: 8,
    },
    paddingHorizontal: {
      paddingHorizontal: 16,
    },
  });
