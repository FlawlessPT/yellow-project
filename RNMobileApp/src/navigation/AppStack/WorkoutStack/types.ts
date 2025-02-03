/* Navigation */
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type WorkoutStackParamList = {
  MyWorkouts: undefined;
};

export type SettingsNavProps<T extends keyof WorkoutStackParamList> = NativeStackScreenProps<WorkoutStackParamList, T>;
