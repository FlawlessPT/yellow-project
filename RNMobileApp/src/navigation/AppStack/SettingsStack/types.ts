/* Navigation */
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type SettingsStackParamList = {
  Settings: undefined;
  ChangeLanguage: undefined;
  AboutApp: undefined;
};

export type SettingsNavProps<T extends keyof SettingsStackParamList> = NativeStackScreenProps<
  SettingsStackParamList,
  T
>;
