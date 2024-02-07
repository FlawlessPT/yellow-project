// Types
import { ProfileButton, ProfileDetail } from './types';

// Assets
import { AboutApp, EditProfile, Language, Notifications } from '@assets';

export const profileDetailsData: ProfileDetail[] = [
  { label: 'profile.start_weight', value: '70 kg' },
  { label: 'profile.height', value: '1.61m' },
  { label: 'profile.goal', value: '60 kg' },
];

export const profileButtons: ProfileButton[] = [
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
    onPress: () => undefined,
  },
  {
    icon: AboutApp,
    label: 'profile.about_app',
    onPress: () => undefined,
  },
];
