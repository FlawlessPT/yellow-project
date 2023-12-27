/**
 * Documentation here: https://reactnavigation.org/docs/typescript/
 */
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type NoneAuthenticatedRoutesParams = {
  LandingPage: undefined;
  Login: undefined;
  SignUp: undefined;
  Auth: undefined;
  TermsAndConditions: undefined;
  PrivacyPolicy: undefined;
  Tutorial: undefined;
};

export type NoneAuthenticatedRoutesKeys = keyof NoneAuthenticatedRoutesParams;

export type NoneAuthenticatedStackScreenPropsGeneric<
  R extends NoneAuthenticatedRoutesKeys = NoneAuthenticatedRoutesKeys,
> = NativeStackScreenProps<
  {
    LandingPage: undefined;
    Login: undefined;
    SignUp: undefined;
    Auth: undefined;
    TermsAndConditions: undefined;
    PrivacyPolicy: undefined;
    Tutorial: undefined;
  },
  R
>;

/* Usage Examples
type AuthScreenProps = NoneAuthenticatedStackScreenPropsGeneric<
  'Auth',
>;
type AuthScreenNavigationProps = AuthScreenProps['navigation'];
const navigation = useNavigation<AuthScreenNavigationProps>();
*/
