import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

import CardItem, { ItemType } from '@components/CardItem';
import Label from '@components/Label';

import useTheme from '@hooks/theme/useTheme';

type CardProps = {
  image: string;
  title: string;
  subtitle?: string[];
  item?: ItemType;
};

const Card = ({ image, title, subtitle, item }: CardProps) => {
  const { theme } = useTheme();

  const styles = getStyles();

  return (
    <ImageBackground source={{ uri: image }} imageStyle={styles.card} style={styles.container}>
      <View>
        <Label text={title} type="h2" semibold color={theme.colors.white} />
        <View style={styles.row}>
          {subtitle?.map((text, index) => (
            <Label key={index} text={text} type="footnote" color={theme.colors.neutral300} />
          ))}
        </View>
      </View>
      {item && <CardItem {...item} />}
    </ImageBackground>
  );
};

export default Card;

const getStyles = () =>
  StyleSheet.create({
    card: {
      borderRadius: 24,
      opacity: 0.4,
    },
    container: { height: 182, padding: 24, width: 320, justifyContent: 'space-between', flexGrow: 0 },
    row: {
      flexDirection: 'row',
      gap: 16,
    },
  });
