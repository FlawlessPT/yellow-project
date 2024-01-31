// Styled Components
import styled from 'styled-components/native';

interface LabelProps {
  color: string;
  fontFamily: string;
  textAlign: 'left' | 'center' | 'right';
  size: number;
  lineHeight: number;
  isUnderline: boolean;
  opacity: number;
}

export const DefaultText = styled.Text<LabelProps>`
  font-family: ${({ fontFamily }) => fontFamily};
  color: ${({ color }) => color};
  text-align: ${({ textAlign }) => textAlign};
  font-size: ${({ size }) => size}px;
  line-height: ${({ lineHeight }) => lineHeight}px;
  text-decoration: ${({ isUnderline }) => (isUnderline ? 'underline' : 'none')};
  text-decoration-color: ${({ color }) => color};
  opacity: ${({ opacity }) => opacity};
`;
