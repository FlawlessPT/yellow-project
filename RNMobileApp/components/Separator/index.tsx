// React and React Native
import React from 'react';
import {Text} from 'react-native';

// Styles
import {Container, Line} from './styles';

// Theme
import theme from './../../theme';

interface SeparatorProps {
  text?: string;
}

export const Separator = ({text}: SeparatorProps) => {
  return (
    <Container>
      <Line />
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Inter-Regular',
          includeFontPadding: false,
          textAlignVertical: 'center',
          verticalAlign: 'middle',
          color: theme.colors.neutral.n300,
        }}>
        {text}
      </Text>
      <Line />
    </Container>
  );
};

export default Separator;
