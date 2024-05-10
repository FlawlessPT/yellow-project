// React and React Native
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

// Theme
import { Theme } from '@theme';

// Assets
import { LogoImage } from '@assets';

// Stubs
import { meals, workouts } from './stub';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// Components
import Card from '@components/Card';
import { Label, LabelButton, Page, ProgressBar } from '@components';

// Utils
import { getWeekdays, getWeekdaysStrings, today } from '@utils/weekdays';

const Home = () => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  const [selectedDay, setSelectedDay] = useState<number>(today - 1);

  const days = [...getWeekdays().daysBefore.reverse(), 'today', 'tomorrow', ...getWeekdays().daysAfter];

  return (
    <Page
      withoutHorizontalMargin
      header={
        <View style={styles.paddingHorizontal}>
          <Image source={LogoImage} style={styles.profileImage} />
          <Label text="Hi, Bernardo" type="h4" color={'rgba(255,255,255,0.5)'} medium style={styles.helloLabel} />
        </View>
      }
      title="home.title"
    >
      <ProgressBar title="for_week.progress" progress={45} style={styles.paddingHorizontal} />
      <Label text="my_workouts" type="h4" color={theme.colors.neutral300} medium style={styles.title} />
      <FlatList
        data={workouts}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Card {...item} />}
        contentContainerStyle={styles.row}
      />
      <Label text="my_meals" type="h4" color={theme.colors.neutral300} medium style={styles.title} />
      <View style={styles.weekdaysContainer}>
        <FlatList
          data={days}
          horizontal
          initialScrollIndex={days.findIndex((item) => item === 'today')}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <LabelButton
              key={index}
              text={getWeekdaysStrings(item.toString())}
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
    title: {
      marginTop: 40,
      marginBottom: 18,
      paddingHorizontal: 16,
    },
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
