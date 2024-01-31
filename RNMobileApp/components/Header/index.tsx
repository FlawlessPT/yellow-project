// React and React Native
import React from 'react';
import { Image, ImageStyle, StyleProp, Text } from 'react-native';

// Styles
import {
  ChevronContainer,
  ContentContainer,
  MainContainer,
  logoStyle,
} from './styles';

// Assets
import Chevron from './../../assets/icons/chevron-left.svg';

// Theme
import useTheme from '@hooks/theme/useTheme';

export interface HeaderProps {
  pageName?: string;
  onPressChevron: () => void;
}

export const Header = ({ pageName, onPressChevron }: HeaderProps) => {
  const { theme } = useTheme();

  return (
    <MainContainer>
      <ChevronContainer onPress={onPressChevron}>
        <Chevron width={24} height={24} />
      </ChevronContainer>
      <ContentContainer>
        {pageName ? (
          <>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Poppins-Regular',
                includeFontPadding: false,
                textAlignVertical: 'center',
                verticalAlign: 'middle',
                color: theme.colors.disabled,
              }}>
              {pageName}
            </Text>
          </>
        ) : (
          <Image
            style={logoStyle as StyleProp<ImageStyle>}
            resizeMode="contain"
            source={{
              uri: 'https://www.ireland-portugal.com/apr-img/Mobiweb.png',
            }}
          />
        )}
      </ContentContainer>
    </MainContainer>
  );
};

export default Header;
