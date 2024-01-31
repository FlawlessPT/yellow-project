// React and React Native
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

// Components
import Button from '../Button';

// Styles
import { Container, InnerContainer, TextContainer } from './styles';

// External Libs
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

// Assets
import Warning from './../../assets/icons/warning.svg';

// Theme
import theme from './../../theme';

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
  const { t } = useTranslation();

  return (
    <Modal isVisible={isModalVisible}>
      <Container>
        <InnerContainer>
          <Warning width={46} height={42} />
          <TextContainer>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Inter-Regular',
                color: theme.colors.neutral.n700,
                fontWeight: '600',
                textAlign: 'center',
                fontStyle: 'normal',
                includeFontPadding: false,
                lineHeight: 18,
              }}>
              {title}
            </Text>
            {subtitle && (
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Inter-Regular',
                  color: theme.colors.neutral.n600,
                  fontWeight: '400',
                  fontStyle: 'normal',
                  textAlign: 'center',
                  lineHeight: 16,
                }}>
                {subtitle}
              </Text>
            )}
          </TextContainer>
          <Button text={buttonTitle} onPressButton={onPressButton}></Button>
          {isDismissButtonVisible && (
            <TouchableOpacity onPress={onPressDismissButton}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Inter-Regular',
                  color: theme.colors.primary.p300,
                  fontWeight: '600',
                  fontStyle: 'normal',
                  textAlign: 'center',
                  lineHeight: 16,
                }}>
                {t('common.dismiss')}
              </Text>
            </TouchableOpacity>
          )}
        </InnerContainer>
      </Container>
    </Modal>
  );
};

export default ModalPopup;
