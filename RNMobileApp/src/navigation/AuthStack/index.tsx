// React
import React from 'react';

// Components
import { Success } from '@components';

// Screens
import Login from '@screens/Login';
import Splash from '@screens/Splash';
import Tutorial from '@screens/Tutorial';
import CreateAccount from '@screens/CreateAccount';
import Personalization from '@screens/Personalization';

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
      <Stack.Screen name={AuthStackEnum.PERSONALIZATION} component={Personalization} />
      <Stack.Screen name={AuthStackEnum.SUCCESS} component={Success} />
    </Stack.Navigator>
  );
}
