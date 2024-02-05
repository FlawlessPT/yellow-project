// React and React Native
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

// Styles
import {
  ActiveCheckboxContainer,
  CheckboxContainer,
  CheckedIcon,
  Container,
  RightElementContainer,
} from './styles';

// Assets
import { SelectedCheckbox } from '@assets';

// Hooks
import useTheme from '@hooks/theme/useTheme';

interface CheckboxProps {
  bgColor?: string;
  checkedBgColor?: string;
  borderColor?: string;
  borderWidth?: number;
  isChecked?: boolean;
  rightElement?: React.ReactElement;
  reverseOrder?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const Checkbox = ({
  bgColor,
  checkedBgColor,
  borderColor,
  borderWidth = 1,
  isChecked,
  rightElement,
  reverseOrder = false,
  style,
  onPress,
}: CheckboxProps) => {
  const { theme } = useTheme();

  return (
    <Container reverseOrder={reverseOrder}>
      {isChecked ? (
        <ActiveCheckboxContainer
          reverseOrder={reverseOrder}
          bgColor={theme.colors.primary || checkedBgColor}
          borderColor={checkedBgColor}
          borderWidth={borderWidth}
          style={style}
          onPress={onPress}>
          <CheckedIcon
            source={SelectedCheckbox}
            size={9}
            iconColor={theme.colors.white}
          />
        </ActiveCheckboxContainer>
      ) : (
        <CheckboxContainer
          reverseOrder={reverseOrder}
          bgColor={bgColor}
          borderColor={theme.colors.primary || borderColor}
          borderWidth={borderWidth}
          style={style}
          onPress={onPress}
        />
      )}
      {rightElement && (
        <RightElementContainer
          style={style}
          reverseOrder={reverseOrder}
          onPress={onPress}>
          {rightElement}
        </RightElementContainer>
      )}
    </Container>
  );
};

export default Checkbox;
