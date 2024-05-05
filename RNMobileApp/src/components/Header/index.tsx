// React and React Native
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// Assets
import { Back } from '@assets';

// Components
import Label from '@components/Label';

// External Libs
import { Icon } from 'react-native-paper';

// Theme
import useTheme from '@hooks/theme/useTheme';
import { useNavigation } from '@react-navigation/native';

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
