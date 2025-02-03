import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyMeals from '@screens/MyMeals';

import { MealStackParamList } from './types';

export default function WorkoutStack(): JSX.Element {
  const Stack = createNativeStackNavigator<MealStackParamList>();

  return (
    <Stack.Navigator initialRouteName="MyMeals" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyMeals" component={MyMeals} />
    </Stack.Navigator>
  );
}
