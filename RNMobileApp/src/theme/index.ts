export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    red: string;
    green: string;
    white: string;
    black: string;
    disabled: string;
    outline: string;
    neutral800: string;
    neutral700: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    neutral500: string;
    neutral900: string;
    neutral100: string;
    background: string;
    border: string;
    icon: string;
    light_grey: string;
    input_background: string;
    passwordIcon: string;
    shadow: string;
    opacityPrimary: string;
  };
  fonts: { regular: string; medium: string; semibold: string; bold: string };
};

const fonts = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semibold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
};

export const lightTheme: Theme = {
  colors: {
    primary: '#FDCA00',
    secondary: '#E4B600',
    red: '#EA2A2A',
    green: '#0FA456',
    white: '#FFFFFF',
    black: '#000000',
    disabled: '#7D7D7D',
    outline: '#BABABA',
    neutral800: '#1F1F22',
    neutral700: '#2B2B2B',
    neutral200: '#EAEAEA',
    neutral300: '#DBDBDB',
    neutral400: '#BABABA',
    neutral500: '#7D7D7D',
    neutral900: '#161617',
    neutral100: '#F9F9F9',
    background: '#161617',
    border: '#2A2A2C',
    icon: '#595959',
    light_grey: '#D7D8D9',
    input_background: '#24262B',
    passwordIcon: '#50535B',
    shadow: '#F25D29',
    opacityPrimary: '#504311',
  },
  fonts,
};

export const darkTheme: Theme = {
  colors: {
    primary: '#FDCA00',
    secondary: '#E4B600',
    red: '#EA2A2A',
    green: '#0FA456',
    white: '#FFFFFF',
    black: '#000000',
    disabled: '#7D7D7D',
    outline: '#BABABA',
    neutral800: '#1F1F22',
    neutral700: '#2B2B2B',
    neutral200: '#EAEAEA',
    neutral300: '#DBDBDB',
    neutral400: '#BABABA',
    neutral500: '#7D7D7D',
    neutral900: '#161617',
    neutral100: '#F9F9F9',
    background: '#161617',
    border: '#2A2A2C',
    icon: '#595959',
    light_grey: '#D7D8D9',
    input_background: '#24262B',
    passwordIcon: '#50535B',
    shadow: '#F25D29',
    opacityPrimary: '#504311',
  },
  fonts,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
