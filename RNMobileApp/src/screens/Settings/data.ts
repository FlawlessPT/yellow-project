import { AboutApp, Billing, EditProfile, Language, Notifications } from '@assets';
import { SettingsStackEnum } from '@navigation/types';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import { ProfileButton, ProfileDetail } from './types';

export const profileDetailsData: ProfileDetail[] = [
  { label: 'profile.weight', value: '70 kg' },
  { label: 'profile.height', value: '1.61m' },
];

export const profileButtons = (navigation: NavigationProp<ParamListBase>): ProfileButton[] => {
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
      onPress: () => navigation.navigate(SettingsStackEnum.CHANGE_LANGUAGE),
    },
    {
      icon: AboutApp,
      label: 'profile.about_app',
      onPress: () => undefined,
    },
  ];
};
