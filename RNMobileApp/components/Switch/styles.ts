// Styled Components
import styled from 'styled-components/native';

// React and React Native
import { Animated } from 'react-native';

interface SwitchProps {
  isEnabled?: boolean;
}

export const Container = styled.TouchableOpacity<SwitchProps>`
  height: 24px;
  width: 40px;
  border-radius: 48px;
  justify-content: center;
  padding: 2px;
`;

export const InnerContainer = styled(Animated.View)<SwitchProps>`
  height: 20px;
  width: 20px;
  border-radius: 48px;
  position: absolute;
  left: 4px;
`;
