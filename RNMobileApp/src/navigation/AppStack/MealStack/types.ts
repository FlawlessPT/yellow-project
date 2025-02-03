/* Navigation */
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MealStackParamList = {
  MyMeals: undefined;
};

export type SettingsNavProps<T extends keyof MealStackParamList> = NativeStackScreenProps<MealStackParamList, T>;
