import { StyleSheet } from 'react-native';

import { Theme } from '@theme';

export const getStyles = (theme?: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 24,
    },
    contentContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 24,
    },
    inputHeight: {
      height: 300,
    },
    inputContainer: {
      width: '100%',
      marginBottom: 50,
      marginTop: 16,
    },
    label: {
      marginLeft: 12,
    },
    simpleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      width: 118,
    },
    textInput: {
      fontSize: 22,
      color: theme?.colors.neutral400,
      fontFamily: theme?.fonts.semibold,
    },
    scrollview: { flex: 1 },
    birthdayInput: {
      width: 80,
    },
    slashLabel: {
      marginHorizontal: 6,
    },
    bottomLabel: {
      marginTop: 12,
    },
  });
