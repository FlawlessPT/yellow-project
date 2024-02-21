// React and React Native
import React from 'react';

// Assets
import { Back } from '@assets';

// Components
import Label from '@components/Label';

// External Libs
import { Icon } from 'react-native-paper';

// Theme
import useTheme from '@hooks/theme/useTheme';

// Styles
import { ChevronContainer, ContentContainer, MainContainer } from './styles';

export type HeaderProps = {
  title?: string;
  hasBack?: boolean;
  rightItem?: JSX.Element;
  onPressChevron?: () => void;
};

export const Header = ({
  hasBack,
  title,
  rightItem,
  onPressChevron,
}: HeaderProps) => {
  const { theme } = useTheme();

  return (
    <MainContainer>
      {hasBack && (
        <ChevronContainer onPress={onPressChevron}>
          <Icon size={24} source={Back} />
        </ChevronContainer>
      )}
      <ContentContainer>
        {title && (
          <Label
            type="h5"
            text={title}
            color={theme.colors.neutral400}
            textAlign="center"
          />
        )}
      </ContentContainer>
      {rightItem}
    </MainContainer>
  );
};

export default Header;
