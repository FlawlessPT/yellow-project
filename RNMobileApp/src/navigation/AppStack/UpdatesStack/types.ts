/* Navigation */
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type UpdatesStackParamList = {
  Updates: undefined;
};

export type UpdatesNavProps<T extends keyof UpdatesStackParamList> = NativeStackScreenProps<UpdatesStackParamList, T>;
