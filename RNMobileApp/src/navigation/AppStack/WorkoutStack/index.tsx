import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllWorkouts from '@screens/AllWorkouts';

import { WorkoutStackParamList } from './types';

export default function WorkoutStack(): JSX.Element {
  const Stack = createNativeStackNavigator<WorkoutStackParamList>();

  return (
    <Stack.Navigator initialRouteName="AllWorkouts" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AllWorkouts" component={AllWorkouts} />
    </Stack.Navigator>
  );
}
