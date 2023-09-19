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
  S extends string = any,
> = NativeStackScreenProps<
  {
    Auth: undefined;
    TermsAndConditions: undefined;
    PrivacyPolicy: undefined;
  },
  R,
  S
>;

/* Usage Examples
type AuthScreenProps = NoneAuthenticatedStackScreenPropsGeneric<
  'Auth',
  'MyStack'
>;
type AuthScreenNavigationProps = AuthScreenProps['navigation'];
const navigation = useNavigation<AuthScreenNavigationProps>();
*/
