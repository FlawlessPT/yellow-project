// React
import React from 'react';

// Screens
import AllWorkouts from '@screens/AllWorkouts';

// Types
import { WorkoutStackParamList } from './types';

// External Libs
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function WorkoutStack(): JSX.Element {
  const Stack = createNativeStackNavigator<WorkoutStackParamList>();

  return (
    <Stack.Navigator initialRouteName="AllWorkouts" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AllWorkouts" component={AllWorkouts} />
    </Stack.Navigator>
  );
}
