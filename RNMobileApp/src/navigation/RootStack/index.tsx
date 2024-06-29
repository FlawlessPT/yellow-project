import React from 'react';
import { StatusBar } from 'react-native';

import AppStack from '@navigation/AppStack';
import AuthStack from '@navigation/AuthStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackEnum, defaultScreenOptions } from '../types';

const Stack = createNativeStackNavigator();

export default function RootStack({ isLoggedIn }: { isLoggedIn: boolean }): JSX.Element {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        id={RootStackEnum.AUTH}
        initialRouteName={RootStackEnum.AUTH}
        screenOptions={defaultScreenOptions}
      >
        {isLoggedIn ? (
          <Stack.Screen name={RootStackEnum.APP} component={AppStack} />
        ) : (
          <Stack.Screen name={RootStackEnum.AUTH} component={AuthStack} />
        )}
      </Stack.Navigator>
    </>
  );
}
