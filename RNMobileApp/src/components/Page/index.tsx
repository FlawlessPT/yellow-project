// React and React Native
import React from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

// Theme
import { Theme } from '@theme';

// Components
import Label from '@components/Label';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// Types
import { AppStackEnum } from '../../navigation/types';

// External Libs
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { SafeAreaView } from 'react-native-safe-area-context';

type PageProps = {
  children?: React.ReactNode;
  titleColor?: string;
  title?: string;
  right?: React.ReactNode;
  withClose?: boolean;
  withBack?: boolean;
  header?: React.ReactNode;
  withoutHorizontalMargin?: boolean;
  bounces?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const Page = ({
  children,
  titleColor,
  title,
  right,
  withBack,
  withClose,
  header,
  withoutHorizontalMargin = false,
  bounces = true,
  contentContainerStyle,
}: PageProps) => {
  const navigation = useNavigation();

  const { theme } = useTheme();

  const styles = getStyles(theme, withoutHorizontalMargin);

  return (
    <SafeAreaView style={styles.container}>
      {header}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={contentContainerStyle} bounces={bounces}>
        <View style={styles.header}>
          {withBack && (
            <Icon name="chevron-left" color={theme.colors.neutral300} size={24} onPress={() => navigation.goBack()} />
          )}
          {withClose && (
            <Icon
              name="xmark"
              color={theme.colors.neutral300}
              size={24}
              onPress={() => navigation.navigate(AppStackEnum.HOME as never)}
            />
          )}
        </View>
        <View style={styles.header}>
          <Label text={title} type="h2" color={titleColor ?? theme.colors.neutral200} semibold />
          {right}
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;

const getStyles = (theme: Theme, withoutHorizontalMargin: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: withoutHorizontalMargin ? 0 : 16,
      paddingBottom: 50,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 18,
      paddingHorizontal: !withoutHorizontalMargin ? 0 : 16,
    },
    scrollview: {
      flex: 1,
    },
  });
