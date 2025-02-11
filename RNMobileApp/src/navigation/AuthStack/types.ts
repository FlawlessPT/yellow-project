import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Splash: undefined;
  Tutorial: undefined;
  Login: undefined;
  CreateAccount: undefined;
  Personalization: undefined;
  Billing: { withBack?: boolean };
  Success: undefined;
};

export type AuthNavProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<AuthStackParamList, T>;
