// React and React Native
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

// Components
import Button from '../Button';
import Label from '@components/Label';

// External Libs
import Modal from 'react-native-modal';

// Theme
import useTheme from '@hooks/theme/useTheme';

// Assets
import Warning from './../../assets/icons/warning.svg';

// Styles
import { Container, InnerContainer, TextContainer } from './styles';

export interface ModalPopupProps {
  title: string;
  subtitle?: string;
  buttonTitle: string;
  onPressButton: () => void;
  isDismissButtonVisible?: boolean;
  onPressDismissButton?: () => void;
  isModalVisible: boolean;
}

export const ModalPopup = ({
  title,
  subtitle,
  buttonTitle,
  onPressButton,
  isDismissButtonVisible = false,
  onPressDismissButton,
  isModalVisible,
}: ModalPopupProps) => {
  const { theme } = useTheme();

  return (
    <Modal isVisible={isModalVisible}>
      <Container>
        <InnerContainer>
          <Warning width={46} height={42} />
          <TextContainer>
            <Label text={title} type="h4" textAlign="center" />
            {subtitle && <Label text={subtitle} type="h5" textAlign="center" />}
          </TextContainer>
          <Button text={buttonTitle} onPressButton={onPressButton} />
          {isDismissButtonVisible && (
            <TouchableOpacity onPress={onPressDismissButton}>
              <Label text={'common.dismiss'} type="h5" textAlign="center" />
            </TouchableOpacity>
          )}
        </InnerContainer>
      </Container>
    </Modal>
  );
};

export default ModalPopup;
