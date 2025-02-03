import React, { useState } from 'react';
import { Image, ImageBackground, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';

import { PlayWhiteIcon } from '@assets';
import { useTranslation } from 'react-i18next';

import { Label, LabelButton } from '@components';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

type Workout = {
  id: number;
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

  const [finishedWorkouts, setFinishedWorkouts] = useState<number[]>([]);

  const isSelected = finishedWorkouts.includes(item.id);

  const styles = getStyles(theme, isSelected);

  const handleFinishWorkout = () => {
    if (!isSelected) {
      setFinishedWorkouts([...finishedWorkouts, item.id]);
    } else {
      setFinishedWorkouts(finishedWorkouts.filter((id) => id !== item.id));
    }
  };

  return (
    <View style={styles.workoutContainer}>
      <View style={styles.firstColumn}>
        <ImageBackground source={{ uri: image }} style={styles.image}>
          <TouchableOpacity style={styles.playContainer} onPress={() => Linking.openURL(videoUrl)}>
            <Image source={PlayWhiteIcon} />
          </TouchableOpacity>
        </ImageBackground>
        <View>
          <Label semibold text={name} color={theme.colors.white} />
          <Label
            type="footnote"
            text={`${series} ${t('series')} • ${reps} ${t('reps')}`}
            color={theme.colors.neutral300}
            style={styles.repsLabel}
          />
          {notes && <Label type="footnote" text={notes} color={theme.colors.neutral500} />}
        </View>
      </View>
      <LabelButton
        style={styles.doneButton}
        text="done.title"
        type="footnote"
        semibold
        color={isSelected ? theme.colors.neutral700 : theme.colors.primary}
        onPress={handleFinishWorkout}
      />
    </View>
  );
};

export default WorkoutCard;

const getStyles = (theme: Theme, isSelected: boolean) =>
  StyleSheet.create({
    workoutContainer: {
      backgroundColor: theme.colors.neutral800,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
      marginHorizontal: 16,
      padding: 12,
      borderRadius: 12,
    },
    image: {
      width: 64,
      height: 64,
      marginRight: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    firstColumn: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    playContainer: {
      width: 40,
      height: 40,
      backgroundColor: theme.colors.mediumBlack,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    repsLabel: {
      marginVertical: 4,
    },
    doneButton: {
      backgroundColor: isSelected ? theme.colors.primary : 'transparent',
      borderColor: theme.colors.primary,
      borderWidth: 1,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
  });
