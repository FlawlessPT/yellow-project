// React
import React from 'react';

// Screens
import Home from '@screens/Home';
import Account from '@screens/Account';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// External Libs
import Icon from 'react-native-vector-icons/FontAwesome6';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Types
import { AppStackEnum, defaultScreenOptions, RootStackEnum } from '../types';

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
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="house" size={20} color={focused ? theme.colors.primary : theme.colors.icon} />
          ),
        }}
      />
      <Tab.Screen
        name="Workout"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="dumbbell" size={20} color={focused ? theme.colors.primary : theme.colors.icon} />
          ),
        }}
      />
      <Tab.Screen
        name="Food"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="utensils" size={20} color={focused ? theme.colors.primary : theme.colors.icon} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
