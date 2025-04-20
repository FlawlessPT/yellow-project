import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { useTranslation } from 'react-i18next';

import { LabelProps } from './types';
import { getTypographySpecification } from './utils';
import useTheme from '@hooks/theme/useTheme';

export const Label = ({
  text,
  type = 'body',
  semibold = false,
  bold = false,
  medium = false,
  color,
  textAlign = 'left',
  numberOfLines,
  isUnderline = false,
  opacity = 1,
  children,
  style,
  ellipsize,
}: LabelProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const fontFamily = bold
    ? theme.fonts.bold
    : semibold
      ? theme.fonts.semibold
      : medium
        ? theme.fonts.medium
        : theme.fonts.regular;

  const styles = getStyles(
    fontFamily,
    color ?? theme.colors.black,
    textAlign,
    getTypographySpecification(type).size,
    getTypographySpecification(type).lineHeight,
    isUnderline,
    opacity
  );

  return (
    <Text
      numberOfLines={numberOfLines}
      allowFontScaling={false}
      style={[styles.label, style]}
      ellipsizeMode={ellipsize ? 'tail' : undefined}
    >
      {text && t(text)}
      {children}
    </Text>
  );
};

export default Label;

const getStyles = (
  fontFamily: string,
  color: string,
  textAlign: 'left' | 'center' | 'right',
  fontSize: number,
  lineHeight: number,
  isUnderline: boolean,
  opacity: number
) =>
  StyleSheet.create({
    label: {
      fontFamily,
      color,
      textAlign,
      fontSize,
      lineHeight,
      textDecorationLine: isUnderline ? 'underline' : 'none',
      textDecorationColor: color,
      opacity,
    },
  });
