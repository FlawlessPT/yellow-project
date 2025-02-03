/* Navigation */
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AppStackParamList = {
  Home: undefined;
  WorkoutStack: undefined;
  Add: undefined;
  MealStack: undefined;
  SettingsStack: undefined;
};

export type AppNavProps<T extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, T>;
