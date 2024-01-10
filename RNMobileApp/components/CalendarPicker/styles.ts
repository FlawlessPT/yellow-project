import styled from 'styled-components/native';
import theme from '../../theme';

export const MainContainer = styled.TouchableOpacity`
  display: flex;
  padding: 14px 12px;
  height: 48px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 10px;
  background-color: ${theme.colors.neutral.white};
  border: 1px ${theme.colors.neutral.n200};
`;

export const InnerContainer = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
