// React
import React from 'react';

// Stacks
import { NavigationContainer } from '@react-navigation/native';

import RootStack from './RootStack';

// Navigation

export default function RootNavigator({ isLoggedIn }: { isLoggedIn: boolean }): JSX.Element {
  return (
    <NavigationContainer>
      <RootStack isLoggedIn={isLoggedIn} />
    </NavigationContainer>
  );
}
