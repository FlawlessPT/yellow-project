// React and React Native
import React from 'react';

// Types
import { LabelProps } from './types';

// Styles
import { DefaultText } from './styles';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// External Libs
import { useTranslation } from 'react-i18next';

// Utils
import { getTypographySpecification } from './utils';

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

  return (
    <DefaultText
      fontFamily={
        bold
          ? theme.fonts.bold
          : semibold
          ? theme.fonts.semibold
          : medium
          ? theme.fonts.medium
          : theme.fonts.regular
      }
      color={color || theme.colors.black}
      textAlign={textAlign}
      numberOfLines={numberOfLines}
      allowFontScaling={false}
      isUnderline={isUnderline}
      opacity={opacity}
      style={style}
      ellipsizeMode={ellipsize ? 'tail' : undefined}
      {...getTypographySpecification(type)}>
      {text && t(text)}
      {children}
    </DefaultText>
  );
};

export default Label;
