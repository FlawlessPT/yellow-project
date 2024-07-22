import React from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Back } from '@assets';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Label from '@components/Label';
import { LabelProps } from '@components/Label/types';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

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
  headerStyle?: StyleProp<ViewStyle>;
} & LabelProps;

const Page = ({
  children,
  titleColor,
  title,
  right,
  withBack,
  header,
  withoutHorizontalMargin = false,
  bounces = true,
  contentContainerStyle,
  headerStyle,
  ...props
}: PageProps) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const { theme } = useTheme();

  const styles = getStyles(theme, withoutHorizontalMargin);

  return (
    <SafeAreaView style={styles.container}>
      {header}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={contentContainerStyle} bounces={bounces}>
        <View style={styles.header}>
          {withBack && (
            <IconButton icon={Back} size={24} iconColor={theme.colors.neutral300} onPress={() => navigation.goBack()} />
          )}
        </View>
        <View style={[styles.header, headerStyle]}>
          <Label text={title} type="h2" color={titleColor ?? theme.colors.neutral200} semibold {...props} />
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
