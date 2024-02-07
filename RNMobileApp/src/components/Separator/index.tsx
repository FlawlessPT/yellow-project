// React and React Native
import React from 'react';
import { Text } from 'react-native';

// Styles
import { Container, Line } from './styles';

// Theme
import useTheme from '@hooks/theme/useTheme';

type SeparatorProps = {
  text?: string;
};

export const Separator = ({ text }: SeparatorProps) => {
  const { theme } = useTheme();
  return (
    <Container>
      <Line />
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Poppins-Regular',
          includeFontPadding: false,
          textAlignVertical: 'center',
          verticalAlign: 'middle',
          color: theme.colors.disabled,
        }}>
        {text}
      </Text>
      <Line />
    </Container>
  );
};

export default Separator;
