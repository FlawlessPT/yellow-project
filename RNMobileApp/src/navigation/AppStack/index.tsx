// React
import React from 'react';

// Screens
import Account from '@screens/Account';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// Assets
import { FoodIcon, HomeIcon, WorkoutIcon } from '@assets';

// External Libs
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Types
import { AppStackEnum, defaultScreenOptions, RootStackEnum } from '../types';
import Home from '@screens/Home';

export default function AppStack(): JSX.Element {
  const Tab = createBottomTabNavigator();
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      id={RootStackEnum.APP}
      initialRouteName={AppStackEnum.HOME}
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 1.5,
          borderTopColor: theme.colors.border,
          height: 62,
          paddingTop: 10,
        },
        ...defaultScreenOptions,
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: HomeIcon }} />
      <Tab.Screen name="Workout" component={Account} options={{ tabBarIcon: WorkoutIcon }} />
      <Tab.Screen name="Food" component={Account} options={{ tabBarIcon: FoodIcon }} />
    </Tab.Navigator>
  );
}
