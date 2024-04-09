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

  const styles = getStyles();

  return (
    <View style={styles.container}>
      {hasBack && (
        <TouchableOpacity
          style={styles.chevronContainer}
          onPress={onPressChevron}>
          <Icon size={24} source={Back} />
        </TouchableOpacity>
      )}
      <View style={styles.contentContainer}>
        {title && (
          <Label
            type="h5"
            text={title}
            color={theme.colors.neutral400}
            textAlign="center"
          />
        )}
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
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
    chevronContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
