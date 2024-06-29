import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import CreateAccount from '@screens/CreateAccount';
import Login from '@screens/Login';
import Personalization from '@screens/Personalization';
import Splash from '@screens/Splash';
import Tutorial from '@screens/Tutorial';
import Billing from '@screens/Billing';

import { defaultScreenOptions, AuthStackEnum, RootStackEnum } from '../types';
import { Success } from '@components';

// Navigation

// Types
import { AuthStackParamList } from './types';

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
      <Stack.Screen name={AuthStackEnum.BILLING} component={Billing} />
      <Stack.Screen name={AuthStackEnum.PERSONALIZATION} component={Personalization} />
      <Stack.Screen name={AuthStackEnum.SUCCESS} component={Success} />
    </Stack.Navigator>
  );
}
