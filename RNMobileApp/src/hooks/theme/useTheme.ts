import { useContext, useEffect } from 'react';

import { ThemeContext } from '@providers/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { storageKeys } from '@utils/storage-keys';

import { darkTheme, lightTheme, Theme, ThemeMode } from '@theme';

type UseThemeResult = {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => Promise<void>;
};

const getTheme: {
  [key in ThemeMode]: Theme;
} = {
  [ThemeMode.LIGHT]: lightTheme,
  [ThemeMode.DARK]: darkTheme,
};

const useTheme = (): UseThemeResult => {
  const { themeMode, changeTheme } = useContext(ThemeContext);

  useEffect(() => {
    const getThemeMode = async () => {
      const storedTheme = (await AsyncStorage.getItem(storageKeys.theme)) as ThemeMode;
      if (storedTheme) {
        changeTheme(storedTheme);
      }
    };

    getThemeMode();
  }, [changeTheme]);

  const toggleTheme = async () => {
    const newThemeMode = themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    await AsyncStorage.setItem(storageKeys.theme, newThemeMode);
    changeTheme(newThemeMode);
  };

  return {
    theme: getTheme[themeMode],
    themeMode,
    toggleTheme,
  };
};

export default useTheme;
