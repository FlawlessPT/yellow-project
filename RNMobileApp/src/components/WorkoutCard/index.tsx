// React and React Native
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Linking } from 'react-native';

// Theme
import { Theme } from '@theme';

// Components
import { Label } from '@components';

// Assets
import { PlayWhiteIcon } from '@assets';

// Hooks
import useTheme from '@hooks/theme/useTheme';
import { useTranslation } from 'react-i18next';

type Workout = {
  videoUrl: string;
  image: string;
  name: string;
  series: string;
  reps: string;
  notes?: string;
};

type WorkoutCardProps = {
  item: Workout;
};

const WorkoutCard = ({ item }: WorkoutCardProps) => {
  const { image, name, reps, series, notes, videoUrl } = item;

  const { theme } = useTheme();
  const { t } = useTranslation();

  const styles = getStyles(theme);

  return (
    <View style={styles.workoutContainer}>
      <View style={styles.firstColumn}>
        <Image source={{ uri: image }} style={styles.image} />
        <View>
          <Label semibold text={name} color={theme.colors.white} />
          <Label
            type="footnote"
            text={`${series} ${t('series')} • ${reps} ${t('reps')}`}
            color={theme.colors.neutral300}
            style={styles.repsLabel}
          />
          <Label type="footnote" text={notes} color={theme.colors.neutral400} />
        </View>
      </View>
      <TouchableOpacity style={styles.playContainer} onPress={() => Linking.openURL(videoUrl)}>
        <Image source={PlayWhiteIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutCard;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    workoutContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
      marginHorizontal: 16,
    },
    image: {
      width: 64,
      height: 64,
      marginRight: 16,
    },
    firstColumn: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    playContainer: {
      width: 40,
      height: 40,
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.25,
    },
    repsLabel: {
      marginVertical: 4,
    },
  });
