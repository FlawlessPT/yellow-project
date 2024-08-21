import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import { AuthNavProps } from '../../navigation/AuthStack/types';
import { AuthStackEnum } from '../../navigation/types';
import { Button, CheckContainer, Label, LabelButton, Page } from '@components';

import { plansStub } from './stub';
import { Month, Plan } from './types';
import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

const Billing = ({ navigation, route }: AuthNavProps<'Billing'>) => {
  const { withBack } = route.params ?? false;

  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [selectedPlan, setSelectedPlan] = useState<Plan>(plansStub[1]);
  const [selectedMonth, setSelectedMonth] = useState<Month>(selectedPlan.months[0]);

  useEffect(() => {
    setSelectedMonth(selectedPlan.months[1]);
  }, [selectedPlan.months]);

  return (
    <Page
      title={withBack ? 'prices_title' : undefined}
      bounces={false}
      contentContainerStyle={styles.contentContainer}
      withBack={withBack}
      color={theme.colors.neutral400}
      type="h5"
    >
      <View style={styles.contentContainer}>
        <Label text="billing_screen.title" textAlign="center" color={theme.colors.neutral300} type="h2" bold />
        <Label text="choose_plan.description" textAlign="center" color={theme.colors.neutral300} />
        <View style={styles.plans}>
          {plansStub.map((plan, index) => {
            const isSelected = selectedPlan === plan;

            return (
              <LabelButton
                key={index}
                text={plan.name}
                onPress={() => setSelectedPlan(plan)}
                type="footnote"
                color={isSelected ? theme.colors.neutral700 : theme.colors.neutral400}
                style={[
                  styles.planLabelButton,
                  { backgroundColor: isSelected ? theme.colors.primary : theme.colors.neutral800 },
                ]}
              />
            );
          })}
        </View>
        <View style={[styles.plans, styles.months]}>
          {selectedPlan.months.map((month, monthIndex) => {
            const isSelected = selectedMonth === month;

            return (
              <TouchableOpacity
                key={monthIndex}
                style={[
                  styles.monthsContainer,
                  {
                    borderWidth: isSelected ? 1 : 0,
                    borderColor: theme.colors.primary,
                  },
                ]}
                onPress={() => setSelectedMonth(month)}
              >
                <Label text={`${month.quantity} months`} textAlign="center" color={theme.colors.neutral300} />
                <Label text={`${month.price}€`} type="h4" textAlign="center" color={theme.colors.white} medium />
              </TouchableOpacity>
            );
          })}
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={selectedMonth.list}
          renderItem={({ item, index }) => (
            <View style={styles.check} key={index}>
              <CheckContainer label={item} />
            </View>
          )}
        />
      </View>
      <Label
        text="payment.advice"
        textAlign="center"
        color={theme.colors.neutral400}
        type="footnote"
        style={styles.adviceLabel}
      />
      <Button
        text="continue.button"
        onPressButton={() => navigation.navigate(withBack ? AuthStackEnum.LOGIN : AuthStackEnum.PERSONALIZATION)}
      />
    </Page>
  );
};

export default Billing;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    plans: {
      flexDirection: 'row',
      marginTop: 18,
      justifyContent: 'center',
      gap: 8,
    },
    planLabelButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    monthsContainer: {
      paddingHorizontal: 16,
      paddingVertical: 24,
      backgroundColor: theme.colors.neutral800,
      borderRadius: 12,
    },
    months: {
      gap: 24,
    },
    adviceLabel: {
      marginVertical: 23,
    },
    check: { marginTop: 24 },
    contentContainer: {
      flex: 1,
    },
    header: {
      alignSelf: 'center',
    },
  });
