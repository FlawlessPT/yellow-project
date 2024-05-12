// External Libs
import { NavigationProp } from '@react-navigation/native';

// Types
import { ProfileButton, ProfileDetail } from './types';
import { SettingsStackEnum } from '../../navigation/types';

// Assets
import { AboutApp, Billing, EditProfile, Language, Notifications } from '@assets';

export const profileDetailsData: ProfileDetail[] = [
  { label: 'profile.weight', value: '70 kg' },
  { label: 'profile.height', value: '1.61m' },
];

export const profileButtons = (navigation: NavigationProp<ReactNavigation.RootParamList>): ProfileButton[] => {
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
      onPress: () => navigation.navigate(SettingsStackEnum.CHANGE_LANGUAGE as never),
    },
    {
      icon: Billing,
      label: 'profile.billing',
      onPress: () => navigation.navigate(SettingsStackEnum.CHANGE_LANGUAGE as never),
    },
    {
      icon: AboutApp,
      label: 'profile.about_app',
      onPress: () => undefined,
    },
  ];
};
