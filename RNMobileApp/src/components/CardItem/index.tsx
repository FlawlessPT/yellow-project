import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

import Label from '@components/Label';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

export type ItemType = {
  icon: ImageSourcePropType;
  text: string;
};

const Item = ({ icon, text }: ItemType) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Image source={icon} />
      <Label text={text} type="footnote" style={styles.text} />
    </View>
  );
};

export default Item;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      opacity: 0.8,
      backgroundColor: theme.colors.white,
      paddingHorizontal: 6,
      paddingVertical: 4,
      alignSelf: 'flex-start',
    },
    text: {
      marginLeft: 4,
    },
  });
