import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Back } from '@assets';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-paper';

import Label from '@components/Label';

import useTheme from '@hooks/theme/useTheme';

export type HeaderProps = {
  title?: string;
  hasBack?: boolean;
  rightItem?: JSX.Element;
  onBack?: () => void;
};

export const Header = ({ hasBack, title, rightItem, onBack }: HeaderProps) => {
  const { goBack } = useNavigation();

  const { theme } = useTheme();

  const styles = getStyles();

  return (
    <View style={styles.container}>
      {hasBack && (
        <TouchableOpacity onPress={onBack ?? goBack}>
          <Icon size={24} source={Back} />
        </TouchableOpacity>
      )}
      <View style={styles.contentContainer}>
        {title && <Label type="h5" text={title} color={theme.colors.neutral400} textAlign="center" />}
      </View>
      {rightItem}
    </View>
  );
};

export default Header;

const getStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 8,
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
  });
