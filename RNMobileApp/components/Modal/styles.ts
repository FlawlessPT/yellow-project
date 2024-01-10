import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  padding: 20px;
  align-self: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.neutral.white};
  border-radius: 20px;
`;

export const InnerContainer = styled.View`
  width: 100%;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;

export const TextContainer = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
`;
