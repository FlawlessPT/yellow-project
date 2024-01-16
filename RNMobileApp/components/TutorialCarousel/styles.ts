import theme from '@theme';
import styled from 'styled-components/native';

export const MainContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.neutral.white};
  padding-horizontal: 20px;
`;

export const ContentContainer = styled.SafeAreaView`
  flex: 1;
  padding-horizontal: 20px;
`;

export const TopBar = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-vertical: 18px;
  justify-content: space-between;
`;

export const CarrouselContainer = styled.View`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const ImageContainer = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
`;

export const PaginationContainer = styled.View`
  display: flex;
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const BubbleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;
