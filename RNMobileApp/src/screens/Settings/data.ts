// External Libs
import { AboutApp, EditProfile, Language, Notifications } from '@assets';
import { NavigationProp } from '@react-navigation/native';

// Types
import { SettingsStackEnum } from '../../navigation/types';

import { ProfileButton, ProfileDetail } from './types';

// Assets

export const profileDetailsData: ProfileDetail[] = [
  { label: 'profile.start_weight', value: '70 kg' },
  { label: 'profile.height', value: '1.61m' },
  { label: 'profile.goal', value: '60 kg' },
];

export const profileButtons = (navigation: NavigationProp<ReactNavigation.RootParamList>): ProfileButton[] => {
  return [
    {
      icon: EditProfile,
      label: 'profile.edit_profile',
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
      onPress: () => navigation.navigate(SettingsStackEnum.CHANGE_LANGUAGE as never),
    },
    {
      icon: AboutApp,
      label: 'profile.about_app',
      onPress: () => undefined,
    },
  ];
};
