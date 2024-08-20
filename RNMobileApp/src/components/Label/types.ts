import { StyleProp, TextStyle } from 'react-native';

export type LabelProps = {
  text?: string;
  type?: TypographyType;
  semibold?: boolean;
  bold?: boolean;
  medium?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  color?: string;
  numberOfLines?: number;
  isUnderline?: boolean;
  opacity?: number;
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  ellipsize?: boolean;
};

export type TypographySpecification = {
  size: number;
  lineHeight: number;
};

export type TypographyType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'footnote' | 'size10';

export enum TypographyTypeEnum {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  Body = 'body',
  Footnote = 'footnote',
  Size10 = 'size10',
}
