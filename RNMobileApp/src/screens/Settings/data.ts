import { AboutApp, Billing, EditProfile, Language, Notifications } from '@assets';
import { SettingsStackEnum } from '@navigation/types';
import { NavigationProp } from '@react-navigation/native';

import { ProfileButton, ProfileDetail } from './types';

export const profileDetailsData: ProfileDetail[] = [
  { label: 'profile.weight', value: '79 kg' },
  { label: 'profile.height', value: '1.65m' },
];

export const profileButtons = (navigation: NavigationProp): ProfileButton[] => {
  return [
    {
      icon: EditProfile,
      label: 'profile.details',
      onPress: () => undefined,
    },
    {
      icon: Notifications,
      label: 'profile.notifications',
      onPress: () => undefined,
    },
    {
      icon: Language,
      label: 'profile.language',
      onPress: () => navigation.navigate(SettingsStackEnum.CHANGE_LANGUAGE),
    },
    {
      icon: Billing,
      label: 'profile.billing',
      onPress: () => undefined,
    },
    {
      icon: AboutApp,
      label: 'profile.about_app',
      onPress: () => undefined,
    },
  ];
};
