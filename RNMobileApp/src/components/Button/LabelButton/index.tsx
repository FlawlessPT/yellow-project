/* React and React Native */
import React from 'react';
import { ImageSourcePropType } from 'react-native';

/* Components */
import Label from '@components/Label';
import { LabelProps } from '@components/Label/types';

/* Styles */
import { Button, InnerContainer, Icon } from './styles';

export type LabelButtonProps = {
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  leftIconColor?: string;
  rightIconColor?: string;
  onPress: () => void;
};

const LabelButton = ({
  text,
  type,
  bold = false,
  isUnderline = false,
  textAlign = 'left',
  color,
  leftIcon,
  rightIcon,
  leftIconColor,
  rightIconColor,
  style,
  onPress,
}: LabelButtonProps & LabelProps) => {
  return (
    <Button style={style} onPress={onPress}>
      <InnerContainer>
        {leftIcon && (
          <Icon source={leftIcon} color={leftIconColor} isLeftIcon />
        )}
        <Label
          type={type || 'h5'}
          text={text}
          bold={bold}
          color={color}
          isUnderline={isUnderline}
          textAlign={textAlign}
        />
        {rightIcon && <Icon source={rightIcon} color={rightIconColor} />}
      </InnerContainer>
    </Button>
  );
};

export default LabelButton;
