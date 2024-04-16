// React
import React from 'react';

// Screens
import Splash from '@screens/Splash';
import Login from '@screens/Login';
import { Tutorial } from '@screens/Tutorial';
import CreateAccount from '@screens/CreateAccount';

// Navigation
import { createStackNavigator } from '@react-navigation/stack';

// Types
import { AuthStackParamList } from './types';
import { defaultScreenOptions, AuthStackEnum, RootStackEnum } from '../types';

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack(): JSX.Element {
  return (
    <Stack.Navigator
      id={RootStackEnum.AUTH}
      initialRouteName={AuthStackEnum.SPLASH}
      screenOptions={defaultScreenOptions}
    >
      <Stack.Screen name={AuthStackEnum.SPLASH} component={Splash} />
      <Stack.Screen name={AuthStackEnum.TUTORIAL} component={Tutorial} />
      <Stack.Screen name={AuthStackEnum.LOGIN} component={Login} />
      <Stack.Screen name={AuthStackEnum.CREATE_ACCOUNT} component={CreateAccount} />
    </Stack.Navigator>
  );
}
