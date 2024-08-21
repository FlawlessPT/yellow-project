import React from 'react';
import { StyleSheet } from 'react-native';

import { Label, Page } from '@components';

import data from './aboutapp.json';
import useTheme from '@hooks/theme/useTheme';

const AboutApp = () => {
  const { theme } = useTheme();

  return (
    <Page title="profile.about_app" withBack>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <Label text={item.title} color={theme.colors.neutral100} type="h4" bold />
          <Label text={item.description} color={theme.colors.neutral400} style={styles.description} />
        </React.Fragment>
      ))}
    </Page>
  );
};

export default AboutApp;

const styles = StyleSheet.create({
  description: {
    marginTop: 24,
    marginBottom: 32,
  },
});
