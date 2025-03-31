import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

import { BottomDumbbellIcon, BottomFoodIcon, BottomHomeIcon, BottomPlusIcon, BottomProfileIcon } from '@assets';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '@screens/Home';

import { AppStackEnum, defaultScreenOptions, RootStackEnum } from '../types';

import MealStack from './MealStack';
import SettingsStack from './SettingsStack';
import { AppStackParamList } from './types';
import UpdatesStack from './UpdatesStack';
import WorkoutStack from './WorkoutStack';
import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

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
        component={UpdatesStack}
        options={{
          tabBarIcon: () => (
            <View style={styles.addButtonIcon}>
              <Image source={BottomPlusIcon} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MealStack"
        component={MealStack}
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
    addButtonIcon: {
      width: 55,
      height: 55,
      borderRadius: 18,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 43,
      shadowColor: theme.colors.primary,
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 18 },
      shadowRadius: 40,
      elevation: 5,
    },
  });
