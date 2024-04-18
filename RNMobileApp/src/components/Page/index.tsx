// React and React Native
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// Theme
import { Theme } from '@theme';

// Components
import Label from '@components/Label';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// External Libs
import Icon from 'react-native-vector-icons/FontAwesome6';

type PageProps = {
  children?: React.ReactNode;
  titleColor?: string;
  title?: string;
  right?: React.ReactNode;
  withClose?: boolean;
  withBack?: boolean;
  onClose?: () => void;
  onBack?: () => void;
};

const Page = ({ children, titleColor, title, right, withBack, withClose, onClose, onBack }: PageProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        {withBack && <Icon name="chevron-left" color={theme.colors.neutral300} size={24} onPress={onBack} />}
        {withClose && <Icon name="xmark" color={theme.colors.neutral300} size={24} onPress={onClose} />}
      </View>
      <View style={styles.header}>
        <Label text={title} type="h1" color={titleColor ?? theme.colors.neutral200} semibold />
        {right}
      </View>
      {children}
    </ScrollView>
  );
};

export default Page;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingVertical: 50,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 18,
    },
  });
