// Styled Components
import { DefaultTheme } from 'styled-components/native';

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

declare module 'styled-components/native' {
  export type DefaultTheme = {
    colors: {
      primary: string;
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
      background: string;
    };
    fonts: { regular: string; medium: string; semibold: string; bold: string };
  };
}

const fonts = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semibold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
};

export const lightTheme: DefaultTheme = {
  colors: {
    primary: '#FDCA00',
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
    background: '#161617',
  },
  fonts,
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: '#FDCA00',
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
    background: '#161617',
  },
  fonts,
};
