import React from 'react';

import { Apple, Google, Microsoft } from '@assets';
import { IconButton } from 'react-native-paper';

type ButtonType = 'apple' | 'microsoft' | 'google';

type ButtonProps = {
  buttonType: ButtonType;
  onPressButton: () => void;
};

const getLogo = (buttonType: ButtonType) => {
  switch (buttonType) {
    case 'apple':
      return Apple;

    case 'microsoft':
      return Microsoft;

    case 'google':
      return Google;
  }
};

export const SocialLoginButton = ({ buttonType, onPressButton }: ButtonProps) => {
  return <IconButton style={{ borderWidth: 1 }} size={30} icon={getLogo(buttonType)} onPress={onPressButton} />;
};

export default SocialLoginButton;
