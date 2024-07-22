import React from 'react';
import { StyleSheet, View } from 'react-native';

import CircularProgress from 'react-native-circular-progress-indicator';

import Label from '@components/Label';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

type ProgressCardProps = {
  progress: number;
};

const ProgressCard = ({ progress }: ProgressCardProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <CircularProgress
        value={progress}
        showProgressValue={false}
        radius={30}
        progressValueColor={theme.colors.white}
        maxValue={100}
        title={progress.toString()}
        titleStyle={styles.progressTitle}
        activeStrokeColor={theme.colors.primary}
        activeStrokeWidth={6}
      />
      <View style={styles.contentContainer}>
        <Label text="workouts_done.title" type="h5" color={theme.colors.white} bold />
        <Label text="youre_right_track" type="footnote" color={theme.colors.neutral300} />
      </View>
    </View>
  );
};

export default ProgressCard;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 22.5,
      paddingVertical: 12,
      backgroundColor: theme.colors.neutral800,
      borderRadius: 12,
    },
    progressTitle: {
      fontWeight: 'bold',
      fontSize: 24,
      lineHeight: 36,
      color: theme.colors.white,
    },
    contentContainer: {
      marginLeft: 22,
    },
  });
