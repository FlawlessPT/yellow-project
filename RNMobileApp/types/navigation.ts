/**
 * Documentation here: https://reactnavigation.org/docs/typescript/
 */
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type NoneAuthenticatedRoutesParams = {
  Auth: undefined;
  TermsAndConditions: undefined;
  PrivacyPolicy: undefined;
};

export type NoneAuthenticatedRoutesKeys = keyof NoneAuthenticatedRoutesParams;

export type NoneAuthenticatedStackScreenPropsGeneric<
  R extends NoneAuthenticatedRoutesKeys = NoneAuthenticatedRoutesKeys,
> = NativeStackScreenProps<
  {
    Auth: undefined;
    TermsAndConditions: undefined;
    PrivacyPolicy: undefined;
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
