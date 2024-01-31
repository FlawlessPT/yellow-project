// React and React Native
import React from 'react';
import { Text, TextStyle, View } from 'react-native';

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
  fontWeight,
  color,
  textAlign = 'left',
}: LabelProps) => {
  return (
    <>
      <Text
        style={{
          fontSize: size,
          fontFamily: 'Poppins-Regular',
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
