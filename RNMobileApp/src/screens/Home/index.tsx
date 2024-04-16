// React and React Native
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

// Theme
import { Theme } from '@theme';

// Components
import { Label } from '@components';
import Card from '@components/Card';

// Stub
import { meals, workouts } from './stub';

// Hooks
import useTheme from '@hooks/theme/useTheme';

const Home = () => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Label text="Hello, Bernardo" type="h4" color={theme.colors.secondary} />
      <Label text="Let's start your day" type="h1" color={theme.colors.primary} semibold />
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
    </View>
  );
};

export default Home;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 50,
      backgroundColor: theme.colors.background,
    },
    title: {
      marginTop: 40,
      marginBottom: 18,
    },
    row: {
      gap: 24,
    },
  });
