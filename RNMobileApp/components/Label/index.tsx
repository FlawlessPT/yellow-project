// React and React Native
import React from 'react';
import { Text, TextStyle, View } from 'react-native';

// Styles

// Theme
import theme from './../../theme';

interface LabelProps {
  text: string;
  size: number;
  fontWeight?: TextStyle['fontWeight'];
  color?: string;
  textAlign?: TextStyle['textAlign'];
}

export const Label = ({
  text,
  size,
  fontWeight = '400',
  color = theme.colors.neutral.n600,
  textAlign = 'left',
}: LabelProps) => {
  return (
    <>
      <Text
        style={{
          fontSize: size,
          fontFamily: 'Inter-Regular',
          fontWeight: fontWeight,
          includeFontPadding: false,
          textAlignVertical: 'center',
          verticalAlign: 'middle',
          color: color,
          textAlign: textAlign,
        }}>
        {text}
      </Text>
    </>
  );
};

export default Label;
