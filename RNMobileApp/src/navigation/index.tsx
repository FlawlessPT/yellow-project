// React
import React from 'react';

// Stacks
import RootStack from './RootStack';

// Navigation
import { NavigationContainer } from '@react-navigation/native';

export default function RootNavigator({ isLoggedIn }: { isLoggedIn: boolean }): JSX.Element {
  return (
    <NavigationContainer>
      <RootStack isLoggedIn={isLoggedIn} />
    </NavigationContainer>
  );
}
