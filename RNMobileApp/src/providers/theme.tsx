// React and React Native
import { useColorScheme } from 'react-native';
import React, { PropsWithChildren, createContext, useState } from 'react';

// Theme
import { ThemeMode } from '@theme';

export const ThemeContext = createContext({
  themeMode: ThemeMode.LIGHT,
  changeTheme: (_newTheme: ThemeMode) => {
    return;
  },
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const deviceThemeMode = useColorScheme();
  const deviceTheme = deviceThemeMode === 'light' ? ThemeMode.LIGHT : ThemeMode.DARK;
  const [themeMode, setThemeMode] = useState<ThemeMode>(deviceTheme);

  const changeTheme = (newThemeMode: ThemeMode) => {
    setThemeMode(newThemeMode);
  };

  return <ThemeContext.Provider value={{ themeMode, changeTheme }}>{children}</ThemeContext.Provider>;
};
