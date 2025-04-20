import { AdminProps, defaultDarkTheme, defaultLightTheme } from 'react-admin';

const lightTheme: AdminProps['theme'] = {
  ...defaultLightTheme,
  palette: {
    ...defaultLightTheme.palette,
    secondary: {
      ...defaultLightTheme.palette?.secondary,
      main: '#FDCA00',
    },
  },
};

const darkTheme: AdminProps['theme'] = defaultDarkTheme;

export const themeConfigs: AdminProps = {
  lightTheme,
  darkTheme,
};

export default themeConfigs;
