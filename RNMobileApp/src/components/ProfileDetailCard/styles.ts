// Styled Components
import styled from 'styled-components/native';

// Components
import Label from '@components/Label';

export const Card = styled.View`
  flex: 1;
  height: 82px;
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.neutral800};
  justify-content: center;
  align-items: center;
`;

export const CardTitle = styled(Label)`
  margin-bottom: 10px;
`;
