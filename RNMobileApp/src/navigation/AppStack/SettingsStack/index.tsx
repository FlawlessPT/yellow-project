import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AboutApp from '@screens/AboutApp';
import ChangeLanguage from '@screens/ChangeLanguage';
import Settings from '@screens/Settings';

import { SettingsStackParamList } from './types';

export default function SettingsStack(): JSX.Element {
  const Stack = createNativeStackNavigator<SettingsStackParamList>();

  return (
    <Stack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      <Stack.Screen name="AboutApp" component={AboutApp} />
    </Stack.Navigator>
  );
}
