// React and React Native
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

// Stubs
import { meals, workouts } from './stub';

// Components
import Card from '@components/Card';
import { Label, Page } from '@components';

// Hooks
import useTheme from '@hooks/theme/useTheme';

const Home = () => {
  const { theme } = useTheme();

  return (
    <Page title="Hello, Bernardo" titleColor={theme.colors.primary}>
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
});
