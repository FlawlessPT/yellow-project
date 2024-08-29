import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { ArrowDownIcon } from '@assets';
import { SelectList } from 'react-native-dropdown-select-list';

import { Input, Label, Page } from '@components';

import { profileData } from './utils';
import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

const ProfileDetails = () => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <Page title="profile.details" withBack>
      <Image
        source={{
          uri: 'https://vanderluiz.com.br/wp-content/uploads/2017/08/Fundo-amarelo.jpg',
        }}
        style={styles.profileImage}
      />
      <Label text={'bernardo123@hotmail.com'} type="footnote" color={theme.colors.neutral400} textAlign="center" />
      {profileData.map((item) => (
        <React.Fragment key={item.id}>
          <Label text={item.label} type="footnote" color={theme.colors.white} bold style={styles.label} />
          {item.dropdownItems ? (
            <SelectList
              setSelected={() => undefined}
              data={item.dropdownItems}
              placeholder={item.dropdownItems[0]}
              save="key"
              fontFamily={theme.fonts.regular}
              search={false}
              arrowicon={<Image source={ArrowDownIcon} />}
              dropdownStyles={styles.dropdown}
              inputStyles={styles.dropdownInput}
              boxStyles={styles.dropdownBox}
              dropdownTextStyles={styles.dropdownText}
            />
          ) : (
            <Input value="cenas" right={<Label text={item.rightLabel} color={theme.colors.passwordIcon} bold />} />
          )}
        </React.Fragment>
      ))}
    </Page>
  );
};

export default ProfileDetails;

const getStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    profileImage: {
      alignSelf: 'center',
      marginBottom: 16,
      borderRadius: 62,
      width: 124,
      height: 124,
    },
    label: {
      marginTop: 24,
      marginBottom: 8,
    },
    dropdown: {
      backgroundColor: theme.colors.input_background,
      borderWidth: 0,
    },
    dropdownBox: {
      backgroundColor: theme.colors.input_background,
      borderWidth: 0,
    },
    dropdownInput: { color: theme.colors.white, height: 35 },
    dropdownText: {
      color: theme.colors.white,
    },
  });

  return styles;
};
