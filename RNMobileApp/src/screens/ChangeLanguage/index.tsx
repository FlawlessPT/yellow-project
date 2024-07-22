import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import i18next from 'i18next';

import { ButtonCard, Page } from '@components';

const languages: { key: string; label: string }[] = [
  { key: 'pt', label: 'portuguese' },
  { key: 'en', label: 'english' },
];

const ChangeLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<number>();

  const changeLanguage = (language: string) => {
    i18next.changeLanguage(language);
  };

  return (
    <Page title="change.language.title" withBack>
      {languages.map((language, index) => (
        <ButtonCard
          key={index}
          isSelected={selectedLanguage === index}
          label={language.label}
          onPress={() => {
            changeLanguage(language.key);
            setSelectedLanguage(index);
          }}
          withNoArrow
          style={styles.settingsCard}
        />
      ))}
    </Page>
  );
};

export default ChangeLanguage;

const styles = StyleSheet.create({
  settingsCard: {
    marginTop: 18,
  },
});
