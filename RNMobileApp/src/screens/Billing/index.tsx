// React and React Native
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

// Theme
import { Theme } from '@theme';

// Stubs
import { plansStub } from './stub';

// Types
import { Month, Plan } from './types';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// Components
import { Button, CheckContainer, Label, LabelButton, Page } from '@components';

const Billing = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [selectedPlan, setSelectedPlan] = useState<Plan>(plansStub[1]);
  const [selectedMonth, setSelectedMonth] = useState<Month>(selectedPlan.months[0]);

  useEffect(() => {
    setSelectedMonth(selectedPlan.months[1]);
  }, [selectedPlan.months]);

  return (
    <Page title="billing_screen.title" bounces={false} contentContainerStyle={styles.contentContainer}>
      <View style={styles.contentContainer}>
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
      <Button text="continue.button" onPressButton={() => undefined} />
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
      marginVertical: 43,
    },
    check: { marginTop: 24 },
    contentContainer: {
      flex: 1,
    },
  });
