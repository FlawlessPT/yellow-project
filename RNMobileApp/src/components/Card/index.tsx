// React and React Native
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// Components
import Label from '@components/Label';
import CardItem, { ItemType } from '@components/CardItem';

type CardProps = {
  image: string;
  title: string;
  items?: ItemType[];
};

const Card = ({ image, title, items }: CardProps) => {
  const { theme } = useTheme();

  const styles = getStyles();

  return (
    <ImageBackground source={{ uri: image }} imageStyle={styles.card} style={styles.container}>
      <Label text={title} type="h1" semibold color={theme.colors.white} />
      <View style={styles.row}>
        {items?.map((item, index) => <CardItem key={index} icon={item.icon} text={item.text} />)}
      </View>
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
    container: { height: 182, padding: 24, justifyContent: 'space-between' },
    row: {
      flexDirection: 'row',
      gap: 16,
    },
  });
