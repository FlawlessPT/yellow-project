// React and React Native
import React from 'react';

// Styles
import {Button} from './styles';

// Assets
import Apple from './../../assets/icons/social/apple.svg';
import Microsoft from './../../assets/icons/social/microsoft.svg';
import Google from './../../assets/icons/social/google.svg';

export type ButtonType = 'apple' | 'microsoft' | 'google';

export interface ButtonProps {
  typeButton: ButtonType;
  onPressButton: () => void;
}

export interface LogoComponentProps {
  type: string;
  width: number;
  height: number;
}

const LogoComponent = ({type, width, height}: LogoComponentProps) => {
  let Logo;

  switch (type) {
    case 'apple':
      Logo = Apple;
      break;
    case 'microsoft':
      Logo = Microsoft;
      break;
    case 'google':
      Logo = Google;
      break;
    default:
      Logo = null;
  }
  if (Logo) {
    return <Logo width={width} height={height} />;
  } else {
    return <></>;
  }
};

export const SocialLoginButton = ({typeButton, onPressButton}: ButtonProps) => (
  <Button onPress={onPressButton}>
    <LogoComponent type={typeButton} width={24} height={24} />
  </Button>
);

export default SocialLoginButton;
