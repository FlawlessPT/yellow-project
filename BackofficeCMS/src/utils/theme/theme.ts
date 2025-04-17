import { AdminProps, defaultDarkTheme, defaultLightTheme } from 'react-admin';

const lightTheme = {
  ...defaultLightTheme,
  palette: {
    ...defaultLightTheme.palette,
    secondary: {
      ...defaultLightTheme.palette?.secondary,
      main: '#FDCA00',
    },
  },
};

const darkTheme = defaultDarkTheme;

export const themeConfigs: AdminProps = {
  lightTheme,
  darkTheme,
};

export default themeConfigs;
