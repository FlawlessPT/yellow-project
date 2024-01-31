/* Styled Components */
import { DefaultTheme } from 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      red: string;
      green: string;
      white: string;
      black: string;
      disabled: string;
    };
    fonts: { regular: string; medium: string; semibold: string; bold: string };
  }
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
    red: '#1F2223',
    green: '#1F2223',
    white: '#FFFFFF',
    black: '#000000',
    disabled: '#7D7D7D',
  },
  fonts,
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: '#FDCA00',
    red: '#1F2223',
    green: '#1F2223',
    white: '#FFFFFF',
    black: '#000000',
    disabled: '#7D7D7D',
  },
  fonts,
};
