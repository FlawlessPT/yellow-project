// React and React Native
import React from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';

// Stubs
import { meals, workouts } from './stub';

// Components
import Card from '@components/Card';
import { Label, Page, ProgressBar } from '@components';

// Hooks
import useTheme from '@hooks/theme/useTheme';
import { LogoImage } from '@assets';

const Home = () => {
  const { theme } = useTheme();

  return (
    <Page
      header={
        <>
          <Image source={LogoImage} style={styles.profileImage} />
          <Label text="Hi, Bernardo" type="h4" color={'rgba(255,255,255,0.5)'} medium style={styles.helloLabel} />
        </>
      }
      title="Let’s start your day"
    >
      <ProgressBar title="For the Week" progress={45} />
      <Label text="my_workouts" type="h4" color={theme.colors.neutral300} medium style={styles.title} />
      <FlatList
        data={workouts}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Card image={item.image} title={item.title} items={item.items} />}
        contentContainerStyle={styles.row}
      />
      <Label text="my_meals" type="h4" color={theme.colors.neutral300} medium style={styles.title} />
      <FlatList
        data={meals}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Card image={item.image} title={item.title} items={item.items} />}
        contentContainerStyle={styles.row}
      />
    </Page>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    marginTop: 40,
    marginBottom: 18,
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
});
