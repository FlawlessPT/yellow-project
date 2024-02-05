import styled from 'styled-components/native';

interface CalendarProps {
  error?: string;
}

export const MainContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

export const ContentContainer = styled.TouchableOpacity<CalendarProps>`
  display: flex;
  padding: 14px 12px;
  height: 48px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 10px;
`;

export const InnerContainer = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ErrorContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  padding-left: 8px;
  padding-top: 8px;
`;

export const errorLabelStyle = {
  paddingLeft: 4,
  paddingTop: 0,
};
