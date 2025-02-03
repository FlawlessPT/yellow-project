import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyWorkouts from '@screens/MyWorkouts';

import { WorkoutStackParamList } from './types';

export default function WorkoutStack(): JSX.Element {
  const Stack = createNativeStackNavigator<WorkoutStackParamList>();

  return (
    <Stack.Navigator initialRouteName="MyWorkouts" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyWorkouts" component={MyWorkouts} />
    </Stack.Navigator>
  );
}
