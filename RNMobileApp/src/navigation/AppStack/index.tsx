import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '@screens/Home';

import { AppStackEnum, defaultScreenOptions, RootStackEnum } from '../types';

import SettingsStack from './SettingsStack';
import WorkoutStack from './WorkoutStack';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';
import { AppStackParamList } from './types';

// Assets
import { BottomDumbbellIcon, BottomFoodIcon, BottomHomeIcon, BottomPlusIcon, BottomProfileIcon } from '@assets';

export default function AppStack(): JSX.Element {
  const Tab = createBottomTabNavigator<AppStackParamList>();
  const { theme } = useTheme();

  const styles = getStyles(theme);

  const renderIcon = (icon: ImageSourcePropType, focused: boolean) => {
    return <Image source={icon} style={{ tintColor: focused ? theme.colors.primary : theme.colors.icon }} />;
  };

  return (
    <Tab.Navigator
      id={RootStackEnum.APP}
      initialRouteName={AppStackEnum.HOME}
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarStyle: styles.tabNavigator,
        ...defaultScreenOptions,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(BottomHomeIcon, focused),
        }}
      />
      <Tab.Screen
        name="WorkoutStack"
        component={WorkoutStack}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(BottomDumbbellIcon, focused),
        }}
      />
      <Tab.Screen
        name="Add"
        component={Home}
        options={{
          tabBarIcon: () => <Image source={BottomPlusIcon} />,
          tabBarButton: ({ children, onPress }) => (
            <TouchableOpacity style={styles.button} onPress={onPress}>
              {children}
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Food"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(BottomFoodIcon, focused),
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          tabBarIcon: ({ focused }) => renderIcon(BottomProfileIcon, focused),
        }}
      />
    </Tab.Navigator>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      bottom: 10,
      marginHorizontal: 40,
    },
    tabNavigator: {
      backgroundColor: theme.colors.background,
      borderTopWidth: 1.5,
      borderTopColor: theme.colors.border,
      height: 72,
      paddingTop: 10,
      position: 'absolute',
    },
  });
