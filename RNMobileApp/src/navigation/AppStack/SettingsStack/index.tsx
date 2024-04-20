// React
import React from 'react';

// Screens
import Settings from '@screens/Settings';
import ChangeLanguage from '@screens/ChangeLanguage';

// External Libs
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function SettingsStack(): JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
    </Stack.Navigator>
  );
}
