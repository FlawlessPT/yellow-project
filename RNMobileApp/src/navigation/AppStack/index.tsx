// React
import React from 'react';

// Screens
import Home from '@screens/Home';
import Settings from '@screens/Settings';

// Stacks
import SettingsStack from './SettingsStack';

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

  const renderIcon = (icon: string, focused: boolean) => {
    return <Icon name={icon} size={20} color={focused ? theme.colors.primary : theme.colors.icon} />;
  };

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
          tabBarIcon: ({ focused }) => renderIcon('house', focused),
        }}
      />
      <Tab.Screen
        name="Workout"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => renderIcon('dumbbell', focused),
        }}
      />
      <Tab.Screen
        name="Food"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => renderIcon('utensils', focused),
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          tabBarIcon: ({ focused }) => renderIcon('gear', focused),
        }}
      />
    </Tab.Navigator>
  );
}
