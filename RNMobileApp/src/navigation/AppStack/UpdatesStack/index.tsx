import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Updates from '@screens/Updates';

import { UpdatesStackParamList } from './types';

export default function UpdatesStack(): JSX.Element {
  const Stack = createNativeStackNavigator<UpdatesStackParamList>();

  return (
    <Stack.Navigator initialRouteName="Updates" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Updates" component={Updates} />
    </Stack.Navigator>
  );
}
