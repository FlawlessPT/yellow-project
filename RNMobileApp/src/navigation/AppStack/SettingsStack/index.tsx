// React
import React from 'react';

// Types
import { SettingsStackParamList } from './types';

// Screens
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChangeLanguage from '@screens/ChangeLanguage';
import Settings from '@screens/Settings';

// External Libs

export default function SettingsStack(): JSX.Element {
  const Stack = createNativeStackNavigator<SettingsStackParamList>();

  return (
    <Stack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
    </Stack.Navigator>
  );
}
