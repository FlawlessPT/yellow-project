// Navigation
import { CardStyleInterpolators } from '@react-navigation/stack';

enum RootStackEnum {
  AUTH = 'Auth',
  APP = 'App',
}

enum AuthStackEnum {
  SPLASH = 'Splash',
  LOGIN = 'Login',
  CREATE_ACCOUNT = 'CreateAccount',
}

enum AppStackEnum {
  HOME = 'Home',
}

export const defaultScreenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
};

export { RootStackEnum, AuthStackEnum, AppStackEnum };
