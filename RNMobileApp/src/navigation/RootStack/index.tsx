// React and React Native
import React from 'react';
import { StatusBar } from 'react-native';

// Stacks
import AppStack from '../AppStack';
import AuthStack from '../AuthStack';

// Types
import { RootStackEnum, defaultScreenOptions } from '../types';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function RootStack(): JSX.Element {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator id={RootStackEnum.APP} initialRouteName={RootStackEnum.APP} screenOptions={defaultScreenOptions}>
        <Stack.Screen name={RootStackEnum.AUTH} component={AuthStack} />
        <Stack.Screen name={RootStackEnum.APP} component={AppStack} />
      </Stack.Navigator>
    </>
  );
}
