// React Native
import { StyleSheet } from 'react-native';

// Theme
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
      width: 138,
    },
    textInput: {
      fontSize: 32,
      color: theme?.colors.neutral400,
      fontFamily: theme?.fonts.semibold,
    },
  });
