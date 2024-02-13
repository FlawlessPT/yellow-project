// React and React Native
import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';

// Theme
import { darkTheme, lightTheme, ThemeMode } from '@theme';

// Constants
import { storageKeys } from '@utils/storage-keys';

// External Libs
import { DefaultTheme } from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UseThemeResult = {
  theme: DefaultTheme;
  themeMode: ThemeMode;
  changeTheme: () => Promise<void>;
};

const getTheme = {
  [ThemeMode.LIGHT]: lightTheme,
  [ThemeMode.DARK]: darkTheme,
};

const useTheme = (): UseThemeResult => {
  const deviceThemeMode = Appearance.getColorScheme();
  const deviceTheme =
    deviceThemeMode === 'light' ? ThemeMode.LIGHT : ThemeMode.DARK;
  const [themeMode, setThemeMode] = useState<ThemeMode>(deviceTheme);

  useEffect(() => {
    const getThemeMode = async () => {
      const storedTheme =
        (await AsyncStorage.getItem(storageKeys.theme)) || deviceTheme;
      setThemeMode(storedTheme as ThemeMode);
    };

    getThemeMode();
  }, [deviceTheme]);

  const changeTheme = async () => {
    const newTheme =
      themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    await AsyncStorage.setItem(storageKeys.theme, newTheme);
    setThemeMode(newTheme);
  };

  return {
    theme: getTheme[themeMode],
    themeMode,
    changeTheme,
  };
};

export default useTheme;
