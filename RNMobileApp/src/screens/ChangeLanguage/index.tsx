import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import i18next from 'i18next';

import { RadioButton, Label, Page } from '@components';

import useTheme from '@hooks/theme/useTheme';

const languages: { key: string; label: string }[] = [
  { key: 'pt', label: 'portuguese' },
  { key: 'en', label: 'english' },
];

const ChangeLanguage = () => {
  const getInitialLanguage = () => i18next.language;

  const [selectedLanguage, setSelectedLanguage] = useState<string>(getInitialLanguage());

  const { theme } = useTheme();

  const handleChangeLanguage = (language: string) => {
    i18next.changeLanguage(language);
    setSelectedLanguage(language);
  };

  return (
    <Page title="change.language.title" withBack>
      <View style={styles.container}>
        {languages.map((language) => {
          const isSelected = selectedLanguage === language.key;

          return (
            <TouchableOpacity
              key={language.key}
              activeOpacity={0.6}
              onPress={() => handleChangeLanguage(language.key)}
              style={styles.contentContainer}
            >
              <Label text={language.label} color={theme.colors.white} />
              <RadioButton isSelected={isSelected} handleOnPress={() => handleChangeLanguage(language.key)} />
            </TouchableOpacity>
          );
        })}
      </View>
    </Page>
  );
};

export default ChangeLanguage;

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
