import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppStackEnum } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';

import Label from '@components/Label';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

type PageProps = {
  children?: React.ReactNode;
  titleColor?: string;
  title?: string;
  right?: React.ReactNode;
  withClose?: boolean;
  withBack?: boolean;
};

const Page = ({ children, titleColor, title, right, withBack, withClose }: PageProps) => {
  const navigation = useNavigation();

  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <Label text={title} type="h1" color={titleColor ?? theme.colors.neutral200} semibold />
          {right}
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingBottom: 20,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 18,
    },
  });
