// React and React Native
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// External Libs
import Modal from 'react-native-modal';

// Components
import { Button, Label } from '@components';

// Assets
// import Warning from '@assets/icons/warning.svg';

export type ModalPopupProps = {
  title: string;
  subtitle?: string;
  buttonTitle: string;
  onPressButton: () => void;
  isDismissButtonVisible?: boolean;
  onPressDismissButton?: () => void;
  isModalVisible: boolean;
};

export const ModalPopup = ({
  title,
  subtitle,
  buttonTitle,
  onPressButton,
  isDismissButtonVisible = false,
  onPressDismissButton,
  isModalVisible,
}: ModalPopupProps) => {
  const styles = getStyles();

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {/* <Warning width={46} height={42} /> */}
          <View style={styles.textContainer}>
            <Label text={title} type="h4" textAlign="center" />
            {subtitle && <Label text={subtitle} type="h5" textAlign="center" />}
          </View>
          <Button text={buttonTitle} onPressButton={onPressButton} />
          {isDismissButtonVisible && (
            <TouchableOpacity onPress={onPressDismissButton}>
              <Label text={'common.dismiss'} type="h5" textAlign="center" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalPopup;

const getStyles = () =>
  StyleSheet.create({
    container: {
      padding: 20,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    contentContainer: {
      width: '100%',
      gap: 24,
      alignItems: 'center',
    },
    textContainer: {
      width: '100%',
      gap: 8,
    },
  });
