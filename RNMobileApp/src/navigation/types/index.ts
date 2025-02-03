import { CardStyleInterpolators } from '@react-navigation/stack';

enum RootStackEnum {
  AUTH = 'Auth',
  APP = 'App',
}

enum AuthStackEnum {
  SPLASH = 'Splash',
  TUTORIAL = 'Tutorial',
  LOGIN = 'Login',
  CREATE_ACCOUNT = 'CreateAccount',
  PERSONALIZATION = 'Personalization',
  BILLING = 'Billing',
  SUCCESS = 'Success',
}

enum AppStackEnum {
  HOME = 'Home',
  WORKOUT_STACK = 'WorkoutStack',
  MEAL_STACK = 'MealStack',
  SETTINGS_STACK = 'SettingsStack',
}

enum SettingsStackEnum {
  SETTINGS = 'Settings',
  CHANGE_LANGUAGE = 'ChangeLanguage',
}

export const defaultScreenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
};

export { RootStackEnum, AuthStackEnum, AppStackEnum, SettingsStackEnum };
