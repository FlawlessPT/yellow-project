// React
import React from 'react';

// Screens
import Splash from '@screens/Splash';
import Login from '@screens/Login';
import { SignUp } from '@screens/SignUp';

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
      screenOptions={defaultScreenOptions}>
      <Stack.Screen name={AuthStackEnum.SPLASH} component={Splash} />
      <Stack.Screen name={AuthStackEnum.LOGIN} component={Login} />
      <Stack.Screen name={AuthStackEnum.CREATE_ACCOUNT} component={SignUp} />
    </Stack.Navigator>
  );
}
