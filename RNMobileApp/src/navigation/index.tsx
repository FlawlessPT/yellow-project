import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import RootStack from './RootStack';

export default function RootNavigator({ isLoggedIn }: { isLoggedIn: boolean }): JSX.Element {
  return (
    <NavigationContainer>
      <RootStack isLoggedIn={isLoggedIn} />
    </NavigationContainer>
  );
}
