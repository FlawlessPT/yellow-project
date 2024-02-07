// Styled Components
import styled from 'styled-components/native';

type IconProps = {
  color?: string;
  isLeftIcon?: boolean;
};

export const Icon = styled.Image<IconProps>`
  height: 20px;
  width: 20px;
  tint-color: ${({ color }) => color};
  margin-right: ${({ isLeftIcon }) => (isLeftIcon ? 10 : 0)}px;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
`;

export const InnerContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
