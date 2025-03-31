import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { CheckIcon, MessagesIcon } from '@assets';
import { FieldValues, useForm } from 'react-hook-form';
import { Icon } from 'react-native-paper';

import { Button, CalendarHeader, Page, SelectableValueCard, TopTabs } from '@components';

import DailyUpdate from './DailyUpdate';
import MilestoneUpdate from './MilestoneUpdate';
import { UpdatesTabEnum } from './types';
import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

const Updates = () => {
  const [selectedTab, setSelectedTab] = useState<UpdatesTabEnum>(UpdatesTabEnum.Daily);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { theme } = useTheme();

  const styles = getStyles(theme);

  const { control, handleSubmit, trigger, setValue, watch } = useForm<FieldValues>({
    mode: 'onChange',
  });

  const trainingRecoverySelected = watch('trainingRecovery');
  const dayEnergySelected = watch('dayEnergy');
  const trainingPerformanceSelected = watch('trainingPerformance');

  const array = [1, 2, 3, 4, 5];

  const renderValueCards = (valueSelected: number, valueKey: string) => {
    return (
      <View style={styles.buttonContainer}>
        {array.map((value) => {
          return (
            <SelectableValueCard
              key={value}
              value={value}
              isSelected={valueSelected === value}
              onPress={() => setValue(valueKey, value)}
            />
          );
        })}
      </View>
    );
  };

  return (
    <Page
      title="updates.title"
      right={<Icon source={MessagesIcon} size={24} color={theme.colors.primary} />}
      bounces={false}
    >
      <TopTabs tabs={['Daily', 'Milestone']} onChangeTab={setSelectedTab} />
      <CalendarHeader />
      {selectedTab === UpdatesTabEnum.Daily ? <DailyUpdate /> : <MilestoneUpdate />}
      <Button
        text={isSubmitted ? 'Submitted' : 'Submit update'}
        onPressButton={() => {
          // handleSubmit();
          setIsSubmitted(true);
        }}
        rightIcon={isSubmitted && CheckIcon}
        disabled={isSubmitted}
        style={[styles.submitButton, isSubmitted && styles.submittedButton]}
      />
    </Page>
  );
};

export default Updates;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 24,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    submitButton: {
      marginTop: 24,
    },
    submittedButton: {
      backgroundColor: theme.colors.icon,
    },
  });
